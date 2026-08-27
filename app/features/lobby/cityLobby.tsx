import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { clone as cloneSkinnedModel } from "three/examples/jsm/utils/SkeletonUtils.js";
import { createClient } from "~/lib/supabase/client";
import {
  createGameRoom,
  getPersistentPlayerId,
  getPlayerActiveGames,
  joinGameRoom,
  resolveInactiveGameRoom,
  type GameRoom,
} from "~/lib/supabase/supabaseGame";

type Point = { x: number; z: number; y?: number };
type TerrainSurface = { x: number; z: number; halfWidth: number; halfDepth: number; top: number; raised?: boolean };
type Resident = {
  id: string;
  name: string;
  role: string;
  mood: string;
  color: number;
  position: Point;
};

type CharacterProfile = {
  skinColor: number;
  hairColor: number;
  hairStyle: "crop" | "waves" | "bob" | "ponytail";
  outfitColor: number;
  gender: "feminine" | "masculine" | "androgynous";
  characterSet: "mini";
  bodyVariant: "a" | "b" | "c" | "d" | "e" | "f";
  faceVariant: "friendly" | "calm" | "focused" | "cheerful" | "cool" | "surprised";
  /** @deprecated kept only to migrate profiles saved by the previous creator. */
  miniCharacter?: "a" | "c";
};

type LobbyPlayerState = {
  id: string;
  username: string;
  appearance: CharacterProfile;
  position: Point;
  yaw: number;
  moving: boolean;
  running: boolean;
  jumping: boolean;
  activity: string;
};

type LobbyMessage = {
  id: string;
  timestamp: string;
  playerName: string;
  message: string;
  isMine: boolean;
};

type GameInvitation = {
  id: string;
  gameId: "battleship";
  roomId: string;
  from: string;
  fromName: string;
  to: string;
};

type CityLobbyProps = {
  initialUsername: string;
  onUsernameChange: (username: string) => void;
};

const residents: Resident[] = [
  { id: "kai", name: "Kai", role: "Puzzle runner", mood: "Looking for a quick match", color: 0xf58f70, position: { x: -3.2, z: -2.8, y: 1 } },
  { id: "mira", name: "Mira", role: "Tactician", mood: "Open to team invites", color: 0x83d1c7, position: { x: 2.8, z: -2.5, y: 1 } },
  { id: "leo", name: "Leo", role: "Speed climber", mood: "Practicing parkour", color: 0xf2c66d, position: { x: 3.3, z: 2.8, y: 1 } },
  { id: "zoe", name: "Zoe", role: "City guide", mood: "Ask me about hidden spots", color: 0xb39bf4, position: { x: -3.2, z: 2.7, y: 1 } },
];

const messages = ["Hey! Want to start a game?", "Meet me by the arcade.", "Nice to see you in the city!", "Want to team up?"];

const defaultProfile: CharacterProfile = {
  skinColor: 0xffd2b5,
  hairColor: 0x182b40,
  hairStyle: "waves",
  outfitColor: 0x70a8ef,
  gender: "androgynous",
  characterSet: "mini",
  bodyVariant: "a",
  faceVariant: "friendly",
};

const terrainSurfaces: TerrainSurface[] = [
  { x: 0, z: 0, halfWidth: 5.2, halfDepth: 5.2, top: 1 },
  { x: -2.2, z: -1.8, halfWidth: 0.5, halfDepth: 0.5, top: 1.75, raised: true },
  { x: 2.25, z: -1.65, halfWidth: 0.5, halfDepth: 0.5, top: 1.75, raised: true },
  { x: 0, z: -3.15, halfWidth: 0.5, halfDepth: 0.5, top: 2.4, raised: true },
  { x: -3.65, z: 1.1, halfWidth: 0.5, halfDepth: 0.5, top: 1.75, raised: true },
  { x: 3.7, z: 1.3, halfWidth: 0.5, halfDepth: 0.5, top: 1.75, raised: true },
];

const springPads = [{ x: -0.85, z: 1.85 }, { x: 0.85, z: 1.85 }];
const coinPlacements = [
  { x: -2.2, y: 2.15, z: -1.8 }, { x: 2.25, y: 2.15, z: -1.65 }, { x: 0, y: 2.8, z: -3.15 },
  { x: -3.65, y: 2.15, z: 1.1 }, { x: 3.7, y: 2.15, z: 1.3 },
];

const skinOptions = [0xf6d1b1, 0xd99b72, 0xb97955, 0x78472f];
const outfitOptions = [0x70a8ef, 0xf58f70, 0x83d1c7, 0xb39bf4, 0xf2c66d];

function makeMaterial(color: number, roughness = 0.72) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.08 });
}

function addBox(parent: THREE.Object3D, size: [number, number, number], position: [number, number, number], color: number, bevel = 0) {
  const geometry = new THREE.BoxGeometry(...size);
  if (bevel) {
    // A small bevel is reserved for hero props; city geometry stays lightweight.
    geometry.translate(0, 0, 0);
  }
  const mesh = new THREE.Mesh(geometry, makeMaterial(color));
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

// Mini Characters are the only player-avatar source. They are loaded lazily
// so the lobby remains usable while a model or texture is still arriving.
const kenneyLoaders = new Map<string, Promise<THREE.Group | null>>();
function loadMiniCharacter(variant: string) {
  const existing = kenneyLoaders.get(variant);
  if (existing) return existing;
  const promise = new Promise<THREE.Group | null>((resolve) => {
    new GLTFLoader().load(
      `/assets/kenney-mini-characters/character-${variant}.glb`,
      (gltf) => {
        // Keep the animation clips alongside the source scene; clones use
        // them to switch cleanly between idle, walk, sprint, and jump.
        gltf.scene.userData.animations = gltf.animations;
        resolve(gltf.scene);
      },
      undefined,
      () => resolve(null),
    );
  });
  kenneyLoaders.set(variant, promise);
  return promise;
}

function characterVariant(appearance: CharacterProfile) {
  const family = appearance.gender === "masculine" ? "male" : "female";
  return `${family}-${appearance.bodyVariant}`;
}

function normalizeProfile(appearance?: Partial<CharacterProfile>): CharacterProfile {
  const legacyVariant = appearance?.miniCharacter === "c" ? "c" : undefined;
  return {
    ...defaultProfile,
    ...(appearance ?? {}),
    characterSet: "mini",
    bodyVariant: appearance?.bodyVariant ?? legacyVariant ?? "a",
    faceVariant: appearance?.faceVariant ?? "friendly",
  };
}

function applyKenneyMaterials(model: THREE.Group, appearance: CharacterProfile, isPlayer: boolean) {
  model.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const name = child.name.toLowerCase();
    const color = name.includes("head")
      ? appearance.skinColor
      : name.includes("leg")
        ? (isPlayer ? 0x263b58 : 0x32445b)
        : appearance.outfitColor;
    // Clone materials per avatar so one player's customization never changes
    // another player's appearance.
    child.material = makeMaterial(color, 0.82);
    child.castShadow = true;
    child.receiveShadow = true;
  });
}

