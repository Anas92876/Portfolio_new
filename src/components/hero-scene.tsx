"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/lib/hooks";

const ACCENT = "#238c41";
const ACCENT_LIGHT = "#7fd99a";

/** Reads page scroll (0 → 1 over the first viewport) without re-rendering. */
function scrollProgress() {
  return Math.min(window.scrollY / window.innerHeight, 1);
}

function Blob({ dark }: { dark: boolean }) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = scrollProgress();
    // Follow the pointer, spin with scroll, and drift away as the hero leaves.
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.6 + p * Math.PI, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.4 + p * 0.8, 3, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, p * 1.6, 4, delta);
    const s = THREE.MathUtils.damp(g.scale.x, 1 - p * 0.35, 4, delta);
    g.scale.setScalar(s);
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.15;
      shell.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh>
          <icosahedronGeometry args={[1.35, 64]} />
          <MeshDistortMaterial
            color={dark ? "#14241a" : "#cfe6d6"}
            roughness={0.12}
            metalness={dark ? 0.9 : 0.4}
            clearcoat={1}
            clearcoatRoughness={0.1}
            distort={0.38}
            speed={1.8}
          />
        </mesh>
        <mesh ref={shell} scale={SHELL_RADIUS}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial
            color={dark ? ACCENT_LIGHT : ACCENT}
            wireframe
            transparent
            opacity={dark ? 0.12 : 0.16}
          />
        </mesh>
      </Float>
    </group>
  );
}

/** Outer radius of the wireframe shell, the widest part of the blob. */
const SHELL_RADIUS = 1.9;

/**
 * Fits the scene to the canvas. In landscape the blob keeps its designed size;
 * in portrait (phones, tablets) it shrinks to fit the width and tucks into the
 * upper-right so it frames the headline instead of being cropped behind it.
 */
function ResponsiveRig({ children }: { children: React.ReactNode }) {
  const { viewport, size } = useThree();
  // The desktop canvas is roughly square, so only treat clearly tall canvases as portrait.
  const portrait = size.width / size.height < 0.8;
  const diameter = SHELL_RADIUS * 2;
  const fit = portrait
    ? Math.min((viewport.width * 0.8) / diameter, (viewport.height * 0.45) / diameter)
    : (viewport.width * 0.9) / diameter;
  const x = portrait ? viewport.width * 0.22 : 0;
  const y = portrait ? viewport.height * 0.22 : 0;
  return (
    <group position={[x, y, 0]} scale={Math.min(1, fit)}>
      {children}
    </group>
  );
}

function Particles({ color }: { color: string }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 600;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Deterministic pseudo-random distribution on a thick spherical shell.
      const r = 2.6 + ((i * 7919) % 100) / 60;
      const theta = i * 2.39996;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x = scrollProgress() * 0.6;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color={color} transparent opacity={0.4} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function HeroScene({ frameloop }: { frameloop: "always" | "demand" | "never" }) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const accent = ACCENT;

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      dpr={[1, 1.5]}
      // Measure layout size, not the transformed box: the hero scales this in from 0.85.
      resize={{ offsetSize: true }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={frameloop}
      // The canvas sits behind the text, so track the pointer across the whole page.
      eventSource={document.body}
      eventPrefix="client"
      aria-hidden
    >
      <ambientLight intensity={dark ? 0.2 : 0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <pointLight position={[-4, -2, 2]} intensity={18} color={accent} />
      <ResponsiveRig>
        <Blob dark={dark} />
        <Particles color={dark ? ACCENT_LIGHT : ACCENT} />
      </ResponsiveRig>
      {/* Studio lighting built from local light panels — no HDR download. */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={4} position={[0, 4, -6]} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={4} color={accent} position={[-5, 0, 2]} scale={[2, 8, 1]} />
        <Lightformer form="rect" intensity={2} position={[5, -1, 2]} scale={[2, 6, 1]} />
        <Lightformer form="ring" intensity={3} color={ACCENT_LIGHT} position={[2, 3, 4]} scale={2} />
      </Environment>
    </Canvas>
  );
}
