'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export type SceneMode = 'sense' | 'identify' | 'generate' | 'track' | 'dodge' | 'flank' | 'strike';

type HoloSceneProps = {
  mode: SceneMode;
  interactive?: boolean;
  className?: string;
};

const cyan = 0x37dcff;
const blue = 0x236cff;
const magenta = 0xe447ff;
const acid = 0xdfff4f;
const danger = 0xff405b;

function holoMaterial(color = cyan, opacity = 0.82) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 1.25,
    transparent: true,
    opacity,
    wireframe: true,
    roughness: 0.25,
    metalness: 0.35,
  });
}

function solidMaterial(color = cyan, opacity = 0.2) {
  return new THREE.MeshPhysicalMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.75,
    transparent: true,
    opacity,
    roughness: 0.2,
    metalness: 0.55,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
}

function cylinderBetween(start: THREE.Vector3, end: THREE.Vector3, radius: number, material: THREE.Material) {
  const direction = new THREE.Vector3().subVectors(end, start);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, direction.length(), 10), material);
  mesh.position.copy(start).add(end).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
  return mesh;
}

function createHuman(color = cyan, pose: 'neutral' | 'strike' = 'neutral') {
  const human = new THREE.Group();
  const material = holoMaterial(color, 0.9);
  const joint = (x: number, y: number, z: number, radius: number) => {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 12, 9), material);
    mesh.position.set(x, y, z);
    human.add(mesh);
  };
  human.add(new THREE.Mesh(new THREE.SphereGeometry(0.28, 18, 14), material));
  human.children[0].position.set(0, 2.42, 0);
  human.add(new THREE.Mesh(new THREE.CapsuleGeometry(0.36, 0.95, 5, 12), material));
  human.children[1].position.set(0, 1.48, 0);

  const shoulderL = new THREE.Vector3(-0.38, 1.9, 0);
  const shoulderR = new THREE.Vector3(0.38, 1.9, 0);
  const elbowL = pose === 'strike' ? new THREE.Vector3(-0.82, 2.35, 0.08) : new THREE.Vector3(-0.62, 1.2, 0.02);
  const handL = pose === 'strike' ? new THREE.Vector3(-1.35, 2.16, 0.18) : new THREE.Vector3(-0.72, 0.55, 0.03);
  const elbowR = pose === 'strike' ? new THREE.Vector3(0.9, 1.75, -0.08) : new THREE.Vector3(0.62, 1.2, 0.02);
  const handR = pose === 'strike' ? new THREE.Vector3(1.48, 2.24, 0.04) : new THREE.Vector3(0.72, 0.55, 0.03);
  human.add(cylinderBetween(shoulderL, elbowL, 0.11, material), cylinderBetween(elbowL, handL, 0.085, material));
  human.add(cylinderBetween(shoulderR, elbowR, 0.11, material), cylinderBetween(elbowR, handR, 0.085, material));
  [shoulderL, shoulderR, elbowL, elbowR, handL, handR].forEach((point, index) => joint(point.x, point.y, point.z, index < 2 ? 0.13 : 0.1));

  const hipL = new THREE.Vector3(-0.23, 0.95, 0);
  const hipR = new THREE.Vector3(0.23, 0.95, 0);
  const kneeL = new THREE.Vector3(-0.26, 0.08, 0.04);
  const kneeR = new THREE.Vector3(0.26, 0.08, -0.02);
  const footL = new THREE.Vector3(-0.28, -0.82, 0.08);
  const footR = new THREE.Vector3(0.28, -0.82, 0.08);
  human.add(cylinderBetween(hipL, kneeL, 0.14, material), cylinderBetween(kneeL, footL, 0.11, material));
  human.add(cylinderBetween(hipR, kneeR, 0.14, material), cylinderBetween(kneeR, footR, 0.11, material));
  [hipL, hipR, kneeL, kneeR, footL, footR].forEach((point) => joint(point.x, point.y, point.z, 0.12));
  return human;
}

