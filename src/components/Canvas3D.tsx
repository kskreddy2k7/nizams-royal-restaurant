import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. Golden-Saffron Ember Particle System
const GoldEmberParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 180;
  const positions = new Float32Array(particleCount * 3);
  const speeds = new Float32Array(particleCount);
  const angles = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 1.0; // X
    positions[i * 3 + 1] = Math.random() * 3.0;     // Y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 1.0; // Z
    speeds[i] = 0.009 + Math.random() * 0.016;
    angles[i] = Math.random() * Math.PI * 2;
  }

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;
    
    const geo = points.geometry;
    const posArr = geo.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < particleCount; i++) {
      posArr[i * 3 + 1] += speeds[i];

      angles[i] += 0.015;
      posArr[i * 3] += Math.sin(angles[i] + time) * 0.0028;
      posArr[i * 3 + 2] += Math.cos(angles[i] + time) * 0.0028;

      if (posArr[i * 3 + 1] > 3.0) {
        posArr[i * 3] = (Math.random() - 0.5) * 0.5;
        posArr[i * 3 + 1] = 0.0;
        posArr[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      }
    }

    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#FF9933" /* Saffron ember fire sparks */
        size={0.048}
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// 2. Star Anise 3D Mesh (Rich rust-orange mahogany)
const StarAnise: React.FC<{ posRef: React.RefObject<THREE.Group | null> }> = ({ posRef }) => {
  return (
    <group ref={posRef}>
      <mesh castShadow>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#8C351E" roughness={0.7} />
      </mesh>
      {Array.from({ length: 8 }).map((_, idx) => {
        const angle = (idx / 8) * Math.PI * 2;
        return (
          <mesh
            key={idx}
            position={[Math.cos(angle) * 0.16, 0, Math.sin(angle) * 0.16]}
            rotation={[0, -angle, 0.25]}
            castShadow
          >
            <coneGeometry args={[0.045, 0.22, 4]} />
            <meshStandardMaterial color="#A33E23" roughness={0.8} />
          </mesh>
        );
      })}
    </group>
  );
};

// 3. Cardamom Pod 3D Mesh (Vibrant forest green)
const Cardamom: React.FC<{ posRef: React.RefObject<THREE.Group | null> }> = ({ posRef }) => {
  return (
    <group ref={posRef}>
      <mesh castShadow>
        <sphereGeometry args={[0.09, 8, 16]} />
        <meshStandardMaterial color="#5F7D3E" roughness={0.65} />
      </mesh>
      {Array.from({ length: 3 }).map((_, idx) => {
        const angle = (idx / 3) * Math.PI;
        return (
          <mesh key={idx} rotation={[0, angle, 0]} castShadow>
            <torusGeometry args={[0.09, 0.012, 8, 16]} />
            <meshStandardMaterial color="#7FB069" roughness={0.7} />
          </mesh>
        );
      })}
    </group>
  );
};

// 4. Clove 3D Mesh (Warm spiced gold-brown)
const Clove: React.FC<{ posRef: React.RefObject<THREE.Group | null> }> = ({ posRef }) => {
  return (
    <group ref={posRef}>
      <mesh castShadow position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.16, 8]} />
        <meshStandardMaterial color="#3E201B" roughness={0.85} />
      </mesh>
      <mesh castShadow position={[0, 0.02, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#6E443B" roughness={0.75} />
      </mesh>
      {Array.from({ length: 4 }).map((_, idx) => {
        const angle = (idx / 4) * Math.PI * 2;
        return (
          <mesh
            key={idx}
            position={[Math.cos(angle) * 0.035, 0.04, Math.sin(angle) * 0.035]}
            rotation={[0.3, -angle, 0]}
          >
            <coneGeometry args={[0.015, 0.04, 4]} />
            <meshStandardMaterial color="#4A251E" roughness={0.85} />
          </mesh>
        );
      })}
    </group>
  );
};

// 5. The Royal Dum Biryani Handi
const RoyalHandi: React.FC = () => {
  const mainGroup = useRef<THREE.Group>(null);
  const potRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Mesh>(null);
  
  const aniseRef = useRef<THREE.Group>(null);
  const cardamomRef = useRef<THREE.Group>(null);
  const cloveRef = useRef<THREE.Group>(null);

  const { viewport } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!mainGroup.current) return;
    
    const targetX = mouse.current.x * 0.15;
    const targetY = mouse.current.y * 0.15;
    mainGroup.current.rotation.y += (targetX - mainGroup.current.rotation.y) * 0.05;
    mainGroup.current.rotation.x += (targetY - mainGroup.current.rotation.x) * 0.05;
    
    if (potRef.current) potRef.current.rotation.y += 0.001;
    
    if (aniseRef.current) aniseRef.current.rotation.y += 0.015;
    if (cardamomRef.current) cardamomRef.current.rotation.x += 0.012;
    if (cloveRef.current) cloveRef.current.rotation.z -= 0.018;
  });

  useEffect(() => {
    if (!mainGroup.current || !potRef.current || !lidRef.current || !aniseRef.current || !cardamomRef.current || !cloveRef.current) return;

    const isDesktop = viewport.width > 7;
    const spiceScale = isDesktop ? 1.1 : 0.7;

    gsap.set(aniseRef.current.position, { y: 5, x: -1, z: 1 });
    gsap.set(aniseRef.current.scale, { x: 0, y: 0, z: 0 });
    gsap.set(cardamomRef.current.position, { y: 5.5, x: 1, z: 0.5 });
    gsap.set(cardamomRef.current.scale, { x: 0, y: 0, z: 0 });
    gsap.set(cloveRef.current.position, { y: 4.8, x: 0, z: -1 });
    gsap.set(cloveRef.current.scale, { x: 0, y: 0, z: 0 });
    gsap.set(lidRef.current.position, { y: 0.55 });

    const sceneTl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      }
    });

    sceneTl
      .to(mainGroup.current.position, {
        x: isDesktop ? 2.2 : 0,
        y: isDesktop ? -0.2 : 0.8,
        z: isDesktop ? -1 : -0.5,
        duration: 1
      })
      .to(mainGroup.current.rotation, {
        x: 0.3,
        y: 0.8,
        duration: 1
      }, 0)
      .to(mainGroup.current.position, {
        x: isDesktop ? -2.2 : 0,
        y: isDesktop ? -0.1 : 0.8,
        z: isDesktop ? 0.5 : -0.2,
        duration: 1.2
      })
      .to(mainGroup.current.rotation, {
        x: 0.5,
        y: -0.6,
        duration: 1.2
      }, '+=0.1')
      .to(mainGroup.current.position, {
        x: 0,
        y: -4,
        z: -3,
        duration: 1
      })
      .to(mainGroup.current.scale, {
        x: isDesktop ? 0.35 : 0.25,
        y: isDesktop ? 0.35 : 0.25,
        z: isDesktop ? 0.35 : 0.25,
        duration: 1
      }, '-=1');

    const assemblyTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#signature',
        start: 'top 80%',
        end: 'top 15%',
        scrub: 0.8,
      }
    });

    assemblyTl
      .to(cardamomRef.current.position, {
        x: 0.3,
        y: 0.65,
        z: 0.2,
        duration: 1,
        ease: 'power2.out'
      })
      .to(cardamomRef.current.scale, {
        x: spiceScale * 1.1,
        y: spiceScale * 1.1,
        z: spiceScale * 1.1,
        duration: 1
      }, 0)
      .to(aniseRef.current.position, {
        x: -0.4,
        y: 0.62,
        z: -0.1,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.6')
      .to(aniseRef.current.scale, {
        x: spiceScale,
        y: spiceScale,
        z: spiceScale,
        duration: 1
      }, '-=1')
      .to(cloveRef.current.position, {
        x: 0.1,
        y: 0.68,
        z: -0.3,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.5')
      .to(cloveRef.current.scale, {
        x: spiceScale,
        y: spiceScale,
        z: spiceScale,
        duration: 0.8
      }, '-=0.8')
      .to(lidRef.current.position, {
        y: 0.44,
        duration: 0.7,
        ease: 'bounce.out'
      }, '+=0.2');

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [viewport]);

  const isDesktop = viewport.width > 7;

  return (
    <group 
      ref={mainGroup} 
      position={[0, isDesktop ? -0.4 : 0, 0]} 
      scale={isDesktop ? [1.2, 1.2, 1.2] : [0.85, 0.85, 0.85]}
    >
      <group ref={potRef}>
        {/* Pot body (polished copper) */}
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <sphereGeometry args={[0.9, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
          <meshStandardMaterial
            color="#A84A24" /* Rich copper orange */
            metalness={0.95}
            roughness={0.25}
          />
        </mesh>
        
        {/* Base */}
        <mesh castShadow receiveShadow position={[0, -0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.05, 32]} />
          <meshStandardMaterial color="#702F15" metalness={0.95} roughness={0.35} />
        </mesh>

        {/* Neck */}
        <mesh castShadow position={[0, 0.34, 0]}>
          <cylinderGeometry args={[0.72, 0.78, 0.15, 32]} />
          <meshStandardMaterial color="#DF9E7B" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Brass lip */}
        <mesh castShadow position={[0, 0.42, 0]}>
          <torusGeometry args={[0.73, 0.06, 16, 64]} />
          <meshStandardMaterial color="#FFCC00" /* Rich gold/brass */
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>

        {/* Interior */}
        <mesh position={[0, 0.43, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.7, 32]} />
          <meshBasicMaterial color="#110705" />
        </mesh>
      </group>

      {/* Dome Lid */}
      <mesh ref={lidRef} castShadow position={[0, 0.55, 0]}>
        <group>
          <mesh castShadow position={[0, 0.02, 0]}>
            <sphereGeometry args={[0.72, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.35]} />
            <meshStandardMaterial color="#FFCC00" metalness={0.95} roughness={0.15} />
          </mesh>
          <mesh castShadow position={[0, 0.26, 0]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial color="#A84A24" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </mesh>

      <StarAnise posRef={aniseRef} />
      <Cardamom posRef={cardamomRef} />
      <Clove posRef={cloveRef} />

      <GoldEmberParticles />
    </group>
  );
};

export const Canvas3D: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 2.3, 4.8], fov: 42 }}
      >
        <ambientLight intensity={0.5} color="#F5F2EB" />
        
        {/* Dynamic Colorful Lights */}
        {/* 1. Saffron Orange Spotlight */}
        <spotLight
          position={[6, 9, 3]}
          angle={0.3}
          penumbra={1}
          intensity={3.2}
          color="#FF9933" /* Saffron */
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        {/* 2. Cardamom Green Fill Spotlight */}
        <spotLight
          position={[-6, 7, -3]}
          angle={0.45}
          penumbra={0.9}
          intensity={2.2}
          color="#7FB069" /* Cardamom Green */
        />

        {/* 3. Turmeric Yellow Accent Light */}
        <spotLight
          position={[0, 8, -4]}
          angle={0.35}
          penumbra={0.8}
          intensity={1.8}
          color="#FFCC00" /* Turmeric Gold */
        />

        <Stars radius={100} depth={50} count={300} factor={3.5} saturation={0.7} fade speed={1.2} />

        <RoyalHandi />
      </Canvas>
    </div>
  );
};
export default Canvas3D;
