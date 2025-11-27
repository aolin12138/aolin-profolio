import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <>
      <hemisphereLight intensity={0.5} skyColor='#b8b8d0' groundColor='#2a2a3a' />
      <directionalLight position={[10, 5, 5]} intensity={1.5} color='#d0c8ff' />
      <directionalLight position={[-3, 3, -3]} intensity={0.6} color='#a0a0b0' />
      <pointLight position={[8, 2, 3]} intensity={1} color='#c8d8ff' />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.5 : 0.6}
        position={isMobile ? [0, -2, -1] : [0, -2.75, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </>
  )
};

// Preload the model
useGLTF.preload("./desktop_pc/scene.gltf");

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{
        preserveDrawingBuffer: true,
        antialias: true,
        powerPreference: "high-performance"
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}

export default ComputersCanvas;