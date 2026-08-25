import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Point = { x: number; z: number };
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
};

type CityLobbyProps = {
  initialUsername: string;
  onUsernameChange: (username: string) => void;
};

const residents: Resident[] = [
  { id: "kai", name: "Kai", role: "Puzzle runner", mood: "Looking for a quick match", color: 0xf58f70, position: { x: -6, z: -4 } },
  { id: "mira", name: "Mira", role: "Tactician", mood: "Open to team invites", color: 0x83d1c7, position: { x: 5, z: -5 } },
  { id: "leo", name: "Leo", role: "Speed climber", mood: "Practicing parkour", color: 0xf2c66d, position: { x: 7, z: 4 } },
  { id: "zoe", name: "Zoe", role: "City guide", mood: "Ask me about hidden spots", color: 0xb39bf4, position: { x: -7, z: 5 } },
];

const messages = ["Hey! Want to start a game?", "Meet me by the arcade.", "Nice to see you in the city!", "Want to team up?"];

const defaultProfile: CharacterProfile = {
  skinColor: 0xffd2b5,
  hairColor: 0x182b40,
  hairStyle: "waves",
  outfitColor: 0x70a8ef,
  gender: "androgynous",
};

const skinOptions = [0xf6d1b1, 0xd99b72, 0xb97955, 0x78472f];
const hairOptions = [0x182b40, 0x3a253d, 0x8b542f, 0xc88d46, 0xd9d6cb];
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

function createAvatar(color: number, isPlayer = false, appearance: CharacterProfile = defaultProfile) {
  const avatar = new THREE.Group();
  avatar.userData = { isPlayer, limbs: [] as THREE.Object3D[] };

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

function buildCity(scene: THREE.Scene) {
  scene.background = new THREE.Color(0x9dc7d1);
  scene.fog = new THREE.Fog(0x9dc7d1, 32, 72);

  const hemi = new THREE.HemisphereLight(0xdff5f2, 0x4c6172, 2.3);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffe2ba, 3.5);
  sun.position.set(-16, 26, 12);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -28;
  sun.shadow.camera.right = 28;
  sun.shadow.camera.top = 28;
  sun.shadow.camera.bottom = -28;
  scene.add(sun);

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), makeMaterial(0x567681));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const plaza = new THREE.Mesh(new THREE.CircleGeometry(10, 48), makeMaterial(0x8aa0a0));
  plaza.rotation.x = -Math.PI / 2;
  plaza.position.y = 0.012;
  plaza.receiveShadow = true;
  scene.add(plaza);

  const roadMaterial = makeMaterial(0x304956);
  const roadA = new THREE.Mesh(new THREE.PlaneGeometry(5, 70), roadMaterial);
  roadA.rotation.x = -Math.PI / 2;
  roadA.position.y = 0.02;
  scene.add(roadA);
  const roadB = new THREE.Mesh(new THREE.PlaneGeometry(70, 5), roadMaterial);
  roadB.rotation.x = -Math.PI / 2;
  roadB.position.y = 0.021;
  scene.add(roadB);

  // Four blocks of varied-height buildings create a readable city silhouette.
  const blocks: Array<[number, number, number, number]> = [
    [-17, -15, 4.5, 0x405c72], [-11, -17, 7, 0x795f79], [-18, 15, 8, 0x5d7890], [-11, 17, 5, 0x8c6e67],
    [16, -16, 8, 0x4d7180], [12, -17, 4.5, 0x8d765b], [17, 15, 6.5, 0x566c83], [11, 17, 9, 0x76607f],
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

  // Trees and lamps soften the hard city geometry around the walkable plaza.
  [-4, 4].forEach((x) => [-13, 13].forEach((z) => {
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.18, 1.2, 8), makeMaterial(0x6a4638));
    trunk.position.set(x, 0.6, z);
    trunk.castShadow = true;
    scene.add(trunk);
    const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(1.05, 1), makeMaterial(0x397768));
    crown.position.set(x, 1.75, z);
    crown.castShadow = true;
    scene.add(crown);
  }));
  [-8, 8].forEach((x) => [-11, 11].forEach((z) => {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.07, 2.3, 8), makeMaterial(0x253642, 0.35));
    pole.position.set(x, 1.15, z);
    scene.add(pole);
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), makeMaterial(0xffd981, 0.2));
    lamp.position.set(x, 2.35, z);
    scene.add(lamp);
  }));

  // The fountain makes the center feel like a place where players meet.
  const fountain = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.5, 0.25, 32), makeMaterial(0x668b98));
  fountain.position.y = 0.15;
  fountain.castShadow = true;
  scene.add(fountain);
  const water = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 0.08, 32), new THREE.MeshStandardMaterial({ color: 0x68cad0, roughness: 0.18, metalness: 0.25 }));
  water.position.y = 0.32;
  scene.add(water);
}