function createBoss() {
  const boss = new THREE.Group();
  const shell = holoMaterial(danger, 0.82);
  const core = solidMaterial(danger, 0.7);
  const torso = new THREE.Mesh(new THREE.IcosahedronGeometry(1.15, 1), shell);
  torso.scale.set(1.18, 1.1, 0.9);
  torso.position.y = 0.65;
  boss.add(torso);
  const head = new THREE.Mesh(new THREE.IcosahedronGeometry(0.58, 1), shell);
  head.position.set(0, 1.9, 0.12);
  boss.add(head);
  [-1, 1].forEach((side) => {
    const horn = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.92, 8), shell);
    horn.position.set(side * 0.43, 2.42, 0.08);
    horn.rotation.z = side * -0.42;
    boss.add(horn);
    const arm = cylinderBetween(new THREE.Vector3(side * 0.82, 1.15, 0), new THREE.Vector3(side * 1.55, 0.18, 0.14), 0.22, shell);
    boss.add(arm);
  });
  const coreMesh = new THREE.Mesh(new THREE.SphereGeometry(0.22, 20, 14), core);
  coreMesh.position.set(0, 0.86, 0.88);
  coreMesh.userData.pulse = true;
  boss.add(coreMesh);
  return boss;
}

function addRing(group: THREE.Group, radius: number, color = cyan, y = -0.84, tilt = 0) {
  const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.012, 8, 100), solidMaterial(color, 0.62));
  ring.rotation.x = Math.PI / 2 + tilt;
  ring.position.y = y;
  ring.userData.spin = 0.15 + radius * 0.08;
  group.add(ring);
  return ring;
}

function buildScene(mode: SceneMode) {
  const root = new THREE.Group();
  addRing(root, 1.25, cyan);
  addRing(root, 1.65, blue);
  addRing(root, 2.05, magenta);

  if (mode === 'sense') {
    const person = createHuman();
    person.position.x = 1.2;
    root.add(person);
    const camera = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.7, 0.72), holoMaterial(blue));
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.25, 20), solidMaterial(cyan, 0.72));
    lens.rotation.x = Math.PI / 2;
    lens.position.z = 0.47;
    camera.add(body, lens);
    camera.position.set(-1.8, 0.7, 0);
    root.add(camera);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(1.2, 2.7, 28, 1, true), solidMaterial(cyan, 0.08));
    cone.rotation.z = -Math.PI / 2;
    cone.position.set(-0.35, 0.7, 0);
    root.add(cone);
  }

  if (mode === 'identify') {
    const person = createHuman();
    root.add(person);
    [0.72, 1.02, 1.34].forEach((radius, index) => {
      const target = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.018, 8, 80), solidMaterial(index === 1 ? magenta : cyan, 0.62));
      target.position.y = 1.75;
      target.userData.spin = index % 2 ? -0.35 : 0.3;
      root.add(target);
    });
  }

  if (mode === 'generate') {
    const nodes = new THREE.Group();
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.82, 2), holoMaterial(magenta, 0.88));
    core.position.y = 0.74;
    core.userData.spinY = 0.32;
    nodes.add(core);
    const ears = [-1, 1].map((side) => {
      const ear = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.8, 8), holoMaterial(cyan));
      ear.position.set(side * 0.48, 1.62, 0);
      ear.rotation.z = side * -0.2;
      return ear;
    });
    nodes.add(...ears);
    const orbit = new THREE.Mesh(new THREE.TorusKnotGeometry(1.48, 0.025, 140, 10, 2, 3), solidMaterial(cyan, 0.56));
    orbit.rotation.x = 1.2;
    orbit.position.y = 0.66;
    orbit.userData.spinY = -0.2;
    nodes.add(orbit);
    root.add(nodes);
  }

  if (mode === 'track') {
    const person = createHuman();
    root.add(person);
    const orbit = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.015, 8, 120), solidMaterial(acid, 0.62));
    orbit.rotation.x = Math.PI / 2;
    orbit.position.y = 0.55;
    root.add(orbit);
    for (let i = 0; i < 3; i += 1) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 10), solidMaterial(acid, 0.9));
      const angle = (i / 3) * Math.PI * 2;
      eye.position.set(Math.cos(angle) * 2.15, 0.58, Math.sin(angle) * 2.15);
      eye.userData.orbit = { radius: 2.15, angle, speed: 0.26 };
      root.add(eye);
    }
  }

  if (mode === 'dodge' || mode === 'flank') {
    const boss = createBoss();
    boss.position.x = -0.72;
    boss.scale.setScalar(0.86);
    root.add(boss);
    const player = createHuman(acid);
    player.scale.setScalar(0.66);
    player.position.set(1.65, -0.28, mode === 'flank' ? 1.15 : 0);
    player.userData.dodge = mode === 'dodge';
    player.userData.orbitPlayer = mode === 'flank';
    root.add(player);
    if (mode === 'dodge') {
      const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 3.2, 8), solidMaterial(danger, 0.78));
      beam.rotation.z = Math.PI / 2;
      beam.position.set(0.55, 0.9, 0);
      beam.userData.pulse = true;
      root.add(beam);
    } else {
      const path = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.018, 8, 120), solidMaterial(acid, 0.72));
      path.rotation.x = Math.PI / 2;
      path.position.y = -0.72;
      path.userData.spin = 0.23;
      root.add(path);
    }
  }

  if (mode === 'strike') {
    const player = createHuman(acid, 'strike');
    player.position.x = -0.8;
    root.add(player);
    const target = new THREE.Mesh(new THREE.IcosahedronGeometry(0.82, 2), holoMaterial(magenta));
    target.position.set(1.55, 0.72, 0);
    target.userData.spinY = -0.42;
    root.add(target);
    const slash = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.038, 8, 90, Math.PI * 1.15), solidMaterial(magenta, 0.9));
    slash.position.set(0.22, 1.28, 0);
    slash.rotation.set(0.15, 0.2, -0.6);
    slash.userData.pulse = true;
    root.add(slash);
  }

  return root;
}

