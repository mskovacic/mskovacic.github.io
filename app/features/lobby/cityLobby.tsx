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
type DistrictId = "district-1" | "district-2";
type DistrictConfig = {
  label: string;
  terrainSurfaces: TerrainSurface[];
  springPads: Point[];
  coinPlacements: Array<{ x: number; y: number; z: number }>;
  gravity: number;
  jumpVelocity: number;
  springVelocity: number;
  walkSpeed: number;
  runSpeed: number;
};
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
  faceVariant: "a" | "b" | "c" | "d" | "e" | "f";
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
  faceVariant: "a",
};

const kenneyFaceVariants = ["a", "b", "c", "d", "e", "f"] as const;

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

const moonTerrainSurfaces: TerrainSurface[] = [
  { x: 0, z: 0, halfWidth: 5.2, halfDepth: 5.2, top: 1 },
  { x: -2.35, z: -1.8, halfWidth: 0.52, halfDepth: 0.52, top: 1.72, raised: true },
  { x: 2.35, z: -1.8, halfWidth: 0.52, halfDepth: 0.52, top: 1.72, raised: true },
  { x: 0, z: -3.15, halfWidth: 0.52, halfDepth: 0.52, top: 2.35, raised: true },
  { x: -3.6, z: 1.15, halfWidth: 0.52, halfDepth: 0.52, top: 1.72, raised: true },
  { x: 3.6, z: 1.15, halfWidth: 0.52, halfDepth: 0.52, top: 1.72, raised: true },
];

const moonSpringPads = [{ x: -0.85, z: 1.85 }, { x: 0.85, z: 1.85 }];
const moonCoinPlacements = [
  { x: -2.35, y: 2.12, z: -1.8 }, { x: 2.35, y: 2.12, z: -1.8 }, { x: 0, y: 2.72, z: -3.15 },
  { x: -3.6, y: 2.12, z: 1.15 }, { x: 3.6, y: 2.12, z: 1.15 },
];

const districtConfigs: Record<DistrictId, DistrictConfig> = {
  "district-1": {
    label: "District 1 · Neon City",
    terrainSurfaces,
    springPads,
    coinPlacements,
    gravity: 0.007,
    jumpVelocity: 0.15,
    springVelocity: 0.22,
    walkSpeed: 0.07,
    runSpeed: 0.13,
  },
  "district-2": {
    label: "District 2 · Moon Base",
    terrainSurfaces: moonTerrainSurfaces,
    springPads: moonSpringPads,
    coinPlacements: moonCoinPlacements,
    gravity: 0.0032,
    jumpVelocity: 0.12,
    springVelocity: 0.17,
    walkSpeed: 0.055,
    runSpeed: 0.1,
  },
};

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

function normalizeFaceVariant(value: unknown): CharacterProfile["faceVariant"] {
  return kenneyFaceVariants.includes(value as CharacterProfile["faceVariant"])
    ? value as CharacterProfile["faceVariant"]
    : "a";
}

function normalizeProfile(appearance?: Partial<CharacterProfile>): CharacterProfile {
  const legacyVariant = appearance?.miniCharacter === "c" ? "c" : undefined;
  return {
    ...defaultProfile,
    ...(appearance ?? {}),
    characterSet: "mini",
    bodyVariant: appearance?.bodyVariant ?? legacyVariant ?? "a",
    faceVariant: normalizeFaceVariant((appearance as { faceVariant?: unknown } | undefined)?.faceVariant),
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
    // another player's appearance. Keep the Kenney map on the cloned material;
    // replacing it with a new flat material makes the old procedural look
    // appear even though the Kenney model has already loaded.
    const tintMaterial = (source: THREE.Material) => {
      const material = source.clone() as THREE.MeshStandardMaterial;
      material.color?.set(color);
      material.roughness = 0.82;
      material.metalness = 0.08;
      return material;
    };
    child.material = Array.isArray(child.material)
      ? child.material.map(tintMaterial)
      : tintMaterial(child.material);
    child.castShadow = true;
    child.receiveShadow = true;
  });
}