function addMiniFace(parent: THREE.Group, face: CharacterProfile["faceVariant"]) {
  const faceGroup = new THREE.Group();
  faceGroup.userData.faceDetail = true;
  const eyeMaterial = makeMaterial(0x132235, 0.35);
  const variants: Record<CharacterProfile["faceVariant"], { eye: number; mouth: number; mouthHeight: number }> = {
    friendly: { eye: 0.036, mouth: 0.18, mouthHeight: 0.028 },
    calm: { eye: 0.03, mouth: 0.12, mouthHeight: 0.018 },
    focused: { eye: 0.028, mouth: 0.1, mouthHeight: 0.014 },
    cheerful: { eye: 0.04, mouth: 0.22, mouthHeight: 0.035 },
    cool: { eye: 0.024, mouth: 0.14, mouthHeight: 0.018 },
    surprised: { eye: 0.046, mouth: 0.07, mouthHeight: 0.07 },
  };
  const style = variants[face];
  [-0.11, 0.11].forEach((x) => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(style.eye, 8, 6), eyeMaterial);
    eye.position.set(x, 1.76, 0.43);
    faceGroup.add(eye);
  });
  const mouth = new THREE.Mesh(new THREE.BoxGeometry(style.mouth, style.mouthHeight, 0.028), eyeMaterial);
  mouth.position.set(0, 1.61, 0.43);
  faceGroup.add(mouth);
  if (face === "focused" || face === "cool") {
    [-0.11, 0.11].forEach((x) => {
      const brow = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.018, 0.025), eyeMaterial);
      brow.position.set(x, 1.84, 0.43);
      brow.rotation.z = face === "focused" ? (x < 0 ? -0.12 : 0.12) : 0;
      faceGroup.add(brow);
    });
  }
  parent.add(faceGroup);
}

async function hydrateAvatarWithKenney(avatar: THREE.Group, appearance: CharacterProfile, isPlayer: boolean, variant: string) {
  const appearanceKey = JSON.stringify(appearance);
  const modelSource = await loadMiniCharacter(variant);
  if (!modelSource || avatar.userData.appearanceKey !== appearanceKey) return;

  const model = cloneSkinnedModel(modelSource) as THREE.Group;
  applyKenneyMaterials(model, appearance, isPlayer);
  // Normalize the downloaded model to the same two-unit height as the
  // procedural fallback, keeping movement and camera tuning unchanged.
  const bounds = new THREE.Box3().setFromObject(model);
  const height = Math.max(bounds.max.y - bounds.min.y, 0.001);
  const scale = 2.18 / height;
  model.scale.setScalar(scale);
  model.position.y = -bounds.min.y * scale;

  const label = avatar.children.find((child) => child instanceof THREE.Sprite);
  avatar.clear();
  avatar.add(model);
  addMiniFace(avatar, appearance.faceVariant);
  if (label) avatar.add(label);
  const limbs: THREE.Object3D[] = [];
  model.traverse((child) => {
    if (["leg-left", "leg-right", "arm-left", "arm-right"].includes(child.name)) limbs.push(child);
  });
  avatar.userData.limbs = limbs;
  const clips = modelSource.userData.animations as THREE.AnimationClip[] | undefined;
  if (clips?.length) {
    const mixer = new THREE.AnimationMixer(model);
    const actions: Record<string, THREE.AnimationAction> = {};
    clips.forEach((clip) => { actions[clip.name.toLowerCase()] = mixer.clipAction(clip); });
    avatar.userData.mixer = mixer;
    avatar.userData.animationActions = actions;
    avatar.userData.animationState = "";
  }
  avatar.userData.kenneyReady = true;
}

function updateAvatarAnimation(avatar: THREE.Group, moving: boolean, running: boolean, jumping: boolean) {
  const actions = avatar.userData.animationActions as Record<string, THREE.AnimationAction> | undefined;
  if (!actions) return;
  const desired = jumping ? "jump" : moving ? (running ? "sprint" : "walk") : "idle";
  if (avatar.userData.animationState === desired) return;
  const current = actions[avatar.userData.animationState as string];
  const next = actions[desired] ?? actions.idle;
  current?.fadeOut(0.12);
  next?.reset().fadeIn(0.12).play();
  avatar.userData.animationState = desired;
}

function createAvatar(color: number, isPlayer = false, appearance: CharacterProfile = defaultProfile) {
  const avatar = new THREE.Group();
  avatar.userData = { isPlayer, limbs: [] as THREE.Object3D[], appearanceKey: JSON.stringify(appearance) };

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.38, 0.72, 4, 10), makeMaterial(color));
  body.position.y = 1.05;
  body.scale.x = appearance.gender === "feminine" ? 0.9 : appearance.gender === "masculine" ? 1.08 : 1;
  body.castShadow = true;
  avatar.add(body);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 12), makeMaterial(appearance.skinColor));
  head.position.y = 1.82;
  head.castShadow = true;
  avatar.add(head);

  const hairGeometry = appearance.hairStyle === "bob"
    ? new THREE.SphereGeometry(0.37, 16, 10)
    : appearance.hairStyle === "ponytail"
      ? new THREE.SphereGeometry(0.34, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.55)
      : appearance.hairStyle === "crop"
        ? new THREE.SphereGeometry(0.34, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.42)
        : new THREE.IcosahedronGeometry(0.35, 2);
  const hair = new THREE.Mesh(hairGeometry, makeMaterial(appearance.hairColor));
  hair.position.y = 1.92;
  if (appearance.hairStyle === "bob") hair.scale.set(1.04, 1.14, 1.03);
  hair.castShadow = true;
  avatar.add(hair);
  if (appearance.hairStyle === "ponytail") {
    const ponytail = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), makeMaterial(appearance.hairColor));
    ponytail.position.set(-0.32, 1.72, -0.1);
    ponytail.castShadow = true;
    avatar.add(ponytail);
  }

  const eyeMaterial = makeMaterial(0x142235, 0.3);
  [-0.11, 0.11].forEach((x) => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), eyeMaterial);
    eye.position.set(x, 1.84, 0.29);
    avatar.add(eye);
  });

  const limbs: THREE.Object3D[] = [];
  [-0.2, 0.2].forEach((x) => {
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.11, 0.42, 3, 8), makeMaterial(isPlayer ? 0x263b58 : 0x32445b));
    leg.position.set(x, 0.42, 0);
    leg.castShadow = true;
    avatar.add(leg);
    limbs.push(leg);
  });
  [-0.48, 0.48].forEach((x) => {
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.42, 3, 8), makeMaterial(color));
    arm.position.set(x, 1.08, 0);
    arm.rotation.z = x < 0 ? -0.12 : 0.12;
    arm.castShadow = true;
    avatar.add(arm);
    limbs.push(arm);
  });
  avatar.userData.limbs = limbs;
  return avatar;
}

