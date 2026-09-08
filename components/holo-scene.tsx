'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export type SceneMode = 'display' | 'sense' | 'identify' | 'generate' | 'track' | 'dodge' | 'flank' | 'strike';

type HoloSceneProps = {
  mode: SceneMode;
  interactive?: boolean;
  className?: string;
};

const cyan = 0x3de6ff;
const blue = 0x3478ff;
const magenta = 0xe447ff;
const acid = 0xdcff4f;
const danger = 0xff3d59;
const amber = 0xffad3d;

function wire(color = cyan, opacity = 0.88) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 1.25,
    transparent: true,
    opacity,
    wireframe: true,
    roughness: 0.2,
    metalness: 0.42,
  });
}

function glow(color = cyan, opacity = 0.22) {
  return new THREE.MeshPhysicalMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.95,
    transparent: true,
    opacity,
    roughness: 0.12,
    metalness: 0.46,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}

function makeLimb(start: THREE.Vector3, end: THREE.Vector3, radius: number, material: THREE.Material) {
  const direction = new THREE.Vector3().subVectors(end, start);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, direction.length(), 12), material);
  mesh.position.copy(start).add(end).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
  return mesh;
}

function addJoint(group: THREE.Group, point: THREE.Vector3, radius: number, material: THREE.Material) {
  const joint = new THREE.Mesh(new THREE.SphereGeometry(radius, 14, 10), material);
  joint.position.copy(point);
  group.add(joint);
  return joint;
}

function lineBetween(start: THREE.Vector3, end: THREE.Vector3, color = cyan, opacity = 0.62) {
  const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
  return new THREE.Line(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
}

function ring(radius: number, color = cyan, opacity = 0.62, tube = 0.014) {
  return new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 8, 100), glow(color, opacity));
}

function makeHuman(color = cyan, pose: 'neutral' | 'dodge' | 'strike' | 'reach' = 'neutral') {
  const group = new THREE.Group();
  const material = wire(color, 0.92);
  const inner = glow(color, 0.1);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.29, 20, 14), material);
  head.scale.set(0.82, 1.08, 0.88);
  head.position.set(0, 2.38, 0);
  group.add(head);
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.38, 0.9, 6, 14), material);
  torso.position.y = 1.34;
  group.add(torso);
  const chestGlow = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 0.82, 6, 14), inner);
  chestGlow.position.y = 1.34;
  group.add(chestGlow);
  const pelvis = new THREE.Mesh(new THREE.SphereGeometry(0.34, 16, 10), material);
  pelvis.scale.set(1.08, 0.68, 0.86);
  pelvis.position.y = 0.6;
  group.add(pelvis);

  const shoulderL = new THREE.Vector3(-0.39, 1.78, 0);
  const shoulderR = new THREE.Vector3(0.39, 1.78, 0);
  let elbowL = new THREE.Vector3(-0.62, 1.04, 0.02);
  let handL = new THREE.Vector3(-0.69, 0.38, 0.04);
  let elbowR = new THREE.Vector3(0.62, 1.04, 0.02);
  let handR = new THREE.Vector3(0.69, 0.38, 0.04);
  if (pose === 'strike') {
    elbowL = new THREE.Vector3(-0.82, 2.18, 0.08);
    handL = new THREE.Vector3(-1.24, 2.03, 0.14);
    elbowR = new THREE.Vector3(0.79, 1.72, 0.18);
    handR = new THREE.Vector3(1.26, 2.05, 0.25);
  }
  if (pose === 'reach') {
    elbowR = new THREE.Vector3(0.7, 1.65, 0.2);
    handR = new THREE.Vector3(1.34, 1.55, 0.34);
  }
  if (pose === 'dodge') {
    elbowL = new THREE.Vector3(-0.77, 1.45, -0.04);
    handL = new THREE.Vector3(-1.02, 0.86, 0.02);
    elbowR = new THREE.Vector3(0.77, 1.45, -0.04);
    handR = new THREE.Vector3(1.02, 0.86, 0.02);
    group.rotation.z = -0.12;
  }
  group.add(
    makeLimb(shoulderL, elbowL, 0.105, material),
    makeLimb(elbowL, handL, 0.08, material),
    makeLimb(shoulderR, elbowR, 0.105, material),
    makeLimb(elbowR, handR, 0.08, material),
  );
  [shoulderL, elbowL, handL, shoulderR, elbowR, handR].forEach((point, index) => addJoint(group, point, index % 3 === 0 ? 0.13 : 0.1, material));

  const hipL = new THREE.Vector3(-0.22, 0.58, 0);
  const hipR = new THREE.Vector3(0.22, 0.58, 0);
  const kneeL = pose === 'dodge' ? new THREE.Vector3(-0.52, -0.25, 0.05) : new THREE.Vector3(-0.25, -0.28, 0.04);
  const kneeR = pose === 'dodge' ? new THREE.Vector3(0.05, -0.28, -0.02) : new THREE.Vector3(0.25, -0.28, -0.02);
  const footL = pose === 'dodge' ? new THREE.Vector3(-0.82, -1.02, 0.08) : new THREE.Vector3(-0.27, -1.08, 0.08);
  const footR = pose === 'dodge' ? new THREE.Vector3(0.2, -1.08, 0.06) : new THREE.Vector3(0.27, -1.08, 0.08);
  group.add(
    makeLimb(hipL, kneeL, 0.135, material), makeLimb(kneeL, footL, 0.105, material),
    makeLimb(hipR, kneeR, 0.135, material), makeLimb(kneeR, footR, 0.105, material),
  );
  [hipL, kneeL, footL, hipR, kneeR, footR].forEach((point) => addJoint(group, point, 0.112, material));

  const spine = lineBetween(new THREE.Vector3(0, 0.72, 0.34), new THREE.Vector3(0, 2.05, 0.34), color, 0.7);
  group.add(spine);
  return group;
}

