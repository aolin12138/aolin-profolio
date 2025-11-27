import { useState, useRef, Suspense, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Custom shader material for glowing stars
const GlowingStarsMaterial = () => {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color('#ffffff') }
      },
      vertexShader: `
        attribute float size;
        attribute float glowIntensity;
        varying float vGlowIntensity;
        uniform float time;
        
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // More subtle, natural twinkling
          float twinkle1 = sin(time * glowIntensity * 1.5 + position.x * 20.0);
          float twinkle2 = sin(time * glowIntensity * 2.3 + position.y * 15.0);
          float flash = (twinkle1 * twinkle2) * 0.5 + 0.5;
          flash = smoothstep(0.3, 1.0, flash); // Smoother transitions
          
          vGlowIntensity = flash * glowIntensity;
          
          // Subtle size variation
          gl_PointSize = size * (0.8 + flash * 0.4);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying float vGlowIntensity;
        
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center) * 2.0; // Normalize to 0-1
          
          // Much softer, more natural glow falloff
          float glow = exp(-dist * dist * 4.0); // Gaussian falloff
          
          // Subtle bright center
          float core = exp(-dist * dist * 20.0);
          
          // Combine for natural look
          float alpha = glow * 0.6 + core * 0.4;
          
          gl_FragColor = vec4(color, alpha * vGlowIntensity * 0.8);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
  }, []);

  return material;
};

const Stars = (props) => {
  const ref = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const glowingStarsRef = useRef();
  const { camera, gl } = useThree();
  const targetCameraPos = useRef({ x: 0, y: 0, z: 1 });
  const targetCameraRotation = useRef({ x: 0, y: 0, z: 0 });
  const glowMaterial = GlowingStarsMaterial();

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;

      const scrollY = window.scrollY;
      const viewportCenter = scrollY + window.innerHeight / 2;

      // Get all motion.section elements (from SectionWrapper)
      const sections = document.querySelectorAll('motion-section, section');
      const sectionElements = Array.from(sections);

      // Add the hero section manually (it's not wrapped)
      const heroDiv = document.querySelector('.bg-cover.bg-no-repeat.bg-center');

      // Build array of sections with their positions
      const allSections = [];

      if (heroDiv) {
        allSections.push({
          index: 0,
          top: 0,
          bottom: heroDiv.offsetTop + heroDiv.offsetHeight,
          name: 'hero'
        });
      }

      // Add wrapped sections
      sectionElements.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const offsetTop = scrollY + rect.top;

        allSections.push({
          index: allSections.length,
          top: offsetTop,
          bottom: offsetTop + section.offsetHeight,
          name: section.id || 'section-' + allSections.length
        });
      });

      // Find which section the viewport center is in
      let currentSection = 0;
      for (const section of allSections) {
        if (viewportCenter >= section.top && viewportCenter < section.bottom) {
          currentSection = section.index;
          break;
        }
      }

      // Make sure we don't exceed available sections
      currentSection = Math.min(currentSection, 4); // Max 5 sections (0-4)

      // Define camera positions for each section
      const cameraPositions = [
        { x: 0, y: 0, z: 1, rx: 0, ry: 0 },      // Hero
        { x: 0.3, y: -0.2, z: 0.8, rx: 0.1, ry: 0.3 },  // About
        { x: -0.2, y: 0.3, z: 0.9, rx: -0.1, ry: -0.2 }, // Experience
        { x: 0.2, y: 0.1, z: 0.7, rx: 0.05, ry: 0.15 },  // Tech
        { x: -0.3, y: -0.1, z: 0.85, rx: -0.05, ry: -0.25 } // Contact
      ];

      const targetPos = cameraPositions[currentSection];
      targetCameraPos.current = { x: targetPos.x, y: targetPos.y, z: targetPos.z };
      targetCameraRotation.current = { x: targetPos.rx, y: targetPos.ry, z: 0 };
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      // Delay initial call to ensure DOM is ready
      setTimeout(handleScroll, 200);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Generate multiple layers of stars with different properties
  const [mainStars] = useState(() => {
    try {
      const positions = new Float32Array(3000 * 3);
      const radius = 1.2;

      for (let i = 0; i < 3000; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = Math.cbrt(Math.random()) * radius;

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
      }

      for (let i = 0; i < positions.length; i++) {
        if (!isFinite(positions[i])) positions[i] = 0;
      }

      return positions;
    } catch (error) {
      console.error("Error generating main stars:", error);
      return new Float32Array(0);
    }
  });

  const [distantStars] = useState(() => {
    try {
      const positions = new Float32Array(2000 * 3);
      const radius = 2.0; // Further away

      for (let i = 0; i < 2000; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = Math.cbrt(Math.random()) * radius;

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
      }

      for (let i = 0; i < positions.length; i++) {
        if (!isFinite(positions[i])) positions[i] = 0;
      }

      return positions;
    } catch (error) {
      console.error("Error generating distant stars:", error);
      return new Float32Array(0);
    }
  });

  const [nebulaStars] = useState(() => {
    try {
      const positions = new Float32Array(1500 * 3);
      const radius = 1.5;

      for (let i = 0; i < 1500; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = Math.cbrt(Math.random()) * radius;

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
      }

      for (let i = 0; i < positions.length; i++) {
        if (!isFinite(positions[i])) positions[i] = 0;
      }

      return positions;
    } catch (error) {
      console.error("Error generating nebula stars:", error);
      return new Float32Array(0);
    }
  });

  // Generate glowing stars with size and intensity attributes
  const glowingStarsData = useMemo(() => {
    const count = 80; // Much fewer glowing stars - only special ones
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const glowIntensities = new Float32Array(count);
    const radius = 1.3;

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.cbrt(Math.random()) * radius;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Varied sizes - more natural distribution
      sizes[i] = 6 + Math.random() * 8;

      // Varied intensities for different brightness levels
      glowIntensities[i] = 0.4 + Math.random() * 0.6;
    }

    return { positions, sizes, glowIntensities };
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 30;
    }

    if (ref2.current) {
      ref2.current.rotation.x -= delta / 40;
      ref2.current.rotation.y -= delta / 50;
    }

    if (ref3.current) {
      ref3.current.rotation.x += delta / 60;
      ref3.current.rotation.y -= delta / 70;
    }

    // Rotate glowing stars very slowly
    if (glowingStarsRef.current) {
      glowingStarsRef.current.rotation.x -= delta / 25;
      glowingStarsRef.current.rotation.y -= delta / 35;
    }

    // Update glowing stars shader time
    if (glowMaterial) {
      glowMaterial.uniforms.time.value = state.clock.elapsedTime;
    }

    // Smooth camera animation - very slow for smooth cinematic transitions
    camera.position.x += (targetCameraPos.current.x - camera.position.x) * 0.04;
    camera.position.y += (targetCameraPos.current.y - camera.position.y) * 0.04;
    camera.position.z += (targetCameraPos.current.z - camera.position.z) * 0.04;

    camera.rotation.x += (targetCameraRotation.current.x - camera.rotation.x) * 0.04;
    camera.rotation.y += (targetCameraRotation.current.y - camera.rotation.y) * 0.04;
  });

  if (mainStars.length === 0) {
    return null; // Don't render if no valid positions
  }

  return (
    <>
      {/* Glowing stars with pulsing effect */}
      <group ref={glowingStarsRef} rotation={[0, 0, 0]}>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={glowingStarsData.positions.length / 3}
              array={glowingStarsData.positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-size"
              count={glowingStarsData.sizes.length}
              array={glowingStarsData.sizes}
              itemSize={1}
            />
            <bufferAttribute
              attach="attributes-glowIntensity"
              count={glowingStarsData.glowIntensities.length}
              array={glowingStarsData.glowIntensities}
              itemSize={1}
            />
          </bufferGeometry>
          <primitive object={glowMaterial} attach="material" />
        </points>
      </group>

      {/* Distant background stars - small and dim */}
      <group rotation={[0, 0, Math.PI / 6]}>
        <Points ref={ref3} positions={distantStars} stride={3} frustumCulled {...props}>
          <PointMaterial
            transparent
            color='#6b7aff'
            size={0.0008}
            sizeAttenuation={true}
            depthWrite={false}
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </Points>
      </group>

      {/* Nebula-like colored stars - medium size with glow */}
      <group rotation={[0, 0, Math.PI / 3]}>
        <Points ref={ref2} positions={nebulaStars} stride={3} frustumCulled {...props}>
          <PointMaterial
            transparent
            color='#ff6ec7'
            size={0.0015}
            sizeAttenuation={true}
            depthWrite={false}
            opacity={0.7}
            blending={THREE.AdditiveBlending}
          />
        </Points>
      </group>

      {/* Main bright stars - white/blue with variety */}
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref} positions={mainStars} stride={3} frustumCulled {...props}>
          <PointMaterial
            transparent
            color='#ffffff'
            size={0.002}
            sizeAttenuation={true}
            depthWrite={false}
            opacity={0.9}
            blending={THREE.AdditiveBlending}
          />
        </Points>
      </group>

      {/* Accent purple stars - smaller */}
      <group rotation={[0, 0, Math.PI / 5]}>
        <Points positions={mainStars} stride={3} frustumCulled {...props}>
          <PointMaterial
            transparent
            color='#b794f6'
            size={0.0012}
            sizeAttenuation={true}
            depthWrite={false}
            opacity={0.6}
            blending={THREE.AdditiveBlending}
          />
        </Points>
      </group>
    </>
  );
};

const StarsCanvas = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  try {
    return (
      <div className='w-full h-full fixed inset-0 z-[-1]'>
        <Canvas
          gl={{
            preserveDrawingBuffer: true,
            antialias: false,
            powerPreference: "high-performance",
            alpha: true
          }}
          camera={{ position: [0, 0, 1] }}
        >
          <Suspense fallback={null}>
            <Stars />
          </Suspense>
        </Canvas>
      </div>
    );
  } catch (error) {
    console.error("Error rendering StarsCanvas:", error);
    return null; // Don't render anything if there's an error
  }
};


// To do, background zoom in when switching sections, 乱码fade in effect, 
// increase intro text size which fades in as 乱码
// avatar animation

export default StarsCanvas;
