"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Tracks the user's OS-level reduced-motion preference so the shader can
// freeze its animation loop instead of running it constantly in the
// background — constant motion behind body text hurts readability and can
// trigger vestibular discomfort for users who've asked for less of it.
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return reduced;
}

// The matrix rain doesn't need 60–144fps to look smooth, and rendering a
// full-screen shader at the display's full refresh rate competes with
// scrolling for the GPU. Rendering on demand at a fixed 30fps halves (or
// better) that cost and keeps scrolling responsive.
const TARGET_FPS = 30;

function FrameLimiter() {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const id = window.setInterval(() => invalidate(), 1000 / TARGET_FPS);
    return () => window.clearInterval(id);
  }, [invalidate]);

  return null;
}

interface MatrixShaderBackgroundProps {
  className?: string;
}

/**
 * Full-page animated background. Fixed to the viewport so it sits behind
 * the entire page as you scroll — it's purely decorative, so the hero text
 * and every content block live in the page itself (app/page.tsx), on solid
 * surfaces where they need to stay readable.
 */
export default function MatrixShaderBackground({
  className = "",
}: MatrixShaderBackgroundProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: true,
        }}
        // 1x resolution: the effect is deliberately blocky and grainy, so
        // rendering it at 2x on high-DPI screens quadrupled the GPU work
        // for no visible gain.
        dpr={1}
        // Frames are driven by FrameLimiter below (30fps) instead of every
        // display refresh. With reduced motion, nothing drives new frames,
        // so it renders once and stays still.
        frameloop="demand"
        camera={{ position: [0, 0, 1], fov: 75 }}
        className="w-full h-full"
        style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
      >
        <color attach="background" args={["#000000"]} />
        <MatrixShaderPlane reducedMotion={reducedMotion} />
        {!reducedMotion && <FrameLimiter />}
      </Canvas>
    </div>
  );
}

