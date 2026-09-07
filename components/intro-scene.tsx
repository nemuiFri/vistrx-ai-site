'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const cyan = 0x3de6ff;
const blue = 0x3478ff;
const acid = 0xdcff4f;

function wire(color = cyan, opacity = 0.88) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 1.35,
    transparent: true,
    opacity,
    wireframe: true,
    roughness: 0.2,
    metalness: 0.45,
  });
}

function glass(color = cyan, opacity = 0.16) {
  return new THREE.MeshPhysicalMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.9,
    transparent: true,
    opacity,
    roughness: 0.12,
    metalness: 0.35,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}

function makeLimb(radius: number, material: THREE.Material) {
  return new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, 1, 12), material);
}

function placeLimb(mesh: THREE.Mesh, start: THREE.Vector3, end: THREE.Vector3) {
  const direction = new THREE.Vector3().subVectors(end, start);
  mesh.position.copy(start).add(end).multiplyScalar(0.5);
  mesh.scale.set(1, direction.length(), 1);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
}

function addJoint(group: THREE.Group, point: THREE.Vector3, radius: number, material: THREE.Material) {
  const joint = new THREE.Mesh(new THREE.SphereGeometry(radius, 14, 10), material);
  joint.position.copy(point);
  group.add(joint);
  return joint;
}

function createIntroHuman() {
  const group = new THREE.Group();
  const material = wire(cyan, 0.92);
  const soft = glass(cyan, 0.13);

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.38, 0.92, 7, 14), material);
  torso.position.y = 1.35;
  group.add(torso);
  const torsoGlow = new THREE.Mesh(new THREE.CapsuleGeometry(0.34, 0.86, 7, 14), soft);
  torsoGlow.position.y = 1.35;
  group.add(torsoGlow);
  const pelvis = new THREE.Mesh(new THREE.SphereGeometry(0.34, 16, 10), material);
  pelvis.scale.set(1.1, 0.72, 0.82);
  pelvis.position.y = 0.63;
  group.add(pelvis);
  const neck = makeLimb(0.1, material);
  placeLimb(neck, new THREE.Vector3(0, 1.92, 0), new THREE.Vector3(0, 2.16, 0));
  group.add(neck);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.29, 22, 16), material);
  head.scale.set(0.82, 1.08, 0.88);
  head.position.y = 2.43;
  group.add(head);

  const shoulderLeft = new THREE.Vector3(0.39, 1.78, 0);
  const elbowLeft = new THREE.Vector3(0.61, 1.05, 0.02);
  const handLeft = new THREE.Vector3(0.67, 0.38, 0.04);
  const armLeftA = makeLimb(0.105, material);
  const armLeftB = makeLimb(0.082, material);
  placeLimb(armLeftA, shoulderLeft, elbowLeft);
  placeLimb(armLeftB, elbowLeft, handLeft);
  group.add(armLeftA, armLeftB);
  [shoulderLeft, elbowLeft, handLeft].forEach((point, index) => addJoint(group, point, index === 0 ? 0.13 : 0.1, material));

  const shoulderRight = new THREE.Vector3(-0.39, 1.78, 0);
  const upperRight = makeLimb(0.105, material);
  const lowerRight = makeLimb(0.082, material);
  const indexFinger = makeLimb(0.035, material);
  const elbowJoint = addJoint(group, new THREE.Vector3(), 0.1, material);
  const handJoint = addJoint(group, new THREE.Vector3(), 0.105, material);
  const fingerTip = addJoint(group, new THREE.Vector3(), 0.045, glass(acid, 0.95));
  addJoint(group, shoulderRight, 0.13, material);
  group.add(upperRight, lowerRight, indexFinger);

  const hips = [new THREE.Vector3(-0.22, 0.57, 0), new THREE.Vector3(0.22, 0.57, 0)];
  hips.forEach((hip, index) => {
    const side = index === 0 ? -1 : 1;
    const knee = new THREE.Vector3(side * 0.25, -0.28, 0.03);
    const ankle = new THREE.Vector3(side * 0.27, -1.12, 0.07);
    const thigh = makeLimb(0.135, material);
    const shin = makeLimb(0.105, material);
    placeLimb(thigh, hip, knee);
    placeLimb(shin, knee, ankle);
    group.add(thigh, shin);
    [hip, knee, ankle].forEach((point) => addJoint(group, point, 0.115, material));
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.12, 0.42), material);
    foot.position.set(ankle.x, -1.18, 0.17);
    group.add(foot);
  });

  return {
    group,
    updateArm(progress: number) {
      const neutralElbow = new THREE.Vector3(-0.61, 1.05, 0.02);
      const neutralHand = new THREE.Vector3(-0.67, 0.38, 0.04);
      const neutralFinger = new THREE.Vector3(-0.73, 0.18, 0.05);
      const touchElbow = new THREE.Vector3(-0.67, 1.58, 0.24);
      const touchHand = new THREE.Vector3(-1.08, 1.45, 0.34);
      const touchFinger = new THREE.Vector3(-1.37, 1.45, 0.36);
      const elbow = neutralElbow.lerp(touchElbow, progress);
      const hand = neutralHand.lerp(touchHand, progress);
      const finger = neutralFinger.lerp(touchFinger, progress);
      placeLimb(upperRight, shoulderRight, elbow);
      placeLimb(lowerRight, elbow, hand);
      placeLimb(indexFinger, hand, finger);
      elbowJoint.position.copy(elbow);
      handJoint.position.copy(hand);
      fingerTip.position.copy(finger);
    },
  };
}