function applyKenneyFaceVariant(model: THREE.Group, faceSource: THREE.Group, appearance: CharacterProfile, isPlayer: boolean) {
  const currentHead = model.getObjectByName("head-mesh");
  const faceModel = cloneSkinnedModel(faceSource) as THREE.Group;
  applyKenneyMaterials(faceModel, appearance, isPlayer);
  const faceHead = faceModel.getObjectByName("head-mesh");
  if (!(currentHead instanceof THREE.SkinnedMesh) || !(faceHead instanceof THREE.SkinnedMesh)) return;

  // Keep the body's original SkinnedMesh and skeleton. The face assets use
  // the same bind pose and bone names, so only their geometry/material need
  // to be swapped. Mounting a cloned face scene beside the body creates a
  // second skeleton, which leaves the face behind when the body animates.
  currentHead.geometry = faceHead.geometry;
  currentHead.material = faceHead.material;
  currentHead.visible = true;
}

function addMoonCharacterDetails(model: THREE.Group) {
  const visorMaterial = new THREE.MeshStandardMaterial({
    color: 0x7ed7f5,
    emissive: 0x174d78,
    emissiveIntensity: 0.55,
    metalness: 0.2,
    roughness: 0.2,
    transparent: true,
    opacity: 0.78,
  });
  const head = model.getObjectByName("head");
  if (head) {
    const visor = new THREE.Mesh(new THREE.SphereGeometry(0.085, 12, 8), visorMaterial);
    visor.name = "moon-visor";
    visor.position.set(0, 0.01, 0.12);
    visor.scale.set(1.35, 0.72, 0.45);
    visor.castShadow = true;
    head.add(visor);
  }

  const torso = model.getObjectByName("torso");
  if (torso) {
    const backpack = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.17, 0.055), makeMaterial(0xc9e7ee, 0.48));
    backpack.name = "moon-backpack";
    backpack.position.set(0, 0.02, -0.085);
    backpack.castShadow = true;
    torso.add(backpack);
  }
}