export function CityLobby({ initialUsername, onUsernameChange }: CityLobbyProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const keysRef = useRef<Record<string, boolean>>({});
  const joystickRef = useRef({ x: 0, y: 0, active: false });
  const jumpRef = useRef({ velocity: 0, grounded: true });
  const cameraYawRef = useRef(0);
  const playerRef = useRef<THREE.Group | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const npcRefs = useRef<Record<string, THREE.Group>>({});
  const [username, setUsername] = useState(initialUsername);
  const [nameDraft, setNameDraft] = useState(initialUsername);
  const [profile, setProfile] = useState<CharacterProfile>(defaultProfile);
  const [showCreator, setShowCreator] = useState(true);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [selected, setSelected] = useState<Resident | null>(null);
  const [interactionMode, setInteractionMode] = useState<"profile" | "messages">("profile");
  const [notice, setNotice] = useState("You are in the city. Find someone to play with.");
  const [isMoving, setIsMoving] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });

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
        setProfile({ ...defaultProfile, ...(saved.appearance ?? {}) });
        setShowCreator(false);
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
  }, [profile]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      keysRef.current[event.key.toLowerCase()] = true;
      if (event.code === "Space" && (event.target as HTMLElement | null)?.tagName !== "INPUT") {
        if (jumpRef.current.grounded) {
          jumpRef.current.velocity = 0.19;
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
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;
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

    const player = createAvatar(0x70a8ef, true);
    player.position.set(0, 0, 7);
    scene.add(player);
    playerRef.current = player;
    residents.forEach((resident) => {
      const npc = createAvatar(resident.color);
      npc.position.set(resident.position.x, 0, resident.position.z);
      npc.userData.residentId = resident.id;
      scene.add(npc);
      const label = createNameLabel(resident.name);
      if (label) npc.add(label);
      npcRefs.current[resident.id] = npc;
      addNameplate(scene, resident);
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
        setSelected(residents.find((resident) => resident.id === residentId) ?? null);
        setInteractionMode("profile");
      }
    };
    renderer.domElement.addEventListener("pointerdown", onPointerDown);

    const timer = new THREE.Timer();
    timer.connect(document);
    let frame = 0;
    const animate = (timestamp?: number) => {
      frame = window.requestAnimationFrame(animate);
      timer.update(timestamp);
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
          player.position.x = THREE.MathUtils.clamp(player.position.x + (x / length) * speed, -10, 10);
          player.position.z = THREE.MathUtils.clamp(player.position.z + (z / length) * speed, -10, 10);
          player.rotation.y = Math.atan2(x, z);
        }
        if (!jumpRef.current.grounded || player.position.y > 0) {
          player.position.y += jumpRef.current.velocity;
          jumpRef.current.velocity -= 0.008;
          if (player.position.y <= 0) {
            player.position.y = 0;
            jumpRef.current.velocity = 0;
            jumpRef.current.grounded = true;
          }
        }
        const limbs = player.userData.limbs as THREE.Object3D[];
        const swing = moving ? Math.sin(elapsed * (running ? 16 : 11)) * (running ? 0.62 : 0.42) : Math.sin(elapsed * 2) * 0.025;
        if (limbs.length === 4) { limbs[0].rotation.x = swing; limbs[1].rotation.x = -swing; limbs[2].rotation.x = -swing * 0.65; limbs[3].rotation.x = swing * 0.65; }
        const target = new THREE.Vector3(
          player.position.x + Math.sin(cameraYawRef.current) * 5.6,
          3.4,
          player.position.z + Math.cos(cameraYawRef.current) * 5.6
        );
        camera.position.lerp(target, 0.08);
        camera.lookAt(player.position.x, 1.1, player.position.z);
      }
      Object.values(npcRefs.current).forEach((npc, index) => {
        const idle = Math.sin(elapsed * 1.6 + index) * 0.025;
        npc.position.y = idle;
        npc.rotation.y = Math.sin(elapsed * 0.32 + index) * 0.18;
      });
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
      window.cancelAnimationFrame(frame);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
      timer.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      playerRef.current = null;
      sceneRef.current = null;
      npcRefs.current = {};
    };
  }, []);

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

  return (
    <main className="city-lobby">
      <div className={`creator-wallpaper ${showCreator ? "creator-wallpaper-visible" : ""}`} />
      <div ref={mountRef} className="city-canvas" aria-label="3D city lobby" />
      <div className="city-vignette" />
      <header className="lobby-header">
        <div className="lobby-brand"><span className="brand-mark">✦</span><div><strong>NEON DISTRICT</strong><small>social game lobby</small></div></div>
        <div className="lobby-status"><span className="live-dot" /> {residents.length + 1} players online</div>
        <div className="lobby-user"><span className="mini-avatar">{username.slice(0, 1).toUpperCase() || "?"}</span>{username || "Visitor"}</div>
      </header>
      <section className="lobby-intro"><p className="eyebrow">DISTRICT 01 · CENTRAL PLAZA</p><h1>Find your <em>people.</em></h1><p className="intro-copy">Walk the city, meet fellow players, and turn a hello into your next match.</p></section>
      <div className="city-notice"><span className="notice-pulse" />{notice}</div>
      <aside className={`interaction-card ${selected ? "is-open" : ""}`} aria-live="polite">
        {selected ? <>
          <button className="close-card" onClick={() => { setSelected(null); setInteractionMode("profile"); }} aria-label="Close interaction card">×</button>
          <div className="resident-avatar" style={{ backgroundColor: `#${selected.color.toString(16).padStart(6, "0")}` }}>{selected.name.slice(0, 1)}</div>
          {interactionMode === "profile" ? <>
            <p className="eyebrow">PLAYER PROFILE</p><h2>{selected.name}</h2><p className="resident-role">{selected.role}</p><p className="resident-mood">“{selected.mood}”</p>
            <div className="interaction-actions"><button onClick={() => interact("Game invite")}>Start a game <span>↗</span></button><button onClick={() => setInteractionMode("messages")}>Send a message <span>⌁</span></button><button onClick={() => interact("Party invite")}>Invite to party <span>+</span></button></div>
          </> : <>
            <p className="eyebrow">CHOOSE A MESSAGE</p><h2>Say hello</h2><p className="resident-mood">Pick a quick message to send to {selected.name}.</p>
            <div className="interaction-actions message-actions">{messages.map((message) => <button key={message} onClick={() => { setNotice(`Message sent to ${selected.name}: “${message}”`); setInteractionMode("profile"); }}>{message} <span>→</span></button>)}<button onClick={() => setInteractionMode("profile")}>Back to profile <span>←</span></button></div>
          </>}
        </> : <div className="interaction-empty"><span className="cursor-icon">⌁</span><strong>Meet someone</strong><p>Click a character in the city to see interaction options.</p></div>}
      </aside>
      <div className="movement-hint"><kbd>W</kbd><kbd>S</kbd><span>move</span><kbd>A</kbd><kbd>D</kbd><span>turn</span><kbd>⇧</kbd><span>run</span><kbd className="space-key">SPACE</kbd><span>jump</span></div>
      <div className="mobile-joystick" onPointerMove={updateJoystick} onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); updateJoystick(event); }} onPointerUp={endJoystick} onPointerCancel={endJoystick} aria-label="Movement joystick"><div className="joystick-ring"><div className="joystick-thumb" style={{ transform: `translate(${joystickPosition.x}px, ${joystickPosition.y}px)` }} /></div></div>
      <div className={`movement-state ${isMoving ? "moving" : ""}`}>{isMoving ? (isRunning ? "RUNNING" : "WALKING") : "IDLE"}</div>
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
          <div className="creator-section"><label className="creator-label">PRESENTATION</label><div className="choice-row">{(["feminine", "masculine", "androgynous"] as const).map((option) => <button key={option} className={profile.gender === option ? "choice selected" : "choice"} onClick={() => setProfile((current) => ({ ...current, gender: option }))}>{option}</button>)}</div></div>
          <div className="creator-section"><label className="creator-label">SKIN TONE</label><div className="swatch-row">{skinOptions.map((color) => <button key={color} aria-label={`Skin tone ${color}`} className={profile.skinColor === color ? "swatch selected" : "swatch"} style={{ backgroundColor: `#${color.toString(16)}` }} onClick={() => setProfile((current) => ({ ...current, skinColor: color }))} />)}</div></div>
          <div className="creator-section"><label className="creator-label">HAIR STYLE</label><div className="choice-row hair-choices">{(["crop", "waves", "bob", "ponytail"] as const).map((option) => <button key={option} className={profile.hairStyle === option ? "choice selected" : "choice"} onClick={() => setProfile((current) => ({ ...current, hairStyle: option }))}>{option}</button>)}</div></div>
          <div className="creator-section"><label className="creator-label">HAIR COLOR</label><div className="swatch-row">{hairOptions.map((color) => <button key={color} aria-label={`Hair color ${color}`} className={profile.hairColor === color ? "swatch selected" : "swatch"} style={{ backgroundColor: `#${color.toString(16)}` }} onClick={() => setProfile((current) => ({ ...current, hairColor: color }))} />)}</div></div>
          <div className="creator-section"><label className="creator-label">OUTFIT COLOR</label><div className="swatch-row">{outfitOptions.map((color) => <button key={color} aria-label={`Outfit color ${color}`} className={profile.outfitColor === color ? "swatch selected" : "swatch"} style={{ backgroundColor: `#${color.toString(16)}` }} onClick={() => setProfile((current) => ({ ...current, outfitColor: color }))} />)}</div></div>
          <button className="enter-city-button" onClick={saveUsername} disabled={!nameDraft.trim()}>Enter the city <span>→</span></button>
          <p className="creator-footnote">Your choices are saved on this device.</p>
        </div>
      </div>}
    </main>
  );
}