function makeCamera(color = blue) {
  const camera = new THREE.Group();
  const shell = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.52, 0.58), wire(color, 0.9));
  const inner = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.42, 0.48), glow(color, 0.16));
  const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.22, 22), glow(cyan, 0.82));
  lens.rotation.x = Math.PI / 2;
  lens.position.z = 0.38;
  const lensRing = ring(0.24, cyan, 0.82, 0.016);
  lensRing.position.z = 0.5;
  camera.add(shell, inner, lens, lensRing);
  return camera;
}

function makeHoloCreature(color = cyan) {
  const creature = new THREE.Group();
  const material = wire(color, 0.9);
  const head = new THREE.Mesh(new THREE.IcosahedronGeometry(0.66, 2), material);
  head.position.y = 1.05;
  creature.add(head);
  const muzzle = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 10), glow(color, 0.14));
  muzzle.scale.set(1, 0.7, 0.7);
  muzzle.position.set(0, 0.86, 0.55);
  creature.add(muzzle);
  [-1, 1].forEach((side) => {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.72, 8), material);
    ear.position.set(side * 0.42, 1.72, 0);
    ear.rotation.z = side * -0.18;
    creature.add(ear);
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.065, 12, 8), glow(acid, 0.95));
    eye.position.set(side * 0.23, 1.12, 0.58);
    creature.add(eye);
  });
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.72, 20, 14), material);
  body.scale.set(0.82, 1.02, 0.72);
  body.position.y = -0.05;
  creature.add(body);
  [-1, 1].forEach((side) => {
    creature.add(makeLimb(new THREE.Vector3(side * 0.35, 0.1, 0), new THREE.Vector3(side * 0.42, -0.83, 0.16), 0.13, material));
  });
  const tailCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.52, 0.1, -0.2), new THREE.Vector3(-1.05, 0.45, -0.15), new THREE.Vector3(-1.22, 1.0, 0.15),
  ]);
  const tail = new THREE.Mesh(new THREE.TubeGeometry(tailCurve, 40, 0.055, 8, false), material);
  creature.add(tail);
  return creature;
}

