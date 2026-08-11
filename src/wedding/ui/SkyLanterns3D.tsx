import { useEffect, useRef } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "../engine/SceneProvider";

import skyLanternTexture from "/assets/sky-lantern.png";

interface SkyLanterns3DProps {
  count?: number;
  interactive?: boolean;
}

export function SkyLanterns3D({ count = 32, interactive = false }: SkyLanterns3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reduced) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 35);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Ambient & Warm Lighting for Sky
    const ambientLight = new THREE.AmbientLight(0xffd180, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffa000, 2, 80);
    pointLight.position.set(0, 0, 20);
    scene.add(pointLight);

    // 5. Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const lanternTex = textureLoader.load(skyLanternTexture);
    lanternTex.colorSpace = THREE.SRGBColorSpace;

    // 6. Create 3D Lantern Geometry & Materials
    // Cylinder geometry tapered at top & bottom for realistic sky lantern shape
    const lanternGeo = new THREE.CylinderGeometry(0.8, 1.1, 2.2, 16, 1, true);

    // Material with emissive flame glow and warm texture
    const lanternMat = new THREE.MeshStandardMaterial({
      map: lanternTex,
      color: 0xffd180,
      emissive: 0xff6d00,
      emissiveIntensity: 0.85,
      roughness: 0.3,
      metalness: 0.1,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
    });

    // Inner Flame Core Mesh (Glowing Sphere inside lantern)
    const flameGeo = new THREE.SphereGeometry(0.35, 12, 12);
    const flameMat = new THREE.MeshBasicMaterial({
      color: 0xfff59d,
      transparent: true,
      opacity: 0.95,
    });

    // Outer Glow Halo
    const haloGeo = new THREE.SphereGeometry(0.8, 12, 12);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xffab00,
      transparent: true,
      opacity: 0.3,
    });

    // Group to hold all lanterns
    const lanternsGroup = new THREE.Group();
    scene.add(lanternsGroup);

    interface LanternData {
      mesh: THREE.Group;
      speed: number;
      swaySpeed: number;
      swayAmp: number;
      rotSpeed: number;
      phase: number;
      initialX: number;
    }

    const lanternsData: LanternData[] = [];

    // Helper to spawn a 3D lantern
    const spawnLantern = (overrideY?: number) => {
      const group = new THREE.Group();

      // Main lantern mesh
      const mesh = new THREE.Mesh(lanternGeo, lanternMat);
      group.add(mesh);

      // Inner flame core
      const flame = new THREE.Mesh(flameGeo, flameMat);
      flame.position.set(0, -0.4, 0);
      group.add(flame);

      // Halo glow
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.set(0, -0.4, 0);
      group.add(halo);

      // Random scale variation
      const scale = 0.55 + Math.random() * 0.75;
      group.scale.set(scale, scale, scale);

      // Random position spread across 3D view frustum
      const x = (Math.random() - 0.5) * 55;
      const y = overrideY !== undefined ? overrideY : -22 + (Math.random() - 0.5) * 45;
      const z = -15 + Math.random() * 30;

      group.position.set(x, y, z);
      lanternsGroup.add(group);

      lanternsData.push({
        mesh: group,
        speed: 0.03 + Math.random() * 0.045,
        swaySpeed: 0.8 + Math.random() * 1.2,
        swayAmp: 0.4 + Math.random() * 0.8,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        phase: Math.random() * Math.PI * 2,
        initialX: x,
      });
    };

    // Populate initial batch of lanterns
    for (let i = 0; i < count; i++) {
      spawnLantern();
    }

    // 7. Glowing Spark Particles floating with lanterns
    const sparkCount = 120;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPos = new Float32Array(sparkCount * 3);

    for (let i = 0; i < sparkCount; i++) {
      sparkPos[i * 3] = (Math.random() - 0.5) * 60;
      sparkPos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      sparkPos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }

    sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3));

    const sparkMat = new THREE.PointsMaterial({
      color: 0xffc107,
      size: 0.35,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const sparkPoints = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparkPoints);

    // 8. Interactive Click to launch new lantern
    const handleClick = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const clickX = ((e.clientX - rect.left) / container.clientWidth - 0.5) * 50;
      spawnLantern(-22);
      const last = lanternsData[lanternsData.length - 1];
      if (last) {
        last.mesh.position.x = clickX;
      }
    };

    if (interactive) {
      container.addEventListener("click", handleClick);
    }

    // 9. Resize Listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 10. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Update Lanterns Motion
      lanternsData.forEach((item) => {
        item.mesh.position.y += item.speed;
        item.mesh.position.x = item.initialX + Math.sin(elapsedTime * item.swaySpeed + item.phase) * item.swayAmp;
        item.mesh.rotation.y += item.rotSpeed;
        item.mesh.rotation.z = Math.sin(elapsedTime * 1.5 + item.phase) * 0.08;

        // Reset if floating past top bounds
        if (item.mesh.position.y > 28) {
          item.mesh.position.y = -24;
          item.initialX = (Math.random() - 0.5) * 55;
          item.mesh.position.x = item.initialX;
        }
      });

      // Animate Sparks
      const posAttr = sparkGeo.getAttribute("position") as THREE.BufferAttribute | undefined;
      if (posAttr && posAttr.array) {
        const positions = posAttr.array as Float32Array;
        for (let i = 0; i < sparkCount; i++) {
          const idxY = i * 3 + 1;
          const idxX = i * 3;
          if (positions[idxY] !== undefined) {
            positions[idxY] += 0.02;
            if (positions[idxX] !== undefined) {
              positions[idxX] += Math.sin(elapsedTime + i) * 0.01;
            }
            if (positions[idxY] > 26) {
              positions[idxY] = -24;
            }
          }
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        container.removeEventListener("click", handleClick);
      }
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      lanternGeo.dispose();
      lanternMat.dispose();
      flameGeo.dispose();
      flameMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      sparkGeo.dispose();
      sparkMat.dispose();
      renderer.dispose();
    };
  }, [count, interactive, reduced]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
    />
  );
}