function createNameLabel(name: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 64;
  const context = canvas.getContext("2d");
  if (!context) return null;
  context.fillStyle = "rgba(10, 31, 40, .8)";
  context.roundRect(12, 10, 232, 43, 21);
  context.fill();
  context.font = "600 22px Open Sans, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "#ecf8f3";
  context.fillText(name, 128, 32);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false }));
  sprite.scale.set(2.25, 0.56, 1);
  sprite.position.y = 2.55;
  return sprite;
}

function addNameplate(scene: THREE.Scene, resident: Resident) {
  const marker = new THREE.Object3D();
  marker.position.set(resident.position.x, 0, resident.position.z);
  marker.userData = { residentId: resident.id };
  scene.add(marker);
  return marker;
}

const platformPropLoaders = new Map<string, Promise<THREE.Group | null>>();
function loadPlatformerProp(name: string) {
  const existing = platformPropLoaders.get(name);
  if (existing) return existing;
  const promise = new Promise<THREE.Group | null>((resolve) => {
    new GLTFLoader().load(
      `/assets/kenney-platformer-kit/${name}.glb`,
      (gltf) => resolve(gltf.scene),
      undefined,
      () => resolve(null),
    );
  });
  platformPropLoaders.set(name, promise);
  return promise;
}

async function addPlatformerProp(scene: THREE.Scene, name: string, position: [number, number, number], scale = 1, rotationY = 0) {
  const source = await loadPlatformerProp(name);
  if (!source || scene.userData.disposed) return null;
  const prop = source.clone(true);
  prop.position.set(...position);
  prop.scale.setScalar(scale);
  prop.rotation.y = rotationY;
  prop.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  scene.add(prop);
  return prop;
}

function isOnSurface(surface: TerrainSurface, x: number, z: number) {
  return Math.abs(x - surface.x) <= surface.halfWidth && Math.abs(z - surface.z) <= surface.halfDepth;
}

function terrainSurfaceBelow(x: number, z: number, maximumTop: number) {
  return terrainSurfaces
    .filter((surface) => isOnSurface(surface, x, z) && surface.top <= maximumTop)
    .sort((first, second) => second.top - first.top)[0];
}

function isTerrainBlocked(x: number, z: number, playerHeight: number) {
  return terrainSurfaces.some((surface) => surface.raised && isOnSurface(surface, x, z) && playerHeight < surface.top - 0.26);
}

function buildPlatformTerrain(scene: THREE.Scene) {
  scene.userData.collectibles = [] as THREE.Object3D[];
  scene.userData.springs = springPads;
  const tilePositions = [-4.16, 0, 4.16];
  tilePositions.forEach((x) => tilePositions.forEach((z) => void addPlatformerProp(scene, "block-grass-large", [x, 0, z])));

  terrainSurfaces.filter((surface) => surface.raised).forEach((surface, index) => {
    const baseY = surface.top - 0.195;
    void addPlatformerProp(scene, "platform", [surface.x, baseY, surface.z], 1, index % 2 ? Math.PI / 2 : 0);
  });
  void addPlatformerProp(scene, "platform-ramp", [0, 1, 3.75], 1, Math.PI);
  springPads.forEach((spring) => void addPlatformerProp(scene, "spring", [spring.x, 1, spring.z]));
  coinPlacements.forEach((coin) => {
    void addPlatformerProp(scene, "coin-gold", [coin.x, coin.y, coin.z]).then((prop) => {
      if (prop) (scene.userData.collectibles as THREE.Object3D[]).push(prop);
    });
  });
  void addPlatformerProp(scene, "flag", [0.2, 2.4, -3.1]);
  [[-4.25, 1, -4.2], [4.15, 1, 4.1], [-4.2, 1, 4.15], [4.15, 1, -4.15]].forEach(([x, y, z], index) => {
    void addPlatformerProp(scene, index % 2 ? "barrel" : "crate", [x, y, z], 0.8, index * 0.6);
  });
}

function buildCity(scene: THREE.Scene) {
  scene.background = new THREE.Color(0x78b8d0);
  scene.fog = new THREE.Fog(0x78b8d0, 24, 54);

  const hemi = new THREE.HemisphereLight(0xe7f7ff, 0x28384d, 2.5);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffe2ba, 3.2);
  sun.position.set(-16, 26, 12);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -28;
  sun.shadow.camera.right = 28;
  sun.shadow.camera.top = 28;
  sun.shadow.camera.bottom = -28;
  scene.add(sun);

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), makeMaterial(0x274a67));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.15;
  ground.receiveShadow = true;
  scene.add(ground);

  // Distant buildings retain the city identity while the playable area is
  // entirely built from Platformer Kit terrain and props.
  const blocks: Array<[number, number, number, number]> = [
    [-12, -10, 6, 0x405c72], [-8, -12, 8, 0x795f79], [-12, 10, 7, 0x5d7890], [-8, 12, 5, 0x8c6e67],
    [12, -10, 8, 0x4d7180], [8, -12, 5, 0x8d765b], [12, 10, 7, 0x566c83], [8, 12, 8, 0x76607f],
  ];
  blocks.forEach(([x, z, height, color], index) => {
    const width = 5 + (index % 2) * 2;
    const building = addBox(scene, [width, height, 5.5], [x, height / 2, z], color);
    building.userData = { cityProp: true };
    for (let row = 0; row < Math.floor(height / 1.4); row += 1) {
      for (let col = 0; col < 3; col += 1) {
        const window = addBox(scene, [0.52, 0.48, 0.035], [x - width / 2 + 1 + col * 1.25, 1 + row * 1.35, z - 2.78], 0xf7cd7d);
        window.material.emissive = new THREE.Color(0x6f4a1f);
        window.material.emissiveIntensity = 0.55;
      }
    }
  });

  buildPlatformTerrain(scene);
}