function makeBoss() {
  const boss = new THREE.Group();
  const armor = wire(danger, 0.86);
  const darkArmor = wire(amber, 0.55);
  const torso = new THREE.Mesh(new THREE.DodecahedronGeometry(1.02, 1), armor);
  torso.scale.set(1.18, 1.18, 0.9);
  torso.position.y = 0.58;
  boss.add(torso);
  const chest = new THREE.Mesh(new THREE.OctahedronGeometry(0.48, 1), glow(danger, 0.3));
  chest.position.set(0, 0.78, 0.82);
  boss.add(chest);
  const head = new THREE.Mesh(new THREE.DodecahedronGeometry(0.52, 1), armor);
  head.position.set(0, 1.88, 0.06);
  boss.add(head);
  [-1, 1].forEach((side) => {
    const horn = new THREE.Mesh(new THREE.ConeGeometry(0.17, 1.02, 9), darkArmor);
    horn.position.set(side * 0.42, 2.45, -0.02);
    horn.rotation.z = side * -0.48;
    boss.add(horn);
    boss.add(makeLimb(new THREE.Vector3(side * 0.82, 1.2, 0), new THREE.Vector3(side * 1.55, 0.35, 0.15), 0.22, armor));
    const claw = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.6, 7), darkArmor);
    claw.position.set(side * 1.66, 0.12, 0.17);
    claw.rotation.z = side * -0.2;
    boss.add(claw);
  });
  [-0.5, 0, 0.5].forEach((x) => {
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.72, 7), darkArmor);
    spike.position.set(x, 1.25, -0.72);
    spike.rotation.x = -0.65;
    boss.add(spike);
  });
  const weakPoint = new THREE.Mesh(new THREE.SphereGeometry(0.22, 22, 14), glow(acid, 0.96));
  weakPoint.position.set(0, 0.78, -0.92);
  weakPoint.userData.pulse = { base: 1, amplitude: 0.24, speed: 4.6 };
  boss.add(weakPoint);
  boss.userData.weakPoint = weakPoint;
  return boss;
}

function addPlatform(root: THREE.Group, radius = 2.1) {
  [radius * 0.56, radius * 0.78, radius].forEach((value, index) => {
    const platformRing = ring(value, index === 2 ? magenta : cyan, 0.38 - index * 0.06);
    platformRing.rotation.x = Math.PI / 2;
    platformRing.position.y = -1.1;
    platformRing.userData.spinZ = (index % 2 ? -1 : 1) * (0.08 + index * 0.04);
    root.add(platformRing);
  });
}

function addDetectionRays(root: THREE.Group, from: THREE.Vector3, human: THREE.Group) {
  const points = [
    new THREE.Vector3(human.position.x, human.position.y + 2.38, human.position.z),
    new THREE.Vector3(human.position.x - 0.65, human.position.y + 0.45, human.position.z),
    new THREE.Vector3(human.position.x + 0.65, human.position.y + 0.45, human.position.z),
    new THREE.Vector3(human.position.x, human.position.y - 0.92, human.position.z),
  ];
  points.forEach((point, index) => {
    const ray = lineBetween(from, point, index === 0 ? acid : cyan, index === 0 ? 0.82 : 0.42);
    ray.userData.flicker = index * 0.35;
    root.add(ray);
  });
}

function makeViewMarker(color = acid) {
  const marker = new THREE.Group();
  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 10), glow(color, 0.95));
  const bracket = ring(0.28, color, 0.78, 0.014);
  marker.add(eye, bracket);
  return marker;
}

function makeRetailProduct(kind: 'can' | 'burger', color: number) {
  const product = new THREE.Group();
  const productMaterial = wire(color, 0.9);

  if (kind === 'can') {
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 1.05, 24), productMaterial);
    const top = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.035, 24), glow(0xd8f5ff, 0.82));
    top.position.y = 0.54;
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.325, 0.025, 8, 36), glow(acid, 0.8));
    band.rotation.x = Math.PI / 2;
    product.add(body, top, band);
  } else {
    const bunTop = new THREE.Mesh(new THREE.SphereGeometry(0.48, 22, 12, 0, Math.PI * 2, 0, Math.PI / 2), productMaterial);
    bunTop.position.y = 0.28;
    const patty = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.2, 24), wire(danger, 0.82));
    const filling = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.08, 24), glow(acid, 0.8));
    filling.position.y = -0.17;
    const bunBottom = new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.43, 0.2, 24), productMaterial);
    bunBottom.position.y = -0.34;
    product.add(bunTop, patty, filling, bunBottom);
  }

  const orbit = ring(kind === 'can' ? 0.58 : 0.72, color, 0.62, 0.012);
  orbit.rotation.x = Math.PI / 2;
  orbit.position.y = -0.68;
  orbit.userData.spinZ = kind === 'can' ? 0.35 : -0.28;
  product.add(orbit);
  product.userData.bob = { base: 0.25, amplitude: 0.1, speed: kind === 'can' ? 1.35 : 1.1 };
  product.userData.spinY = kind === 'can' ? 0.34 : -0.25;
  return product;
}