function MatrixShaderPlane({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const vertexShader = `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;
    uniform vec3 uColorD;
    uniform float uFadeIn;
    
    varying vec2 vUv;

    // Random function for noise
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    // Blocky Noise Function for digital aesthetic
    float blockNoise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        
        // Four corners in 2D of a tile
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        // Cubic Hermite Spline (Smooth but we will quantize later)
        vec2 u = f * f * (3.0 - 2.0 * f);

        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
    }

    void main() {
      // 1. Setup Coordinates & Aspect Ratio
      vec2 uv = vUv;
      float aspect = uResolution.x / uResolution.y;
      
      // Center UVs for distortion calc
      vec2 centeredUv = uv * 2.0 - 1.0;
      centeredUv.x *= aspect;
      
      // Mouse Coordinates
      vec2 mouse = uMouse * 2.0 - 1.0;
      mouse.x *= aspect;

      // 2. Digital Warp Interaction
      // Instead of fluid, the mouse bends the space like a CRT magnet
      float dist = length(centeredUv - mouse);
      float distortionStrength = smoothstep(0.6, 0.0, dist);
      
      // Displace UVs away from mouse - store the warped UV for background
      vec2 warp = (centeredUv - mouse) * distortionStrength * 0.2;
      vec2 warpedUv = uv - warp * 0.5; // For matrix rain background

      // 3. Matrix Rain Logic (using warped UV)
      
      // Fade-in effect: gradually increase particle density
      float fadeIn = smoothstep(0.0, 5.0, uFadeIn);
      
      // Define grid for columns
      float columns = 60.0; // Number of vertical code lines
      float rows = 30.0;    // Vertical resolution for blocks
      
      // Quantize X to create distinct columns
      float colId = floor(warpedUv.x * columns);
      
      // Skip columns based on fade-in (fewer particles at start)
      float columnSkip = random(vec2(colId, 0.0));
      if (columnSkip > fadeIn) {
        colId = -1.0; // Disable this column
      }
      
      // Speed varies per column
      float speed = (random(vec2(colId, 1.0)) * 0.5 + 0.2) * 0.8;
      
      // Calculate Y position with time (falling)
      float yPos = warpedUv.y + uTime * speed;
      
      // Quantize Y to create "characters" or blocks
      float rowId = floor(yPos * rows);
      
      // Generate brightness for this block
      float noiseVal = random(vec2(colId, rowId));
      
      // Create the "trail" effect
      // We want blocks to light up and fade
      float trailMask = smoothstep(0.0, 1.0, fract(yPos * 3.0 + noiseVal));
      
      // Combine noise with vertical streaks
      float pattern = noiseVal * trailMask;
      
      // Apply fade-in to pattern intensity
      pattern *= fadeIn;
      
      // Add a "glitch" offset randomly (also affected by fade-in)
      if (random(vec2(uTime * 10.0, warpedUv.y)) > 0.98) {
         pattern += 0.5 * fadeIn;
      }

      // 4. Grain / Static (Keeping the text effect texture)
      float grain = random(warpedUv * 4.0 + mod(uTime, 10.0));
      
      // 5. Color Mixing
      // Determine if this particle should be red (5% chance)
      float isRed = step(0.999, random(vec2(colId, rowId)));
      
      // Mix Background (Black) -> Trail (Dark Grey or Dark Red)
      vec3 trailColor = mix(uColorB, uColorD * 0.3, isRed);
      vec3 color = mix(uColorA, trailColor, pattern * 1.5);
      
      // Add Highlights (Lighter Gray/Silver or Red)
      // The "Head" of the rain drops or random bright glitches
      float highlight = smoothstep(0.8, 1.0, pattern * noiseVal);
      
      // Mouse interaction lighting
      highlight += distortionStrength * 0.4 * random(warpedUv + uTime); 
      
      // Mix in the highlight color (red particles stay red, others gray)
      vec3 highlightColor = mix(uColorC, uColorD, isRed);
      color = mix(color, highlightColor, highlight);

      // Apply grainy texture to the whole image
      color += (grain - 0.5) * 0.12;
      
      // Scanline effect (subtle horizontal lines)
      float scanline = sin(vUv.y * 800.0) * 0.04;
      color -= scanline;

      // Vignette
      float vignette = 1.0 - smoothstep(0.5, 1.5, length(vUv - 0.5) * 1.5);
      color *= vignette;

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  // Uniforms are created once. Resolution is kept current in useFrame
  // instead of rebuilding this object on every resize — on mobile, the
  // address bar showing/hiding while scrolling fires a resize each time,
  // and rebuilding the uniforms then caused a visible hitch.
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uFadeIn: { value: 0 },
      // Matrix Palette with subtle red accents
      uColorA: { value: new THREE.Color("#000000") }, // Pure Black Background
      uColorB: { value: new THREE.Color("#202020") }, // Dark Gray Trails
      uColorC: { value: new THREE.Color("#C0C0C0") }, // Light Gray Highlights
      uColorD: { value: new THREE.Color("#ff4444") }, // Red for accented boxes
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uResolution.value.set(state.size.width, state.size.height);
    }

    // Respect prefers-reduced-motion: freeze the shader on a settled frame
    // (fully faded in, no further updates) instead of animating forever.
    if (reducedMotion) {
      if (meshRef.current) {
        const material = meshRef.current.material as THREE.ShaderMaterial;
        material.uniforms.uFadeIn.value = 5;
      }
      return;
    }

    const { clock, pointer } = state;
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;

      // Update time
      material.uniforms.uTime.value = clock.getElapsedTime();

      // Update fade-in (0 to 5 seconds)
      material.uniforms.uFadeIn.value = clock.getElapsedTime();

      // Mouse movement - slightly snappier than before for digital feel
      // Pointer is normalized -1 to 1, we map to 0 to 1
      const targetX = (pointer.x + 1) * 0.5;
      const targetY = (pointer.y + 1) * 0.5;

      // Increased lerp speed (0.08 -> 0.12) for more responsive "glitch" interaction
      material.uniforms.uMouse.value.x +=
        (targetX - material.uniforms.uMouse.value.x) * 0.12;
      material.uniforms.uMouse.value.y +=
        (targetY - material.uniforms.uMouse.value.y) * 0.12;
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      {/* A flat full-screen quad — the effect is all in the fragment
          shader, so the 64x64 subdivided mesh was unneeded vertex work. */}
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
}