async function hydrateAvatarWithKenney(avatar: THREE.Group, appearance: CharacterProfile, isPlayer: boolean, variant: string) {
  // Do not show the procedural placeholder while the Kenney asset is loading.
  // This also hides an already-rendered avatar while it is being replaced.
  avatar.visible = false;
  const appearanceKey = JSON.stringify(appearance);
  const family = appearance.gender === "masculine" ? "male" : "female";
  const [modelSource, faceSource] = await Promise.all([
    loadMiniCharacter(variant),
    loadMiniCharacter(`${family}-${appearance.faceVariant}`),
  ]);
  if (!modelSource || !faceSource || avatar.userData.appearanceKey !== appearanceKey) return;

  const model = cloneSkinnedModel(modelSource) as THREE.Group;
  applyKenneyMaterials(model, appearance, isPlayer);
  if (variant !== `${family}-${appearance.faceVariant}`) applyKenneyFaceVariant(model, faceSource, appearance, isPlayer);
  if (avatar.userData.district === "district-2") addMoonCharacterDetails(model);
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
  if (label) avatar.add(label);
  const limbs: THREE.Object3D[] = [];
  model.traverse((child) => {
    if (child.visible && ["leg-left", "leg-right", "arm-left", "arm-right"].includes(child.name)) limbs.push(child);
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
  avatar.visible = true;
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

function createAvatar(color: number, isPlayer = false, appearance: CharacterProfile = defaultProfile, district: DistrictId = "district-1") {
  const avatar = new THREE.Group();
  avatar.userData = { isPlayer, district, limbs: [] as THREE.Object3D[], appearanceKey: JSON.stringify(appearance) };
  // The procedural meshes below are only a loading placeholder. Keep the
  // avatar hidden until the Kenney model has replaced them.
  avatar.visible = false;

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

const spacePropLoaders = new Map<string, Promise<THREE.Group | null>>();
function loadSpaceProp(name: string) {
  const existing = spacePropLoaders.get(name);
  if (existing) return existing;
  const promise = new Promise<THREE.Group | null>((resolve) => {
    new GLTFLoader().load(
      `/assets/kenney-space-kit/${name}.glb`,
      (gltf) => resolve(gltf.scene),
      undefined,
      () => resolve(null),
    );
  });
  spacePropLoaders.set(name, promise);
  return promise;
}

async function addSpaceProp(scene: THREE.Scene, name: string, position: [number, number, number], scale = 1, rotationY = 0) {
  const source = await loadSpaceProp(name);
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

function terrainSurfaceBelow(surfaces: TerrainSurface[], x: number, z: number, maximumTop: number) {
  return surfaces
    .filter((surface) => isOnSurface(surface, x, z) && surface.top <= maximumTop)
    .sort((first, second) => second.top - first.top)[0];
}

function isTerrainBlocked(surfaces: TerrainSurface[], x: number, z: number, playerHeight: number) {
  return surfaces.some((surface) => surface.raised && isOnSurface(surface, x, z) && playerHeight < surface.top - 0.26);
}

function addMoonCrater(scene: THREE.Scene, x: number, z: number, radius: number, y = 1.012) {
  const crater = new THREE.Mesh(
    new THREE.RingGeometry(radius * 0.54, radius, 24),
    makeMaterial(0x687383, 0.96),
  );
  crater.rotation.x = -Math.PI / 2;
  crater.position.set(x, y, z);
  crater.receiveShadow = true;
  scene.add(crater);
}

function buildMoonTerrain(scene: THREE.Scene, config: DistrictConfig) {
  const lunarPlate = new THREE.Mesh(new THREE.CylinderGeometry(5.25, 5.55, 0.4, 48), makeMaterial(0x9aa4b2, 0.96));
  lunarPlate.position.y = 0.8;
  lunarPlate.receiveShadow = true;
  scene.add(lunarPlate);

  [[-3.8, -3.6, 0.72], [3.5, -3.15, 0.58], [-3.8, 3.35, 0.52], [3.8, 3.2, 0.8], [0.8, 0.2, 0.42]].forEach(([x, z, radius]) => addMoonCrater(scene, x, z, radius));

  config.terrainSurfaces.filter((surface) => surface.raised).forEach((surface) => {
    const height = surface.top - 1;
    const platform = new THREE.Mesh(new THREE.CylinderGeometry(surface.halfWidth, surface.halfWidth * 1.16, height, 12), makeMaterial(0x7e8999, 0.92));
    platform.position.set(surface.x, 1 + height / 2, surface.z);
    platform.castShadow = true;
    platform.receiveShadow = true;
    scene.add(platform);
    addMoonCrater(scene, surface.x, surface.z, surface.halfWidth * 0.7, surface.top + 0.012);
  });

  config.springPads.forEach((spring) => {
    const pad = addBox(scene, [0.82, 0.08, 0.82], [spring.x, 1.05, spring.z], 0x55d8ed);
    pad.material.emissive = new THREE.Color(0x0e6f9b);
    pad.material.emissiveIntensity = 1.1;
  });
  config.coinPlacements.forEach((coin) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.055, 8, 18), makeMaterial(0xffd66e, 0.28));
    ring.position.set(coin.x, coin.y, coin.z);
    ring.rotation.x = Math.PI / 2;
    ring.material.emissive = new THREE.Color(0x9a5d12);
    ring.material.emissiveIntensity = 0.7;
    ring.castShadow = true;
    ring.userData = { districtCollectible: true };
    scene.add(ring);
    (scene.userData.collectibles as THREE.Object3D[]).push(ring);
  });

  const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 1.9, 10), makeMaterial(0x5cc8e2, 0.3));
  beacon.position.set(0, 1.95, 0);
  beacon.material.emissive = new THREE.Color(0x14617c);
  beacon.material.emissiveIntensity = 1.2;
  beacon.castShadow = true;
  scene.add(beacon);

  void addSpaceProp(scene, "machine_generator", [-2.9, 1.05, 3.25], 0.62, 0.35);
  void addSpaceProp(scene, "satelliteDish", [3.35, 1.02, 3.35], 0.72, -0.45);
  void addSpaceProp(scene, "meteor_detailed", [-3.8, 1.55, -3.35], 0.42, 0.2);
  void addSpaceProp(scene, "craterLarge", [2.95, 1.01, -3.55], 0.8, 0.1);
  void addSpaceProp(scene, "crater", [-3.85, 1.01, 0.15], 0.7, -0.25);
}