export function HoloScene({ mode, interactive = true, className = '' }: HoloSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020407, 0.08);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 1.35, 8.1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setClearColor(0x020407, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0x83efff, 0x030407, 1.15));
    const light = new THREE.PointLight(0x37dcff, 42, 20);
    light.position.set(3, 5, 5);
    scene.add(light);
    const magentaLight = new THREE.PointLight(0xe447ff, 22, 14);
    magentaLight.position.set(-4, 1, 2);
    scene.add(magentaLight);

    const root = buildScene(mode);
    root.position.y = -0.25;
    scene.add(root);

    const grid = new THREE.GridHelper(14, 28, 0x174958, 0x0a2028);
    grid.position.y = -1.12;
    scene.add(grid);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = interactive;
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 5.2;
    controls.maxDistance = 11;
    controls.maxPolarAngle = Math.PI * 0.64;
    controls.target.set(0, 0.75, 0);

    const resize = () => {
      const width = mount.clientWidth || 640;
      const height = mount.clientHeight || 480;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const clock = new THREE.Clock();
    let frame = 0;
    const animate = () => {
      frame = window.requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      if (!interactive) root.rotation.y = Math.sin(elapsed * 0.32) * 0.32;
      root.traverse((object) => {
        if (object.userData.spin) object.rotation.z = elapsed * object.userData.spin;
        if (object.userData.spinY) object.rotation.y = elapsed * object.userData.spinY;
        if (object.userData.pulse) object.scale.setScalar(0.9 + Math.sin(elapsed * 3.3) * 0.1);
        if (object.userData.dodge) object.position.z = Math.sin(elapsed * 1.8) * 0.85;
        if (object.userData.orbitPlayer) {
          object.position.x = Math.cos(elapsed * 0.45) * 2.1;
          object.position.z = Math.sin(elapsed * 0.45) * 2.1;
        }
        const orbit = object.userData.orbit;
        if (orbit) {
          object.position.x = Math.cos(orbit.angle + elapsed * orbit.speed) * orbit.radius;
          object.position.z = Math.sin(orbit.angle + elapsed * orbit.speed) * orbit.radius;
        }
      });
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      controls.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [interactive, mode]);

  return <div ref={mountRef} className={`holo-scene ${className}`} aria-label={`${mode} interactive 3D concept model`} />;
}