export function CityLobby({ initialUsername, onUsernameChange }: CityLobbyProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const keysRef = useRef<Record<string, boolean>>({});
  const joystickRef = useRef({ x: 0, y: 0, active: false });
  const chatFeedRef = useRef<HTMLDivElement>(null);
  const jumpRef = useRef({ velocity: 0, grounded: true, springCooldown: 0 });
  const cameraYawRef = useRef(0);
  const playerRef = useRef<THREE.Group | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const npcRefs = useRef<Record<string, THREE.Group>>({});
  const realtimeChannelRef = useRef<any>(null);
  const localPlayerIdRef = useRef<string>("");
  const lastBroadcastRef = useRef(0);
  const [username, setUsername] = useState(initialUsername);
  const [nameDraft, setNameDraft] = useState(initialUsername);
  const [profile, setProfile] = useState<CharacterProfile>(defaultProfile);
  const [showCreator, setShowCreator] = useState(true);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [remotePlayers, setRemotePlayers] = useState<Record<string, LobbyPlayerState>>({});
  const [chatMessages, setChatMessages] = useState<LobbyMessage[]>([]);
  const [gameMenuOpen, setGameMenuOpen] = useState(false);
  const [gameInvite, setGameInvite] = useState<GameInvitation | null>(null);
  const [gameInviteBusy, setGameInviteBusy] = useState(false);
  const [activeRoom, setActiveRoom] = useState<Pick<GameRoom, "id" | "status"> | null>(null);
  const [realtimeStatus, setRealtimeStatus] = useState<"connecting" | "online" | "offline">("connecting");
  const [selected, setSelected] = useState<Resident | null>(null);
  const [interactionMode, setInteractionMode] = useState<"profile" | "messages">("profile");
  const [notice, setNotice] = useState("You are in the city. Find someone to play with.");
  const [isMoving, setIsMoving] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });
  const gameReady = profileLoaded && !showCreator;

  useEffect(() => {
    if (!gameReady) {
      setActiveRoom(null);
      return;
    }

    let isMounted = true;
    const refreshActiveRoom = async () => {
      try {
        const rooms = await getPlayerActiveGames(getPersistentPlayerId());
        const latestRooms = await Promise.all(rooms.map(async (room) => {
          try {
            // Resolve rooms whose last player presence has expired before
            // offering a rejoin action in the city.
            return await resolveInactiveGameRoom(room.id) ?? room;
          } catch {
            return room;
          }
        }));
        const availableRoom = latestRooms.find((room) => room.status !== "completed");
        if (isMounted) {
          setActiveRoom(availableRoom ? { id: availableRoom.id, status: availableRoom.status } : null);
        }
      } catch {
        if (isMounted) setActiveRoom(null);
      }
    };

    void refreshActiveRoom();
    const refreshIntervalId = window.setInterval(() => void refreshActiveRoom(), 5_000);

    return () => {
      isMounted = false;
      window.clearInterval(refreshIntervalId);
    };
  }, [gameReady]);

  useEffect(() => {
    const feed = chatFeedRef.current;
    if (feed) feed.scrollTop = feed.scrollHeight;
  }, [chatMessages.length]);

  useEffect(() => {
    try {
      const storedProfile = window.localStorage.getItem("city_lobby_character_profile");
      if (storedProfile) {
        const saved = JSON.parse(storedProfile) as { username?: string; appearance?: Partial<CharacterProfile> };
        if (saved.username) {
          setUsername(saved.username);
          setNameDraft(saved.username);
          onUsernameChange(saved.username);
        }
        const normalized = normalizeProfile(saved.appearance);
        setProfile(normalized);
        // Existing profiles predate explicit Mini Character selection, so
        // reopen the splash screen once and let those players choose a model.
        setShowCreator(!saved.appearance?.bodyVariant || !saved.appearance?.faceVariant);
      }
    } catch {
      // A malformed local profile should simply open the creator again.
      window.localStorage.removeItem("city_lobby_character_profile");
    } finally {
      setProfileLoaded(true);
    }
  }, [onUsernameChange]);

  const saveUsername = useCallback(() => {
    const value = nameDraft.trim().slice(0, 20);
    if (!value) return;
    window.localStorage.setItem("city_lobby_username", value);
    window.localStorage.setItem("city_lobby_character_profile", JSON.stringify({ username: value, appearance: profile }));
    setUsername(value);
    onUsernameChange(value);
    setShowCreator(false);
    setNotice("Your look is ready. Welcome to the city.");
  }, [nameDraft, onUsernameChange, profile]);

  useEffect(() => {
    const scene = sceneRef.current;
    const previous = playerRef.current;
    if (!scene || !previous) return;
    const position = previous.position.clone();
    scene.remove(previous);
    const next = createAvatar(profile.outfitColor, true, profile);
    next.position.copy(position);
    scene.add(next);
    playerRef.current = next;
    void hydrateAvatarWithKenney(next, profile, true, characterVariant(profile));
  }, [profile]);

  useEffect(() => {
    const mount = previewRef.current;
    if (!mount || !showCreator) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
    camera.position.set(3.1, 2.3, 5.2);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(Math.max(mount.clientWidth, 1), Math.max(mount.clientHeight, 1));
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xf7fbff, 0x34425b, 2.8));
    const keyLight = new THREE.DirectionalLight(0xffe1aa, 2.8);
    keyLight.position.set(-3, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);
    const stage = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.6, 0.16, 32), makeMaterial(0x426983));
    stage.position.y = -0.08;
    stage.receiveShadow = true;
    scene.add(stage);

    const previewAvatar = new THREE.Group();
    scene.add(previewAvatar);
    let mixer: THREE.AnimationMixer | null = null;
    let frame = 0;
    let cancelled = false;
    const timer = new THREE.Timer();
    timer.connect(document);
    void loadMiniCharacter(characterVariant(profile)).then((source) => {
      if (!source || cancelled) return;
      const model = cloneSkinnedModel(source) as THREE.Group;
      applyKenneyMaterials(model, profile, true);
      const bounds = new THREE.Box3().setFromObject(model);
      const scale = 2.25 / Math.max(bounds.max.y - bounds.min.y, 0.001);
      model.scale.setScalar(scale);
      model.position.y = -bounds.min.y * scale;
      previewAvatar.add(model);
      addMiniFace(previewAvatar, profile.faceVariant);
      const clips = source.userData.animations as THREE.AnimationClip[] | undefined;
      const idle = clips?.find((clip) => clip.name.toLowerCase() === "idle");
      if (idle) {
        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(idle).play();
      }
    });

    const renderPreview = (timestamp?: number) => {
      frame = window.requestAnimationFrame(renderPreview);
      timer.update(timestamp);
      previewAvatar.rotation.y = Math.sin(timer.getElapsed() * 0.55) * 0.24 - 0.35;
      mixer?.update(timer.getDelta());
      camera.lookAt(0, 1.05, 0);
      renderer.render(scene, camera);
    };
    renderPreview();
    const resize = () => {
      if (!mount.clientWidth || !mount.clientHeight) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", resize);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      timer.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [profile, showCreator]);

  // Presence keeps the shared roster durable for late joiners; Broadcast
  // carries movement because positions change much more often than presence.
  useEffect(() => {
    if (!gameReady) return;

    let client: ReturnType<typeof createClient>;
    try {
      client = createClient();
    } catch (error) {
      console.warn("Supabase lobby presence is unavailable:", error);
      setRealtimeStatus("offline");
      return;
    }

    const playerId = getPersistentPlayerId();
    localPlayerIdRef.current = playerId;
    const channel = client.channel("city-lobby:central-plaza", {
      config: { presence: { key: playerId } },
    });
    realtimeChannelRef.current = channel;

    const applyPresence = () => {
      const next: Record<string, LobbyPlayerState> = {};
      const state = channel.presenceState() as Record<string, LobbyPlayerState[]>;
      Object.values(state).flat().forEach((player) => {
        if (!player?.id || player.id === playerId) return;
        next[player.id] = {
          ...player,
          appearance: normalizeProfile(player.appearance),
          position: player.position ?? { x: 0, y: 1, z: 4 },
        };
      });
      setRemotePlayers(next);
    };

    channel
      .on("presence", { event: "sync" }, applyPresence)
      .on("presence", { event: "leave" }, ({ key }) => {
        setRemotePlayers((current) => {
          if (!current[key]) return current;
          const next = { ...current };
          delete next[key];
          return next;
        });
      })
      .on("broadcast", { event: "player_state" }, ({ payload }) => {
        if (!payload?.id || payload.id === playerId) return;
        setRemotePlayers((current) => ({
          ...current,
          [payload.id]: {
            ...current[payload.id],
            ...payload,
            appearance: normalizeProfile(payload.appearance ?? current[payload.id]?.appearance),
            position: payload.position ?? current[payload.id]?.position ?? { x: 0, y: 1, z: 4 },
          },
        }));
      })
      .on("broadcast", { event: "lobby_message" }, ({ payload }) => {
        if (payload?.to === playerId && payload.message) {
          setNotice(`${payload.fromName ?? "A player"}: “${payload.message}”`);
          setChatMessages((current) => [...current, {
            id: `${payload.from ?? "player"}-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            playerName: payload.fromName ?? "A player",
            message: payload.message,
            isMine: false,
          }].slice(-100));
        }
      })
      .on("broadcast", { event: "game_invitation" }, ({ payload }) => {
        if (payload?.to === playerId && payload.roomId && payload.gameId === "battleship") {
          setGameInvite(payload as GameInvitation);
        }
      })
      .on("broadcast", { event: "game_invitation_response" }, ({ payload }) => {
        if (payload?.to !== playerId || !payload.roomId) return;
        if (payload.accepted) {
          setNotice(`${payload.fromName ?? "Your opponent"} accepted. Opening Battleship...`);
          window.localStorage.setItem("battleship_username", username);
          window.location.assign(`/battleship?room=${encodeURIComponent(payload.roomId)}`);
        } else {
          setNotice(`${payload.fromName ?? "Your opponent"} declined the game invitation.`);
        }
      })
      .subscribe(async (status) => {
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") {
          setRealtimeStatus("offline");
          return;
        }
        if (status !== "SUBSCRIBED") return;
        setRealtimeStatus("online");
        await channel.track({
          id: playerId,
          username,
          appearance: profile,
          position: { x: playerRef.current?.position.x ?? 0, y: playerRef.current?.position.y ?? 1, z: playerRef.current?.position.z ?? 4 },
          yaw: playerRef.current?.rotation.y ?? Math.PI,
          moving: false,
          running: false,
          jumping: false,
          activity: "Idle",
        });
      });

    return () => {
      realtimeChannelRef.current = null;
      setRemotePlayers({});
      void channel.untrack();
      void channel.unsubscribe();
    };
  }, [gameReady, profile, username]);

  useEffect(() => {
    if (!gameReady) return;
    const onKeyDown = (event: KeyboardEvent) => {
      keysRef.current[event.key.toLowerCase()] = true;
      if (event.code === "Space" && (event.target as HTMLElement | null)?.tagName !== "INPUT") {
        if (jumpRef.current.grounded) {
          jumpRef.current.velocity = 0.15;
          jumpRef.current.grounded = false;
        }
        event.preventDefault();
      }
      if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright", "shift"].includes(event.key.toLowerCase())) event.preventDefault();
    };
    const onKeyUp = (event: KeyboardEvent) => { keysRef.current[event.key.toLowerCase()] = false; };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => { window.removeEventListener("keydown", onKeyDown); window.removeEventListener("keyup", onKeyUp); };
  }, [gameReady]);

  useEffect(() => {
    if (!mountRef.current || !gameReady) return;
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    buildCity(scene);

    const camera = new THREE.PerspectiveCamera(48, mount.clientWidth / Math.max(mount.clientHeight, 1), 0.1, 120);
    camera.position.set(0, 7, 10);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    const player = createAvatar(profile.outfitColor, true, profile);
    player.position.set(0, 1, 4);
    scene.add(player);
    playerRef.current = player;
    void hydrateAvatarWithKenney(player, profile, true, characterVariant(profile));
    residents.forEach((resident) => {
      const npcAppearance: CharacterProfile = { ...defaultProfile, outfitColor: resident.color, gender: resident.id === "kai" || resident.id === "leo" ? "masculine" : "feminine", bodyVariant: resident.id === "mira" || resident.id === "leo" ? "c" : "a", faceVariant: resident.id === "kai" ? "cheerful" : resident.id === "zoe" ? "calm" : "friendly" };
      const npc = createAvatar(resident.color, false, npcAppearance);
      npc.position.set(resident.position.x, resident.position.y ?? 1, resident.position.z);
      npc.userData.residentId = resident.id;
      npc.userData.ambient = true;
      scene.add(npc);
      const label = createNameLabel(resident.name);
      if (label) npc.add(label);
      npcRefs.current[resident.id] = npc;
      addNameplate(scene, resident);
      void hydrateAvatarWithKenney(npc, npcAppearance, false, characterVariant(npcAppearance));
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const onPointerDown = (event: PointerEvent) => {
      const bounds = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(Object.values(npcRefs.current), true);
      const hit = hits[0]?.object;
      const npc = hit?.parent?.userData.residentId ? hit.parent : hit?.parent?.parent;
      const residentId = npc?.userData.residentId;
      if (residentId) {
        const remote = npc.userData.remotePlayer as LobbyPlayerState | undefined;
        const target = remote
          ? {
              id: remote.id,
              name: remote.username,
              role: "City player",
              mood: remote.activity,
              color: remote.appearance.outfitColor,
              position: remote.position,
            }
          : residents.find((resident) => resident.id === residentId) ?? null;
        setSelected(target);
        setInteractionMode("profile");
      }
    };
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    setSceneReady(true);

    const timer = new THREE.Timer();
    timer.connect(document);
    let frame = 0;
    const animate = (timestamp?: number) => {
      frame = window.requestAnimationFrame(animate);
      timer.update(timestamp);
      const delta = timer.getDelta();
      const elapsed = timer.getElapsed();
      const keys = keysRef.current;
      const turn = (keys.a || keys.arrowleft ? 1 : 0) - (keys.d || keys.arrowright ? 1 : 0);
      cameraYawRef.current += turn * 0.04;
      const localX = joystickRef.current.x;
      const localZ = (keys.s || keys.arrowdown ? 1 : 0) - (keys.w || keys.arrowup ? 1 : 0) + joystickRef.current.y;
      const x = localX * Math.cos(cameraYawRef.current) + localZ * Math.sin(cameraYawRef.current);
      const z = -localX * Math.sin(cameraYawRef.current) + localZ * Math.cos(cameraYawRef.current);
      const moving = Math.abs(x) > 0.05 || Math.abs(z) > 0.05;
      const running = Boolean(keys.shift) && moving;
      setIsMoving((previous) => previous === moving ? previous : moving);
      setIsRunning((previous) => previous === running ? previous : running);
      if (playerRef.current) {
        const player = playerRef.current;
        const length = Math.hypot(x, z) || 1;
        const speed = running ? 0.13 : 0.07;
        if (moving) {
          const nextX = THREE.MathUtils.clamp(player.position.x + (x / length) * speed, -7, 7);
          const nextZ = THREE.MathUtils.clamp(player.position.z + (z / length) * speed, -7, 7);
          if (!isTerrainBlocked(nextX, nextZ, player.position.y)) {
            player.position.x = nextX;
            player.position.z = nextZ;
            player.rotation.y = Math.atan2(x, z);
          }
        }
        if (jumpRef.current.grounded) {
          const support = terrainSurfaceBelow(player.position.x, player.position.z, player.position.y + 0.34);
          if (!support || support.top < player.position.y - 0.34) {
            jumpRef.current.grounded = false;
            jumpRef.current.velocity = -0.04;
          } else {
            player.position.y = support.top;
          }
        }
        if (!jumpRef.current.grounded) {
          const previousY = player.position.y;
          player.position.y += jumpRef.current.velocity;
          jumpRef.current.velocity -= 0.007;
          if (jumpRef.current.velocity <= 0) {
            const landing = terrainSurfaces
              .filter((surface) => isOnSurface(surface, player.position.x, player.position.z) && surface.top <= previousY + 0.1 && surface.top >= player.position.y - 0.08)
              .sort((first, second) => second.top - first.top)[0];
            if (landing) {
              player.position.y = landing.top;
              jumpRef.current.velocity = 0;
              jumpRef.current.grounded = true;
            }
          }
          if (player.position.y < -2) {
            player.position.set(0, 1, 4);
            jumpRef.current.velocity = 0;
            jumpRef.current.grounded = true;
            setNotice("The district respawn pad brought you back to the plaza.");
          }
        }
        if (jumpRef.current.grounded && elapsed > jumpRef.current.springCooldown) {
          const spring = springPads.find((pad) => Math.hypot(player.position.x - pad.x, player.position.z - pad.z) < 0.48);
          if (spring) {
            jumpRef.current.velocity = 0.22;
            jumpRef.current.grounded = false;
            jumpRef.current.springCooldown = elapsed + 0.8;
            setNotice("Spring pad! You launched into the air.");
          }
        }
        const collectibles = scene.userData.collectibles as THREE.Object3D[] | undefined;
        collectibles?.forEach((coin) => {
          if (coin.userData.collected) return;
          coin.rotation.y += delta * 4.5;
          if (Math.hypot(player.position.x - coin.position.x, player.position.z - coin.position.z) < 0.5 && Math.abs(player.position.y - coin.position.y) < 1.15) {
            coin.userData.collected = true;
            coin.visible = false;
            setNotice("You collected a plaza coin.");
          }
        });
        const limbs = player.userData.limbs as THREE.Object3D[];
        const mixer = player.userData.mixer as THREE.AnimationMixer | undefined;
        if (mixer) {
          updateAvatarAnimation(player, moving, running, !jumpRef.current.grounded);
          mixer.update(delta);
        } else {
          const swing = moving ? Math.sin(elapsed * (running ? 16 : 11)) * (running ? 0.62 : 0.42) : Math.sin(elapsed * 2) * 0.025;
          if (limbs.length === 4) { limbs[0].rotation.x = swing; limbs[1].rotation.x = -swing; limbs[2].rotation.x = -swing * 0.65; limbs[3].rotation.x = swing * 0.65; }
        }
        const target = new THREE.Vector3(
          player.position.x + Math.sin(cameraYawRef.current) * 5.6,
          player.position.y + 3.4,
          player.position.z + Math.cos(cameraYawRef.current) * 5.6
        );
        camera.position.lerp(target, 0.08);
        camera.lookAt(player.position.x, player.position.y + 1.05, player.position.z);
      }
      Object.values(npcRefs.current).forEach((npc, index) => {
        const remote = npc.userData.remotePlayer as LobbyPlayerState | undefined;
        if (remote) {
          const target = remote.position;
          npc.position.x = THREE.MathUtils.lerp(npc.position.x, target.x, 0.18);
          npc.position.z = THREE.MathUtils.lerp(npc.position.z, target.z, 0.18);
          const terrainY = remote.position.y ?? terrainSurfaceBelow(target.x, target.z, Infinity)?.top ?? 1;
          npc.position.y = THREE.MathUtils.lerp(npc.position.y, remote.jumping ? terrainY + 0.32 : terrainY, 0.18);
          npc.rotation.y = THREE.MathUtils.lerp(npc.rotation.y, remote.yaw, 0.18);
          const limbs = npc.userData.limbs as THREE.Object3D[];
          const mixer = npc.userData.mixer as THREE.AnimationMixer | undefined;
          if (mixer) {
            updateAvatarAnimation(npc, remote.moving, remote.running, remote.jumping);
            mixer.update(delta);
          } else {
            const swing = remote.moving ? Math.sin(elapsed * (remote.running ? 16 : 11)) * (remote.running ? 0.62 : 0.42) : Math.sin(elapsed * 2) * 0.025;
            if (limbs.length === 4) { limbs[0].rotation.x = swing; limbs[1].rotation.x = -swing; limbs[2].rotation.x = -swing * 0.65; limbs[3].rotation.x = swing * 0.65; }
          }
          return;
        }
        const idle = Math.sin(elapsed * 1.6 + index) * 0.025;
        npc.position.y = (residents[index]?.position.y ?? 1) + idle;
        npc.rotation.y = Math.sin(elapsed * 0.32 + index) * 0.18;
      });
      if (realtimeChannelRef.current && playerRef.current && elapsed - lastBroadcastRef.current > 0.12) {
        lastBroadcastRef.current = elapsed;
        void realtimeChannelRef.current.send({
          type: "broadcast",
          event: "player_state",
          payload: {
            id: localPlayerIdRef.current,
            username,
            appearance: profile,
            position: { x: playerRef.current.position.x, y: playerRef.current.position.y, z: playerRef.current.position.z },
            yaw: playerRef.current.rotation.y,
            moving,
            running,
            jumping: !jumpRef.current.grounded,
            activity: running ? "Running through the district" : moving ? "Exploring the district" : "Idle",
          },
        });
      }
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!mount.clientWidth || !mount.clientHeight) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);
    return () => {
      scene.userData.disposed = true;
      window.cancelAnimationFrame(frame);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
      timer.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      playerRef.current = null;
      sceneRef.current = null;
      setSceneReady(false);
      npcRefs.current = {};
    };
  }, [gameReady]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || !gameReady || !sceneReady) return;
    const remoteIds = new Set(Object.keys(remotePlayers));

    Object.entries(remotePlayers).forEach(([id, player]) => {
      const appearanceKey = JSON.stringify(player.appearance);
      const existing = npcRefs.current[id];
      if (existing && existing.userData.remoteAppearanceKey !== appearanceKey) {
        scene.remove(existing);
        delete npcRefs.current[id];
      }
      const avatar = npcRefs.current[id] ?? createAvatar(player.appearance.outfitColor, false, player.appearance);
      avatar.userData.remotePlayer = player;
      avatar.userData.remoteAppearanceKey = appearanceKey;
      avatar.userData.residentId = id;
      if (!npcRefs.current[id]) {
        avatar.position.set(player.position.x, player.position.y ?? terrainSurfaceBelow(player.position.x, player.position.z, Infinity)?.top ?? 1, player.position.z);
        const label = createNameLabel(player.username);
        if (label) avatar.add(label);
        scene.add(avatar);
        npcRefs.current[id] = avatar;
        void hydrateAvatarWithKenney(avatar, player.appearance, false, characterVariant(player.appearance));
      }
    });

    Object.entries(npcRefs.current).forEach(([id, avatar]) => {
      if (avatar.userData.remotePlayer && !remoteIds.has(id)) {
        scene.remove(avatar);
        delete npcRefs.current[id];
      }
    });
  }, [gameReady, remotePlayers, sceneReady]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || !gameReady || !sceneReady || realtimeStatus !== "online") return;
    Object.entries(npcRefs.current).forEach(([id, avatar]) => {
      if (avatar.userData.ambient) {
        scene.remove(avatar);
        delete npcRefs.current[id];
      }
    });
  }, [gameReady, realtimeStatus, sceneReady]);

  const updateJoystick = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const max = rect.width * 0.34;
    const x = THREE.MathUtils.clamp(event.clientX - (rect.left + rect.width / 2), -max, max);
    const y = THREE.MathUtils.clamp(event.clientY - (rect.top + rect.height / 2), -max, max);
    joystickRef.current = { x: x / max, y: y / max, active: true };
    setJoystickPosition({ x, y });
  };
  const endJoystick = () => {
    joystickRef.current = { x: 0, y: 0, active: false };
    setJoystickPosition({ x: 0, y: 0 });
  };

  const interact = (action: string) => {
    if (!selected) return;
    setNotice(`${action} sent to ${selected.name}.`);
  };

  const sendLobbyMessage = (message: string) => {
    if (!selected) return;
    setNotice(`Message sent to ${selected.name}: “${message}”`);
    setChatMessages((current) => [...current, {
      id: `${localPlayerIdRef.current || "me"}-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      playerName: username || "You",
      message,
      isMine: true,
    }].slice(-100));
    if (realtimeChannelRef.current && localPlayerIdRef.current) {
      void realtimeChannelRef.current.send({
        type: "broadcast",
        event: "lobby_message",
        payload: {
          from: localPlayerIdRef.current,
          fromName: username,
          to: selected.id,
          message,
        },
      });
    }
    setInteractionMode("profile");
  };

  const sendGameInvitation = async (gameId: "battleship") => {
    if (!selected || !remotePlayers[selected.id] || !realtimeChannelRef.current || !localPlayerIdRef.current) {
      setNotice("Choose an online player to send a game invitation.");
      setGameMenuOpen(false);
      return;
    }

    try {
      const roomId = await createGameRoom(localPlayerIdRef.current);
      const invitation: GameInvitation = {
        id: `${localPlayerIdRef.current}-${Date.now()}`,
        gameId,
        roomId,
        from: localPlayerIdRef.current,
        fromName: username,
        to: selected.id,
      };
      await realtimeChannelRef.current.send({ type: "broadcast", event: "game_invitation", payload: invitation });
      setGameMenuOpen(false);
      setNotice(`Battleship invitation sent to ${selected.name}.`);
    } catch (error) {
      console.error("Failed to create game invitation:", error);
      setNotice("Could not start the invitation. Please try again.");
      setGameMenuOpen(false);
    }
  };

  const enterBattleship = (roomId: string) => {
    window.localStorage.setItem("battleship_username", username);
    window.location.assign(`/battleship?room=${encodeURIComponent(roomId)}`);
  };

  const respondToGameInvitation = async (accepted: boolean) => {
    if (!gameInvite || !realtimeChannelRef.current || !localPlayerIdRef.current) return;
    setGameInviteBusy(true);
    try {
      if (accepted) {
        await joinGameRoom(gameInvite.roomId, localPlayerIdRef.current);
      }
      await realtimeChannelRef.current.send({
        type: "broadcast",
        event: "game_invitation_response",
        payload: {
          invitationId: gameInvite.id,
          roomId: gameInvite.roomId,
          from: localPlayerIdRef.current,
          fromName: username,
          to: gameInvite.from,
          accepted,
        },
      });
      const roomId = gameInvite.roomId;
      setGameInvite(null);
      if (accepted) enterBattleship(roomId);
    } catch (error) {
      console.error("Failed to respond to game invitation:", error);
      setNotice("The invitation is no longer available.");
      setGameInvite(null);
    } finally {
      setGameInviteBusy(false);
    }
  };

  return (
    <main className="city-lobby">
      <div className={`creator-wallpaper ${showCreator ? "creator-wallpaper-visible" : ""}`} />
      <div ref={mountRef} className="city-canvas" aria-label="3D city lobby" />
      <div className="city-vignette" />
      <header className="lobby-header">
        <div className="lobby-brand"><span className="brand-mark">✦</span><div><strong>NEON DISTRICT</strong><small>social game lobby</small></div></div>
        <div className="lobby-status"><span className="live-dot" /> {realtimeStatus === "online" ? `${Object.keys(remotePlayers).length + 1} players online` : realtimeStatus === "connecting" ? "Connecting to city..." : "Offline preview"}</div>
        {gameReady && activeRoom && <button className="rejoin-game-button" onClick={() => window.location.assign(`/battleship?room=${encodeURIComponent(activeRoom.id)}`)}><span>↻</span> Rejoin Battleship</button>}
        <div className="lobby-user"><span className="mini-avatar">{username.slice(0, 1).toUpperCase() || "?"}</span>{username || "Visitor"}</div>
      </header>
      {gameReady && <>
        <section className="lobby-intro"><p className="eyebrow">DISTRICT 01 · CENTRAL PLAZA</p><h1>Find your <em>people.</em></h1><p className="intro-copy">Walk the city, meet fellow players, and turn a hello into your next match.</p></section>
        <div className="city-notice"><span className="notice-pulse" />{notice}</div>
        <section className="chat-feed" aria-label="Lobby chat">
          <div className="chat-feed-header"><span className="live-dot" /> DISTRICT CHAT <small>{chatMessages.length ? `${chatMessages.length} messages` : "No messages yet"}</small></div>
          <div ref={chatFeedRef} className="chat-feed-list">
            {chatMessages.length === 0 ? <p className="chat-empty">Messages from players will appear here.</p> : chatMessages.map((entry) => <article className={`chat-message ${entry.isMine ? "mine" : ""}`} key={entry.id}><div className="chat-message-meta"><strong>{entry.playerName}</strong><time>{entry.timestamp}</time></div><p>{entry.message}</p></article>)}
          </div>
        </section>
        <aside className={`interaction-card ${selected ? "is-open" : ""}`} aria-live="polite">
        {selected ? <>
          <button className="close-card" onClick={() => { setSelected(null); setInteractionMode("profile"); }} aria-label="Close interaction card">×</button>
          <div className="resident-avatar" style={{ backgroundColor: `#${selected.color.toString(16).padStart(6, "0")}` }}>{selected.name.slice(0, 1)}</div>
          {interactionMode === "profile" ? <>
            <p className="eyebrow">PLAYER PROFILE</p><h2>{selected.name}</h2><p className="resident-role">{selected.role}</p><p className="resident-mood">“{selected.mood}”</p>
            <div className="interaction-actions game-actions"><button onClick={() => setGameMenuOpen((open) => !open)}>Start a game <span>↗</span></button>{gameMenuOpen && <div className="game-picker"><p className="game-picker-label">AVAILABLE GAMES</p><button className="game-option" onClick={() => void sendGameInvitation("battleship")}><span><strong>Battleship</strong><small>Naval strategy · 2 players</small></span><b>Invite →</b></button></div>}<button onClick={() => setInteractionMode("messages")}>Send a message <span>⌁</span></button><button onClick={() => interact("Party invite")}>Invite to party <span>+</span></button></div>
          </> : <>
            <p className="eyebrow">CHOOSE A MESSAGE</p><h2>Say hello</h2><p className="resident-mood">Pick a quick message to send to {selected.name}.</p>
            <div className="interaction-actions message-actions">{messages.map((message) => <button key={message} onClick={() => sendLobbyMessage(message)}>{message} <span>→</span></button>)}<button onClick={() => setInteractionMode("profile")}>Back to profile <span>←</span></button></div>
          </>}
        </> : <div className="interaction-empty"><span className="cursor-icon">⌁</span><strong>Meet someone</strong><p>Click a character in the city to see interaction options.</p></div>}
        </aside>
        <div className="movement-hint"><kbd>W</kbd><kbd>S</kbd><span>move</span><kbd>A</kbd><kbd>D</kbd><span>turn</span><kbd>⇧</kbd><span>run</span><kbd className="space-key">SPACE</kbd><span>jump · springs launch · coins collect</span></div>
        <div className="mobile-joystick" onPointerMove={updateJoystick} onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); updateJoystick(event); }} onPointerUp={endJoystick} onPointerCancel={endJoystick} aria-label="Movement joystick"><div className="joystick-ring"><div className="joystick-thumb" style={{ transform: `translate(${joystickPosition.x}px, ${joystickPosition.y}px)` }} /></div></div>
        <div className={`movement-state ${isMoving ? "moving" : ""}`}>{isMoving ? (isRunning ? "RUNNING" : "WALKING") : "IDLE"}</div>
      </>}
      {profileLoaded && showCreator && <div className="character-creator">
        <div className="creator-copy">
          <p className="eyebrow">NEON DISTRICT · CHARACTER SETUP</p>
          <h1>Make your<br /><em>entrance.</em></h1>
          <p className="creator-description">This is your city. Choose the look that feels like you before stepping into the crowd.</p>
          <div className="creator-progress"><span className="progress-active" /><span /><span /> <small>01 / 03 · YOUR IDENTITY</small></div>
        </div>
        <div className="creator-panel">
          <div className="creator-panel-header"><div><p className="eyebrow">PLAYER IDENTITY</p><h2>Who are you in the city?</h2></div><span className="creator-orbit">✦</span></div>
          <label className="creator-label" htmlFor="creator-name">USERNAME</label>
          <input id="creator-name" className="creator-name-input" autoFocus={!nameDraft} value={nameDraft} maxLength={20} placeholder="Choose a name" onChange={(event) => setNameDraft(event.target.value)} />
          <div className="creator-section"><label className="creator-label">GENDER</label><div className="choice-row"><button className={profile.gender === "feminine" ? "choice selected" : "choice"} onClick={() => setProfile((current) => ({ ...current, gender: "feminine" }))}>Female</button><button className={profile.gender === "masculine" ? "choice selected" : "choice"} onClick={() => setProfile((current) => ({ ...current, gender: "masculine" }))}>Male</button></div></div>
          <div className="creator-section"><label className="creator-label">CHOOSE A BODY</label><div className="body-choice-grid">{(["a", "b", "c", "d", "e", "f"] as const).map((variant, index) => <button key={variant} className={profile.bodyVariant === variant ? "body-choice selected" : "body-choice"} onClick={() => setProfile((current) => ({ ...current, bodyVariant: variant }))}><span>{index + 1}</span><small>Body {variant.toUpperCase()}</small></button>)}</div></div>
          <div className="creator-section"><label className="creator-label">CHOOSE A FACE</label><div className="face-choice-grid">{(["friendly", "calm", "focused", "cheerful", "cool", "surprised"] as const).map((face) => <button key={face} className={profile.faceVariant === face ? "face-choice selected" : "face-choice"} onClick={() => setProfile((current) => ({ ...current, faceVariant: face }))}>{face}</button>)}</div></div>
          <div className="creator-section"><label className="creator-label">SKIN TONE</label><div className="swatch-row">{skinOptions.map((color) => <button key={color} aria-label={`Skin tone ${color}`} className={profile.skinColor === color ? "swatch selected" : "swatch"} style={{ backgroundColor: `#${color.toString(16)}` }} onClick={() => setProfile((current) => ({ ...current, skinColor: color }))} />)}</div></div>
          <div className="creator-section"><label className="creator-label">OUTFIT COLOR</label><div className="swatch-row">{outfitOptions.map((color) => <button key={color} aria-label={`Outfit color ${color}`} className={profile.outfitColor === color ? "swatch selected" : "swatch"} style={{ backgroundColor: `#${color.toString(16)}` }} onClick={() => setProfile((current) => ({ ...current, outfitColor: color }))} />)}</div></div>
          <button className="enter-city-button" onClick={saveUsername} disabled={!nameDraft.trim()}>Enter the city <span>→</span></button>
          <p className="creator-footnote">Your choices are saved on this device · <a href="https://kenney.nl/assets/platformer-kit" target="_blank" rel="noreferrer">Platformer Kit</a> + <a href="https://kenney.nl/assets/mini-characters" target="_blank" rel="noreferrer">Mini Characters</a> by Kenney (CC0)</p>
        </div>
        <div ref={previewRef} className="creator-character-preview" aria-label="Mini character preview"><div className="preview-caption"><span className="live-dot" /> LIVE PREVIEW</div></div>
      </div>}
      {gameReady && gameInvite && <div className="game-invite-backdrop"><section className="game-invite-modal" role="dialog" aria-modal="true" aria-labelledby="game-invite-title"><div className="invite-icon">⚔</div><p className="eyebrow">INCOMING GAME INVITATION</p><h2 id="game-invite-title">{gameInvite.fromName} wants to play.</h2><p><strong>Battleship</strong> · A two-player room is ready for you both.</p><div className="invite-actions"><button className="invite-decline" onClick={() => void respondToGameInvitation(false)} disabled={gameInviteBusy}>Decline</button><button className="invite-accept" onClick={() => void respondToGameInvitation(true)} disabled={gameInviteBusy}>{gameInviteBusy ? "Joining..." : "Accept & join →"}</button></div></section></div>}
    </main>
  );
}