function buildPlatformTerrain(scene: THREE.Scene, district: DistrictId) {
  const config = districtConfigs[district];
  scene.userData.terrainSurfaces = config.terrainSurfaces;
  scene.userData.springs = config.springPads;
  scene.userData.collectibles = [] as THREE.Object3D[];
  if (district === "district-2") {
    buildMoonTerrain(scene, config);
    return;
  }
  const tilePositions = [-4.16, 0, 4.16];
  tilePositions.forEach((x) => tilePositions.forEach((z) => void addPlatformerProp(scene, "block-grass-large", [x, 0, z])));

  config.terrainSurfaces.filter((surface) => surface.raised).forEach((surface, index) => {
    const baseY = surface.top - 0.195;
    void addPlatformerProp(scene, "platform", [surface.x, baseY, surface.z], 1, index % 2 ? Math.PI / 2 : 0);
  });
  void addPlatformerProp(scene, "platform-ramp", [0, 1, 3.75], 1, Math.PI);
  config.springPads.forEach((spring) => void addPlatformerProp(scene, "spring", [spring.x, 1, spring.z]));
  config.coinPlacements.forEach((coin) => {
    void addPlatformerProp(scene, "coin-gold", [coin.x, coin.y, coin.z]).then((prop) => {
      if (prop) (scene.userData.collectibles as THREE.Object3D[]).push(prop);
    });
  });
  void addPlatformerProp(scene, "flag", [0.2, 2.4, -3.1]);
  [[-4.25, 1, -4.2], [4.15, 1, 4.1], [-4.2, 1, 4.15], [4.15, 1, -4.15]].forEach(([x, y, z], index) => {
    void addPlatformerProp(scene, index % 2 ? "barrel" : "crate", [x, y, z], 0.8, index * 0.6);
  });
}

function buildSpaceBackdrop(scene: THREE.Scene) {
  const starPositions = new Float32Array(240 * 3);
  for (let index = 0; index < 240; index += 1) {
    const angle = index * 2.39996;
    const radius = 16 + (index % 17) * 1.7;
    starPositions[index * 3] = Math.cos(angle) * radius;
    starPositions[index * 3 + 1] = 5 + (index % 19) * 1.25;
    starPositions[index * 3 + 2] = -18 + Math.sin(angle) * radius;
  }
  const stars = new THREE.Points(
    new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3)),
    new THREE.PointsMaterial({ color: 0xd8f4ff, size: 0.08, sizeAttenuation: true }),
  );
  scene.add(stars);

  const planet = new THREE.Mesh(new THREE.SphereGeometry(4.5, 24, 16), new THREE.MeshStandardMaterial({ color: 0x294b78, roughness: 0.95 }));
  planet.position.set(-15, 13, -28);
  planet.castShadow = true;
  scene.add(planet);

  const halo = new THREE.Mesh(new THREE.SphereGeometry(4.9, 24, 16), new THREE.MeshBasicMaterial({ color: 0x496d9c, transparent: true, opacity: 0.12, side: THREE.BackSide }));
  halo.position.copy(planet.position);
  scene.add(halo);
}

function buildCity(scene: THREE.Scene, district: DistrictId) {
  const isMoonDistrict = district === "district-2";
  scene.background = new THREE.Color(isMoonDistrict ? 0x020716 : 0x78b8d0);
  scene.fog = new THREE.Fog(isMoonDistrict ? 0x020716 : 0x78b8d0, 24, 54);

  const hemi = new THREE.HemisphereLight(isMoonDistrict ? 0xb8ddff : 0xe7f7ff, isMoonDistrict ? 0x11152d : 0x28384d, isMoonDistrict ? 1.65 : 2.5);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(isMoonDistrict ? 0xaedcff : 0xffe2ba, isMoonDistrict ? 2.4 : 3.2);
  sun.position.set(isMoonDistrict ? -10 : -16, 26, isMoonDistrict ? 8 : 12);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -28;
  sun.shadow.camera.right = 28;
  sun.shadow.camera.top = 28;
  sun.shadow.camera.bottom = -28;
  scene.add(sun);

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), makeMaterial(isMoonDistrict ? 0x080d1d : 0x274a67));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.15;
  ground.receiveShadow = true;
  scene.add(ground);

  if (isMoonDistrict) {
    buildSpaceBackdrop(scene);
    buildPlatformTerrain(scene, district);
    return;
  }

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

  buildPlatformTerrain(scene, district);
}