function addScreenLine(group: THREE.Group, x: number, y: number, width: number, color = cyan) {
  const line = new THREE.Mesh(new THREE.BoxGeometry(width, 0.018, 0.018), glass(color, 0.8));
  line.position.set(x, y, 0.04);
  group.add(line);
}

function createHolographicScreen() {
  const group = new THREE.Group();
  group.position.set(-1.33, 1.38, 0.12);
  group.rotation.y = -0.1;
  const panelMaterial = glass(blue, 0.18);
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(2.05, 1.52), panelMaterial);
  group.add(panel);
  const border = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.PlaneGeometry(2.05, 1.52)),
    new THREE.LineBasicMaterial({ color: cyan, transparent: true, opacity: 0.9 }),
  );
  border.position.z = 0.03;
  group.add(border);
  addScreenLine(group, -0.38, 0.45, 0.82);
  addScreenLine(group, -0.5, 0.27, 0.58, blue);
  addScreenLine(group, -0.45, -0.38, 0.68);
  addScreenLine(group, 0.44, -0.28, 0.5, acid);
  const node = new THREE.Mesh(new THREE.IcosahedronGeometry(0.24, 1), wire(cyan, 0.9));
  node.position.set(0.48, 0.28, 0.12);
  node.userData.spinY = 0.9;
  group.add(node);
  const target = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.014, 8, 56), glass(acid, 0.95));
  target.position.set(1.01, 0.07, 0.09);
  group.add(target);
  return { group, panelMaterial, target };
}

function smoothStep(from: number, to: number, value: number) {
  const t = THREE.MathUtils.clamp((value - from) / (to - from), 0, 1);
  return t * t * (3 - 2 * t);
}

export function IntroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x010305, 0.085);
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 1.05, 8.8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setClearColor(0x010305, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0x8befff, 0x010204, 1.2));
    const cyanLight = new THREE.PointLight(cyan, 48, 18);
    cyanLight.position.set(2.5, 4.5, 4.5);
    scene.add(cyanLight);
    const blueLight = new THREE.PointLight(blue, 28, 15);
    blueLight.position.set(-3.5, 2, 3);
    scene.add(blueLight);

    const human = createIntroHuman();
    human.group.position.set(1.05, 0.06, 0);
    scene.add(human.group);
    const screen = createHolographicScreen();
    screen.group.scale.setScalar(0.82);
    scene.add(screen.group);

    const scanRing = new THREE.Mesh(new THREE.TorusGeometry(0.82, 0.018, 8, 90), glass(cyan, 0.98));
    scanRing.rotation.x = Math.PI / 2;
    scanRing.position.set(1.05, 2.9, 0);
    scene.add(scanRing);
    const scanPlane = new THREE.Mesh(new THREE.CylinderGeometry(0.83, 0.83, 0.035, 48), glass(cyan, 0.24));
    scanPlane.position.set(1.05, 2.9, 0);
    scene.add(scanPlane);

    const floor = new THREE.GridHelper(14, 36, 0x176378, 0x0b2832);
    floor.position.y = -1.13;
    scene.add(floor);
    const baseRing = new THREE.Mesh(new THREE.TorusGeometry(1.02, 0.018, 8, 100), glass(cyan, 0.72));
    baseRing.rotation.x = Math.PI / 2;
    baseRing.position.set(1.05, -1.1, 0);
    scene.add(baseRing);

    const touchWave = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.015, 8, 64), glass(acid, 0.95));
    touchWave.position.set(-0.32, 1.45, 0.38);
    touchWave.visible = false;
    scene.add(touchWave);

    const resize = () => {
      const width = mount.clientWidth || 1000;
      const height = mount.clientHeight || 700;
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
      const armProgress = smoothStep(1.0, 2.05, elapsed);
      human.updateArm(armProgress);
      human.group.rotation.y = Math.sin(elapsed * 0.8) * 0.025;

      const scanProgress = smoothStep(0.08, 0.96, elapsed);
      const scanY = THREE.MathUtils.lerp(2.9, -1.02, scanProgress);
      scanRing.position.y = scanY;
      scanPlane.position.y = scanY;
      const scanVisible = elapsed < 1.08 ? 1 : 0;
      (scanRing.material as THREE.Material & { opacity: number }).opacity = scanVisible * 0.95;
      (scanPlane.material as THREE.Material & { opacity: number }).opacity = scanVisible * 0.24;

      const panelOpacity = smoothStep(0.72, 1.35, elapsed);
      screen.group.scale.setScalar(0.82 + panelOpacity * 0.18);
      screen.group.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => {
            if ('opacity' in material) {
              if (material.userData.baseOpacity === undefined) material.userData.baseOpacity = material.opacity;
              material.opacity = material.userData.baseOpacity * panelOpacity;
            }
          });
        }
        if (object.userData.spinY) object.rotation.y = elapsed * object.userData.spinY;
      });

      const touching = elapsed > 2.05;
      touchWave.visible = touching;
      if (touching) {
        const pulse = (elapsed - 2.05) % 0.62;
        touchWave.scale.setScalar(1 + pulse * 5.2);
        (touchWave.material as THREE.Material & { opacity: number }).opacity = 1 - pulse / 0.62;
        screen.target.scale.setScalar(1 + Math.sin(elapsed * 15) * 0.22);
      }

      baseRing.rotation.z = elapsed * 0.35;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments) {
          if ('geometry' in object) object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="intro-three-scene" aria-hidden="true" />;
}