function buildScene(mode: SceneMode) {
  const root = new THREE.Group();

  if (mode === 'display') {
    const metal = new THREE.MeshStandardMaterial({ color: 0x30404a, metalness: 0.92, roughness: 0.18 });
    const glass = new THREE.MeshPhysicalMaterial({
      color: 0x4de6ff,
      transparent: true,
      opacity: 0.1,
      transmission: 0.78,
      roughness: 0.06,
      metalness: 0.08,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    [-2.55, 0, 2.55].forEach((x, index) => {
      const column = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.36, 4.15, 28), metal);
      column.position.set(x, 0.74, 0);
      root.add(column);
      const lightBand = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.055, 10, 48), glow(index === 1 ? magenta : cyan, 0.94));
      lightBand.rotation.x = Math.PI / 2;
      lightBand.position.set(x, 2.48, 0);
      lightBand.userData.pulse = { base: 1, amplitude: 0.06, speed: 2.8, phase: index * 0.7 };
      root.add(lightBand);
    });

    [-1.28, 1.28].forEach((x, index) => {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(2.16, 3.18, 0.08), glass);
      panel.position.set(x, 0.7, 0);
      root.add(panel);
      const edge = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(2.16, 3.18, 0.08)),
        new THREE.LineBasicMaterial({ color: index ? magenta : cyan, transparent: true, opacity: 0.66 }),
      );
      edge.position.copy(panel.position);
      root.add(edge);
    });

    const can = makeRetailProduct('can', cyan);
    can.position.set(-1.28, 0.25, 0.34);
    root.add(can);
    const burger = makeRetailProduct('burger', magenta);
    burger.position.set(1.28, 0.25, 0.34);
    root.add(burger);

    for (let i = 0; i < 28; i += 1) {
      const particle = new THREE.Mesh(new THREE.SphereGeometry(0.025 + (i % 3) * 0.009, 7, 5), glow(i % 2 ? cyan : magenta, 0.78));
      const side = i % 2 ? -1 : 1;
      particle.position.set(side * (0.78 + (i % 6) * 0.16), -0.55 + (i % 8) * 0.25, 0.28 + (i % 3) * 0.12);
      particle.userData.floatY = { base: particle.position.y, amplitude: 0.14, speed: 0.8 + (i % 5) * 0.16, phase: i * 0.42 };
      root.add(particle);
    }

    const floorGlow = new THREE.Mesh(new THREE.PlaneGeometry(5.7, 1.65), glow(cyan, 0.06));
    floorGlow.rotation.x = -Math.PI / 2;
    floorGlow.position.set(0, -1.32, 0.1);
    root.add(floorGlow);
  }

  if (mode === 'sense') {
    addPlatform(root, 1.75);
    const human = makeHuman(cyan);
    human.position.set(0.78, 0, 0);
    root.add(human);
    const cameraMain = makeCamera();
    cameraMain.position.set(-2.15, 0.7, 0.25);
    cameraMain.rotation.y = Math.PI / 2;
    root.add(cameraMain);
    const cameraHigh = makeCamera(magenta);
    cameraHigh.scale.setScalar(0.58);
    cameraHigh.position.set(0.1, 2.8, -1.55);
    cameraHigh.rotation.set(0.55, 0, 0);
    root.add(cameraHigh);
    addDetectionRays(root, new THREE.Vector3(-1.78, 0.7, 0.25), human);
    const volume = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 3.9, 32, 1, true), glow(cyan, 0.055));
    volume.position.set(0.78, 0.85, 0);
    root.add(volume);
    const scanner = ring(0.82, acid, 0.95, 0.02);
    scanner.rotation.x = Math.PI / 2;
    scanner.position.set(0.78, 2.82, 0);
    scanner.userData.scanY = { min: -0.98, max: 2.82, speed: 0.75 };
    root.add(scanner);
  }

  if (mode === 'identify') {
    addPlatform(root, 1.75);
    const human = makeHuman(cyan);
    root.add(human);
    const box = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(1.7, 3.9, 1.15)),
      new THREE.LineBasicMaterial({ color: blue, transparent: true, opacity: 0.42 }),
    );
    box.position.y = 0.82;
    root.add(box);
    [0.46, 0.68, 0.92].forEach((value, index) => {
      const lock = ring(value, index === 1 ? magenta : cyan, 0.74, 0.012);
      lock.position.set(0, 2.35, 0.38);
      lock.userData.spinZ = (index % 2 ? -1 : 1) * (0.3 + index * 0.1);
      root.add(lock);
    });
    const nodes = [
      [-0.39, 1.78], [0.39, 1.78], [-0.65, 0.4], [0.65, 0.4], [-0.25, -0.28], [0.25, -0.28],
    ];
    nodes.forEach(([x, y], index) => {
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 8), glow(acid, 0.92));
      node.position.set(x, y, 0.48);
      node.userData.pulse = { base: 1, amplitude: 0.28, speed: 3.4, phase: index * 0.3 };
      root.add(node);
    });
  }

  if (mode === 'generate') {
    addPlatform(root, 2.35);
    const flat = new THREE.Group();
    const plate = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.5), glow(blue, 0.15));
    const border = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(1.5, 1.5)), new THREE.LineBasicMaterial({ color: blue, transparent: true, opacity: 0.8 }));
    border.position.z = 0.02;
    flat.add(plate, border);
    const flatHead = new THREE.Mesh(new THREE.CircleGeometry(0.4, 28), glow(magenta, 0.42));
    flatHead.position.z = 0.04;
    flat.add(flatHead);
    [-1, 1].forEach((side) => {
      const ear = new THREE.Mesh(new THREE.CircleGeometry(0.17, 3), glow(cyan, 0.65));
      ear.position.set(side * 0.3, 0.42, 0.05);
      flat.add(ear);
    });
    flat.position.set(-2.05, 0.72, 0);
    root.add(flat);

    const creature = makeHoloCreature(cyan);
    creature.position.set(1.72, 0.1, 0);
    creature.userData.bob = { base: 0.1, amplitude: 0.08, speed: 1.4 };
    root.add(creature);
    for (let i = 0; i < 18; i += 1) {
      const particle = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), glow(i % 3 ? cyan : magenta, 0.82));
      particle.userData.travel = { from: -1.25, to: 0.92, speed: 0.22, phase: i / 18 };
      particle.position.set(-1.25, 0.25 + (i % 6) * 0.18, (i % 3 - 1) * 0.18);
      root.add(particle);
    }
    const viewOrbit = ring(1.3, acid, 0.55, 0.014);
    viewOrbit.rotation.x = Math.PI / 2;
    viewOrbit.position.set(1.72, 0.5, 0);
    viewOrbit.userData.spinZ = 0.26;
    root.add(viewOrbit);
  }

  if (mode === 'track') {
    addPlatform(root, 2.25);
    const creature = makeHoloCreature(cyan);
    creature.position.set(0, 0.05, 0);
    creature.userData.faceViewer = true;
    root.add(creature);
    const orbitPath = ring(2.55, acid, 0.62, 0.015);
    orbitPath.rotation.x = Math.PI / 2;
    orbitPath.position.y = -0.95;
    root.add(orbitPath);
    const player = makeHuman(acid);
    player.scale.setScalar(0.62);
    player.userData.orbit = { radius: 2.45, speed: 0.28, phase: 0, y: -0.34 };
    root.add(player);
    const viewMarker = makeViewMarker(acid);
    viewMarker.userData.orbit = { radius: 2.45, speed: 0.28, phase: 0, y: 1.28 };
    root.add(viewMarker);
    const cameraOne = makeCamera(blue);
    cameraOne.scale.setScalar(0.42);
    cameraOne.position.set(-2.65, 1.2, -1.4);
    cameraOne.rotation.y = 1.1;
    root.add(cameraOne);
    const cameraTwo = makeCamera(magenta);
    cameraTwo.scale.setScalar(0.42);
    cameraTwo.position.set(2.65, 1.2, -1.4);
    cameraTwo.rotation.y = -1.1;
    root.add(cameraTwo);
  }

  if (mode === 'dodge') {
    addPlatform(root, 2.5);
    const boss = makeBoss();
    boss.scale.setScalar(0.78);
    boss.position.set(-1.28, -0.02, 0);
    root.add(boss);
    const player = makeHuman(acid, 'dodge');
    player.scale.setScalar(0.62);
    player.position.set(1.6, -0.35, 0);
    player.userData.dodge = { baseZ: 0, distance: 1.15, speed: 0.9 };
    root.add(player);
    const dangerLane = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.025, 1.1), glow(danger, 0.22));
    dangerLane.position.set(0.55, -1.02, 0);
    dangerLane.userData.warning = true;
    root.add(dangerLane);
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 3.25, 10), glow(danger, 0.92));
    beam.rotation.z = Math.PI / 2;
    beam.position.set(0.45, 0.66, 0);
    beam.userData.pulse = { base: 1, amplitude: 0.14, speed: 4.5 };
    root.add(beam);
    const warning = ring(0.48, danger, 0.95, 0.022);
    warning.position.set(1.62, 1.66, 0.35);
    warning.userData.pulse = { base: 1, amplitude: 0.35, speed: 3.8 };
    root.add(warning);
  }

  if (mode === 'flank') {
    addPlatform(root, 2.45);
    const boss = makeBoss();
    boss.position.y = -0.02;
    boss.rotation.y = Math.PI;
    boss.userData.turn = { base: Math.PI, amplitude: 0.5, speed: 0.45 };
    root.add(boss);
    const player = makeHuman(acid);
    player.scale.setScalar(0.6);
    player.userData.orbit = { radius: 2.42, speed: 0.34, phase: 0.25, y: -0.36 };
    root.add(player);
    const path = ring(2.42, acid, 0.7, 0.018);
    path.rotation.x = Math.PI / 2;
    path.position.y = -1.02;
    root.add(path);
    const weak = boss.userData.weakPoint as THREE.Mesh;
    const lock = ring(0.43, acid, 0.94, 0.018);
    lock.position.set(0, 0.78, 0.95);
    lock.userData.spinZ = 0.75;
    lock.userData.pulse = { base: 1, amplitude: 0.12, speed: 4.4 };
    root.add(lock);
    weak.visible = true;
  }

  if (mode === 'strike') {
    addPlatform(root, 2.45);
    const cameraDevice = makeCamera(blue);
    cameraDevice.scale.setScalar(0.52);
    cameraDevice.position.set(-2.5, 0.75, 0.1);
    cameraDevice.rotation.y = Math.PI / 2;
    root.add(cameraDevice);
    const player = makeHuman(acid, 'strike');
    player.scale.setScalar(0.72);
    player.position.set(-0.78, -0.24, 0);
    root.add(player);
    const target = makeBoss();
    target.scale.setScalar(0.58);
    target.position.set(2.05, -0.3, 0);
    root.add(target);
    const gesturePath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.66, 1.18, 0.18), new THREE.Vector3(-0.85, 2.15, 0.3), new THREE.Vector3(0.1, 1.66, 0.22),
    ]);
    const slash = new THREE.Mesh(new THREE.TubeGeometry(gesturePath, 50, 0.035, 8, false), glow(magenta, 0.92));
    slash.userData.pulse = { base: 1, amplitude: 0.18, speed: 5.2 };
    root.add(slash);
    const projectile = new THREE.Mesh(new THREE.IcosahedronGeometry(0.15, 1), glow(acid, 0.98));
    projectile.userData.projectile = { from: 0.08, to: 1.7, speed: 0.72 };
    projectile.position.set(0.08, 1.32, 0.2);
    root.add(projectile);
    [0.34, 0.58, 0.82].forEach((value, index) => {
      const impact = ring(value, index === 1 ? magenta : acid, 0.68, 0.015);
      impact.position.set(1.72, 0.72, 0.72);
      impact.userData.impact = { phase: index * 0.16 };
      root.add(impact);
    });
  }

  return root;
}