export function CityLobby({ initialUsername, onUsernameChange }: CityLobbyProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const districtMenuRef = useRef<HTMLDivElement>(null);
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
  const [district, setDistrict] = useState<DistrictId>("district-1");
  const [showCreator, setShowCreator] = useState(true);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [remotePlayers, setRemotePlayers] = useState<Record<string, LobbyPlayerState>>({});
  const [chatMessages, setChatMessages] = useState<LobbyMessage[]>([]);
  const [gameMenuOpen, setGameMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [districtMenuOpen, setDistrictMenuOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState<number | null>(null);
  const [feedbackComment, setFeedbackComment] = useState("");
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
  const [fps, setFps] = useState<number | null>(null);
  const gameReady = profileLoaded && !showCreator;

  useEffect(() => {
    if (!profileMenuOpen) return;

    const closeMenuOnOutsideClick = (event: PointerEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    const closeMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProfileMenuOpen(false);
    };

    document.addEventListener("pointerdown", closeMenuOnOutsideClick);
    document.addEventListener("keydown", closeMenuOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeMenuOnOutsideClick);
      document.removeEventListener("keydown", closeMenuOnEscape);
    };
  }, [profileMenuOpen]);

  useEffect(() => {
    if (!districtMenuOpen) return;

    const closeMenuOnOutsideClick = (event: PointerEvent) => {
      if (districtMenuRef.current && !districtMenuRef.current.contains(event.target as Node)) {
        setDistrictMenuOpen(false);
      }
    };
    const closeMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDistrictMenuOpen(false);
    };

    document.addEventListener("pointerdown", closeMenuOnOutsideClick);
    document.addEventListener("keydown", closeMenuOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeMenuOnOutsideClick);
      document.removeEventListener("keydown", closeMenuOnEscape);
    };
  }, [districtMenuOpen]);

  useEffect(() => {
    if (!gameReady) return;

    let frameCount = 0;
    let intervalStart = performance.now();
    let animationFrame = 0;
    const measureFrame = (timestamp: number) => {
      frameCount += 1;
      const elapsed = timestamp - intervalStart;
      if (elapsed >= 1000) {
        setFps(Math.round((frameCount * 1000) / elapsed));
        frameCount = 0;
        intervalStart = timestamp;
      }
      animationFrame = window.requestAnimationFrame(measureFrame);
    };

    animationFrame = window.requestAnimationFrame(measureFrame);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [gameReady]);

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

  const openFeedback = () => {
    setProfileMenuOpen(false);
    setFeedbackRating(null);
    setFeedbackComment("");
    setFeedbackOpen(true);
  };

  const closeFeedback = () => {
    setFeedbackOpen(false);
    setFeedbackRating(null);
    setFeedbackComment("");
  };

  const submitFeedback = () => {
    if (!feedbackRating) return;
    try {
      window.localStorage.setItem("city_lobby_feedback", JSON.stringify({
        rating: feedbackRating,
        comment: feedbackComment.trim(),
        submittedAt: new Date().toISOString(),
      }));
    } catch {
      // Feedback should still close successfully if local storage is unavailable.
    }
    closeFeedback();
    setNotice("Thanks for helping shape the city.");
  };

  useEffect(() => {
    const scene = sceneRef.current;
    const previous = playerRef.current;
    if (!scene || !previous) return;
    const position = previous.position.clone();
    scene.remove(previous);
    const next = createAvatar(profile.outfitColor, true, profile, district);
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
    const bodyVariant = characterVariant(profile);
    const family = profile.gender === "masculine" ? "male" : "female";
    void Promise.all([loadMiniCharacter(bodyVariant), loadMiniCharacter(`${family}-${profile.faceVariant}`)]).then(([source, faceSource]) => {
      if (!source || !faceSource || cancelled) return;
      const model = cloneSkinnedModel(source) as THREE.Group;
      applyKenneyMaterials(model, profile, true);
      if (bodyVariant !== `${family}-${profile.faceVariant}`) applyKenneyFaceVariant(model, faceSource, profile, true);
      if (district === "district-2") addMoonCharacterDetails(model);
      const bounds = new THREE.Box3().setFromObject(model);
      const scale = 2.25 / Math.max(bounds.max.y - bounds.min.y, 0.001);
      model.scale.setScalar(scale);
      model.position.y = -bounds.min.y * scale;
      previewAvatar.add(model);
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
  }, [profile, showCreator, district]);

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
          jumpRef.current.velocity = districtConfigs[district].jumpVelocity;
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
  }, [gameReady, district]);

  useEffect(() => {
    if (!mountRef.current || !gameReady) return;
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const config = districtConfigs[district];
    const surfaces = config.terrainSurfaces;
    sceneRef.current = scene;
    buildCity(scene, district);

    const camera = new THREE.PerspectiveCamera(window.matchMedia("(max-width: 720px)").matches ? 58 : 48, mount.clientWidth / Math.max(mount.clientHeight, 1), 0.1, 120);
    camera.position.set(0, 7, 10);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    const player = createAvatar(profile.outfitColor, true, profile, district);
    player.position.set(0, 1, 4);
    scene.add(player);
    playerRef.current = player;
    void hydrateAvatarWithKenney(player, profile, true, characterVariant(profile));
    residents.forEach((resident) => {
      const npcAppearance: CharacterProfile = { ...defaultProfile, outfitColor: resident.color, gender: resident.id === "kai" || resident.id === "leo" ? "masculine" : "feminine", bodyVariant: resident.id === "mira" || resident.id === "leo" ? "c" : "a", faceVariant: resident.id === "kai" ? "b" : resident.id === "zoe" ? "c" : "a" };
      const npc = createAvatar(resident.color, false, npcAppearance, district);
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
        const speed = running ? config.runSpeed : config.walkSpeed;
        if (moving) {
          const nextX = THREE.MathUtils.clamp(player.position.x + (x / length) * speed, -7, 7);
          const nextZ = THREE.MathUtils.clamp(player.position.z + (z / length) * speed, -7, 7);
          if (!isTerrainBlocked(surfaces, nextX, nextZ, player.position.y)) {
            player.position.x = nextX;
            player.position.z = nextZ;
            player.rotation.y = Math.atan2(x, z);
          }
        }
        if (jumpRef.current.grounded) {
          const support = terrainSurfaceBelow(surfaces, player.position.x, player.position.z, player.position.y + 0.34);
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
          jumpRef.current.velocity -= config.gravity;
          if (jumpRef.current.velocity <= 0) {
            const landing = surfaces
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
          const spring = config.springPads.find((pad) => Math.hypot(player.position.x - pad.x, player.position.z - pad.z) < 0.48);
          if (spring) {
            jumpRef.current.velocity = config.springVelocity;
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
          const terrainY = remote.position.y ?? terrainSurfaceBelow(surfaces, target.x, target.z, Infinity)?.top ?? 1;
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
  }, [gameReady, district]);

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
      const avatar = npcRefs.current[id] ?? createAvatar(player.appearance.outfitColor, false, player.appearance, district);
      avatar.userData.remotePlayer = player;
      avatar.userData.remoteAppearanceKey = appearanceKey;
      avatar.userData.residentId = id;
      if (!npcRefs.current[id]) {
        const surfaces = scene.userData.terrainSurfaces as TerrainSurface[];
        avatar.position.set(player.position.x, player.position.y ?? terrainSurfaceBelow(surfaces, player.position.x, player.position.z, Infinity)?.top ?? 1, player.position.z);
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
  }, [gameReady, remotePlayers, sceneReady, district]);

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
      {gameReady && <header className="lobby-header">
        <div className="lobby-brand">
          <span className="brand-mark">✦</span>
          <div>
            <strong>NEON DISTRICT</strong>
            <div className="header-district-picker" ref={districtMenuRef}>
              <button
                className="header-district-trigger"
                type="button"
                aria-haspopup="menu"
                aria-expanded={districtMenuOpen}
                onClick={() => setDistrictMenuOpen((open) => !open)}
              >
                <span>{districtConfigs[district].label}</span><b>⌄</b>
              </button>
              {districtMenuOpen && <div className="header-district-menu" role="menu">
                <button className={`header-district-option ${district === "district-1" ? "selected" : ""}`} role="menuitem" type="button" onClick={() => { setDistrict("district-1"); setNotice(`Traveling to ${districtConfigs["district-1"].label}.`); setDistrictMenuOpen(false); }}>
                  {districtConfigs["district-1"].label}
                </button>
                <button className={`header-district-option ${district === "district-2" ? "selected" : ""}`} role="menuitem" type="button" onClick={() => { setDistrict("district-2"); setNotice(`Traveling to ${districtConfigs["district-2"].label}.`); setDistrictMenuOpen(false); }}>
                  {districtConfigs["district-2"].label}
                </button>
              </div>}
            </div>
          </div>
        </div>
        <div className="lobby-status"><span className="live-dot" /> {realtimeStatus === "online" ? `${Object.keys(remotePlayers).length + 1} players online` : realtimeStatus === "connecting" ? "Connecting to city..." : "Offline preview"}</div>
        <div className="lobby-fps" aria-label={fps === null ? "Frames per second: measuring" : `Frames per second: ${fps}`}>FPS {fps ?? "—"}</div>
        {gameReady && activeRoom && <button className="rejoin-game-button" onClick={() => window.location.assign(`/battleship?room=${encodeURIComponent(activeRoom.id)}`)}><span>↻</span> Rejoin Battleship</button>}
        <div className="profile-menu-container" ref={profileMenuRef}>
          <button className="lobby-user" onClick={() => setProfileMenuOpen((open) => !open)} aria-haspopup="menu" aria-expanded={profileMenuOpen} aria-label="Open profile menu">
            <span className="mini-avatar">{username.slice(0, 1).toUpperCase() || "?"}</span><span className="lobby-user-name">{username || "Visitor"}</span>
          </button>
          {profileMenuOpen && <div className="profile-menu" role="menu">
            <button className="profile-menu-item" role="menuitem" onClick={() => { setShowCreator(true); setSelected(null); setGameMenuOpen(false); setProfileMenuOpen(false); }}><span>✦</span> Return to selection screen <b>→</b></button>
            <button className="profile-menu-item" role="menuitem" onClick={openFeedback}><span>☺</span> Rate this <b>→</b></button>
          </div>}
        </div>
      </header>}
      {gameReady && <>
        <section className="lobby-intro"><p className="eyebrow">DISTRICT 01 · CENTRAL PLAZA</p><h1>Dare to <em>explore.</em></h1><p className="intro-copy">Walk the city, meet fellow players, and turn a hello into your next match.</p></section>
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
            <div className="interaction-actions game-actions"><button onClick={() => setGameMenuOpen((open) => !open)}>Start a game <span>↗</span></button>{gameMenuOpen && <div className="game-picker"><label className="district-picker" htmlFor="district-select"><span>SELECT DISTRICT</span><select id="district-select" value={district} onChange={(event) => { const nextDistrict = event.target.value as DistrictId; setDistrict(nextDistrict); setNotice(`Traveling to ${districtConfigs[nextDistrict].label}.`); }}><option value="district-1">District 1 · Neon City</option><option value="district-2">District 2 · Moon Base</option></select></label><p className="game-picker-label">AVAILABLE GAMES</p><button className="game-option" onClick={() => void sendGameInvitation("battleship")}><span><strong>Battleship</strong><small>Naval strategy · 2 players</small></span><b>Invite →</b></button></div>}<button onClick={() => setInteractionMode("messages")}>Send a message <span>⌁</span></button><button onClick={() => interact("Party invite")}>Invite to party <span>+</span></button></div>
          </> : <>
            <p className="eyebrow">CHOOSE A MESSAGE</p><h2>Say hello</h2><p className="resident-mood">Pick a quick message to send to {selected.name}.</p>
            <div className="interaction-actions message-actions">{messages.map((message) => <button key={message} onClick={() => sendLobbyMessage(message)}>{message} <span>→</span></button>)}<button onClick={() => setInteractionMode("profile")}>Back to profile <span>←</span></button></div>
          </>}
        </> : <div className="interaction-empty"><span className="cursor-icon">⌁</span><strong>Meet someone</strong><p>Click a character in the city to see interaction options.</p></div>}
        </aside>
        <div className="movement-hint">
          <div className="movement-control-group"><div className="movement-control-keys"><kbd>W</kbd><kbd>S</kbd></div><span>move</span></div>
          <div className="movement-control-group"><div className="movement-control-keys"><kbd>A</kbd><kbd>D</kbd></div><span>turn</span></div>
          <div className="movement-control-group"><kbd>⇧</kbd><span>run</span></div>
          <div className="movement-control-group"><kbd className="space-key">SPACE</kbd><span>jump · springs launch · coins collect</span></div>
        </div>
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
          <div className="creator-section"><label className="creator-label">CHOOSE A FACE</label><div className="face-choice-grid">{kenneyFaceVariants.map((variant, index) => <button key={variant} className={profile.faceVariant === variant ? "face-choice selected" : "face-choice"} onClick={() => setProfile((current) => ({ ...current, faceVariant: variant }))}><span>{index + 1}</span><small>Face {variant.toUpperCase()}</small></button>)}</div></div>
          <button className="enter-city-button" onClick={saveUsername} disabled={!nameDraft.trim()}>Enter the city <span>→</span></button>
          <p className="creator-footnote">Your choices are saved on this device · <a href="https://kenney.nl/assets/platformer-kit" target="_blank" rel="noreferrer">Platformer Kit</a> + <a href="https://kenney.nl/assets/mini-characters" target="_blank" rel="noreferrer">Mini Characters</a> by Kenney (CC0)</p>
        </div>
        <div ref={previewRef} className="creator-character-preview" aria-label="Mini character preview"><div className="preview-caption"><span className="live-dot" /> LIVE PREVIEW</div></div>
      </div>}
      {gameReady && feedbackOpen && <div className="feedback-backdrop">
        <section className="feedback-modal" role="dialog" aria-modal="true" aria-labelledby="feedback-title">
          <button className="feedback-close" onClick={closeFeedback} aria-label="Close feedback form">×</button>
          <div className="feedback-icon">♥</div>
          <p className="eyebrow">CITY FEEDBACK</p>
          <h2 id="feedback-title">How does the lobby feel?</h2>
          <p className="feedback-description">Tell us how satisfied you are with your time in the city.</p>
          <div className="satisfaction-options" role="radiogroup" aria-label="Satisfaction rating">
            {["😞", "🙁", "😐", "🙂", "😍"].map((emoji, index) => {
              const rating = index + 1;
              return <button key={emoji} className={`satisfaction-option ${feedbackRating === rating ? "selected" : ""}`} onClick={() => setFeedbackRating(rating)} role="radio" aria-checked={feedbackRating === rating} aria-label={`${rating} out of 5`} type="button"><span>{emoji}</span><small>{rating}</small></button>;
            })}
          </div>
          <label className="feedback-label" htmlFor="feedback-comment">COMMENT <span>OPTIONAL</span></label>
          <textarea id="feedback-comment" className="feedback-comment" value={feedbackComment} maxLength={500} placeholder="What would make the city better?" onChange={(event) => setFeedbackComment(event.target.value)} />
          <div className="feedback-actions"><button className="feedback-cancel" onClick={closeFeedback} type="button">Cancel</button><button className="feedback-submit" onClick={submitFeedback} disabled={!feedbackRating} type="button">Send feedback <span>→</span></button></div>
        </section>
      </div>}
      {gameReady && gameInvite && <div className="game-invite-backdrop"><section className="game-invite-modal" role="dialog" aria-modal="true" aria-labelledby="game-invite-title"><div className="invite-icon">⚔</div><p className="eyebrow">INCOMING GAME INVITATION</p><h2 id="game-invite-title">{gameInvite.fromName} wants to play.</h2><p><strong>Battleship</strong> · A two-player room is ready for you both.</p><div className="invite-actions"><button className="invite-decline" onClick={() => void respondToGameInvitation(false)} disabled={gameInviteBusy}>Decline</button><button className="invite-accept" onClick={() => void respondToGameInvitation(true)} disabled={gameInviteBusy}>{gameInviteBusy ? "Joining..." : "Accept & join →"}</button></div></section></div>}
    </main>
  );
}