export function HoloScene({ mode, interactive = true, className = '' }: HoloSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020407, 0.075);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 1.45, mode === 'generate' || mode === 'display' ? 9.5 : 8.7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x020407, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0x8befff, 0x020306, 1.3));
    const cyanLight = new THREE.PointLight(cyan, 52, 22);
    cyanLight.position.set(3.5, 4.8, 5.5);
    scene.add(cyanLight);
    const magentaLight = new THREE.PointLight(magenta, 28, 16);
    magentaLight.position.set(-4.5, 2, 3);
    scene.add(magentaLight);
    const acidLight = new THREE.PointLight(acid, 18, 12);
    acidLight.position.set(1, 0, -4);
    scene.add(acidLight);

    const root = buildScene(mode);
    root.position.y = -0.18;
    scene.add(root);
    const floor = new THREE.GridHelper(14, 36, 0x1a5c6d, 0x0a2730);
    floor.position.y = -1.3;
    scene.add(floor);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = interactive;
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 5.4;
    controls.maxDistance = 11.5;
    controls.maxPolarAngle = Math.PI * 0.68;
    controls.target.set(0, 0.65, 0);

    const resize = () => {
      const width = mount.clientWidth || 640;
      const height = mount.clientHeight || 480;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    const clock = new THREE.Clock();
    let frame = 0;
    const animate = () => {
      frame = window.requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      if (!interactive) root.rotation.y = Math.sin(elapsed * 0.28) * 0.2;
      root.traverse((object) => {
        if (object.userData.spinZ) object.rotation.z = elapsed * object.userData.spinZ;
        if (object.userData.spinY) object.rotation.y = elapsed * object.userData.spinY;
        if (object.userData.pulse) {
          const pulse = object.userData.pulse;
          const value = pulse.base + Math.sin(elapsed * pulse.speed + (pulse.phase || 0)) * pulse.amplitude;
          object.scale.setScalar(value);
        }
        if (object.userData.scanY) {
          const scan = object.userData.scanY;
          const unit = (Math.sin(elapsed * scan.speed * Math.PI * 2) + 1) / 2;
          object.position.y = THREE.MathUtils.lerp(scan.min, scan.max, unit);
        }
        if (object.userData.flicker !== undefined && object instanceof THREE.Line) {
          (object.material as THREE.LineBasicMaterial).opacity = 0.28 + Math.sin(elapsed * 3.4 + object.userData.flicker) * 0.17;
        }
        if (object.userData.travel) {
          const travel = object.userData.travel;
          const unit = (elapsed * travel.speed + travel.phase) % 1;
          object.position.x = THREE.MathUtils.lerp(travel.from, travel.to, unit);
        }
        if (object.userData.orbit) {
          const orbit = object.userData.orbit;
          const angle = elapsed * orbit.speed + orbit.phase * Math.PI * 2;
          object.position.set(Math.cos(angle) * orbit.radius, orbit.y, Math.sin(angle) * orbit.radius);
          object.rotation.y = -angle + Math.PI / 2;
        }
        if (object.userData.dodge) {
          const dodge = object.userData.dodge;
          const unit = (Math.sin(elapsed * dodge.speed * Math.PI * 2 - 1.2) + 1) / 2;
          const eased = unit * unit * (3 - 2 * unit);
          object.position.z = dodge.baseZ + eased * dodge.distance;
        }
        if (object.userData.warning && object instanceof THREE.Mesh) {
          (object.material as THREE.MeshPhysicalMaterial).opacity = 0.1 + (Math.sin(elapsed * 5) + 1) * 0.09;
        }
        if (object.userData.turn) {
          const turn = object.userData.turn;
          object.rotation.y = turn.base + Math.sin(elapsed * turn.speed) * turn.amplitude;
        }
        if (object.userData.bob) {
          const bob = object.userData.bob;
          object.position.y = bob.base + Math.sin(elapsed * bob.speed) * bob.amplitude;
        }
        if (object.userData.floatY) {
          const floating = object.userData.floatY;
          object.position.y = floating.base + Math.sin(elapsed * floating.speed + floating.phase) * floating.amplitude;
        }
        if (object.userData.faceViewer) object.rotation.y = Math.sin(elapsed * 0.7) * 0.22;
        if (object.userData.projectile) {
          const travel = object.userData.projectile;
          const unit = (elapsed * travel.speed) % 1;
          object.position.x = THREE.MathUtils.lerp(travel.from, travel.to, unit);
          object.position.y = 1.32 - Math.sin(unit * Math.PI) * 0.2;
          object.scale.setScalar(0.7 + Math.sin(unit * Math.PI) * 0.7);
        }
        if (object.userData.impact && object instanceof THREE.Mesh) {
          const unit = (elapsed * 0.72 + object.userData.impact.phase) % 1;
          object.scale.setScalar(0.3 + unit * 1.55);
          (object.material as THREE.MeshPhysicalMaterial).opacity = (1 - unit) * 0.72;
        }
      });
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.LineSegments) {
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
