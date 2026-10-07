"use client";

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Text, RoundedBox, Cylinder, Box } from '@react-three/drei';
import { useSimulationStore } from '@/store/useSimulationStore';
import * as THREE from 'three';

// 3D Asenkron Motor
function Motor3D({ isRunning }: { isRunning: boolean }) {
  const rotorRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (isRunning && rotorRef.current) {
      rotorRef.current.rotation.x -= delta * 15; // Motoru döndür
    }
  });

  return (
    <group position={[2, 0, -1]}>
      {/* Motor Tabanı */}
      <Box args={[2.2, 0.2, 2.2]} position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#1F2937" metalness={0.5} roughness={0.5} />
      </Box>

      {/* Motor Gövdesi */}
      <Cylinder args={[1, 1, 2.5, 32]} rotation={[0, 0, Math.PI / 2]} position={[0, 1.2, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#374151" metalness={0.6} roughness={0.4} />
      </Cylinder>
      
      {/* Soğutma Kanalları */}
      {Array.from({ length: 5 }).map((_, i) => (
        <Box key={i} args={[2.4, 0.1, 1.8]} position={[0, 1.2 + (i - 2) * 0.3, 0]} castShadow>
          <meshStandardMaterial color="#4B5563" metalness={0.5} roughness={0.6} />
        </Box>
      ))}

      {/* Motor Mili (Rotor) */}
      <group ref={rotorRef} position={[-1.5, 1.2, 0]}>
        <Cylinder args={[0.15, 0.15, 1, 16]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <meshStandardMaterial color="#D1D5DB" metalness={0.9} roughness={0.1} />
        </Cylinder>
        {/* Pervane / Kaplin (Dönüşü görebilmek için) */}
        <Box args={[0.1, 0.8, 0.2]} position={[-0.4, 0, 0]} castShadow>
           <meshStandardMaterial color="#EF4444" metalness={0.3} roughness={0.7} />
        </Box>
        <Box args={[0.1, 0.2, 0.8]} position={[-0.4, 0, 0]} castShadow>
           <meshStandardMaterial color="#EF4444" metalness={0.3} roughness={0.7} />
        </Box>
      </group>

      <Text position={[0, 2.5, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
        3 FAZLI MOTOR
      </Text>
    </group>
  );
}

// 3D Kontrol Panosu
function ControlPanel3D() {
  const { pressStart, pressStop, isStartPressed, isStopPressed, isMotorRunning } = useSimulationStore();

  return (
    <group position={[-2, 0, 1]} rotation={[0, Math.PI / 4, 0]}>
      {/* Pano Gövdesi */}
      <RoundedBox args={[1.5, 2.5, 0.5]} position={[0, 1.25, 0]} radius={0.05} castShadow receiveShadow>
        <meshStandardMaterial color="#F3F4F6" metalness={0.2} roughness={0.8} />
      </RoundedBox>

      <Text position={[0, 2.2, 0.26]} fontSize={0.15} color="#111827" font="bold">
        KONTROL PANELİ
      </Text>

      {/* Çalışıyor Ledi (Yeşil) */}
      <Cylinder args={[0.1, 0.1, 0.05, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, 1.8, 0.26]}>
        <meshStandardMaterial 
          color={isMotorRunning ? "#22C55E" : "#064E3B"} 
          emissive={isMotorRunning ? "#22C55E" : "#000000"} 
          emissiveIntensity={isMotorRunning ? 2 : 0} 
        />
      </Cylinder>

      {/* Start Butonu */}
      <group position={[0, 1.3, 0.25]}>
        <Cylinder args={[0.15, 0.15, 0.05, 32]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#374151" />
        </Cylinder>
        <Cylinder 
          args={[0.12, 0.12, 0.1, 32]} 
          rotation={[Math.PI / 2, 0, 0]} 
          position={[0, 0, isStartPressed ? 0.02 : 0.05]}
          onPointerDown={(e) => { e.stopPropagation(); pressStart(true); }}
          onPointerUp={(e) => { e.stopPropagation(); pressStart(false); }}
          onPointerLeave={(e) => { e.stopPropagation(); pressStart(false); }}
        >
          <meshStandardMaterial color="#22C55E" metalness={0.1} roughness={0.2} />
        </Cylinder>
        <Text position={[0, -0.3, 0.05]} fontSize={0.1} color="#111827">START</Text>
      </group>

      {/* Stop Butonu */}
      <group position={[0, 0.7, 0.25]}>
        <Cylinder args={[0.15, 0.15, 0.05, 32]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#374151" />
        </Cylinder>
        <Cylinder 
          args={[0.12, 0.12, 0.1, 32]} 
          rotation={[Math.PI / 2, 0, 0]} 
          position={[0, 0, isStopPressed ? 0.02 : 0.05]}
          onPointerDown={(e) => { e.stopPropagation(); pressStop(true); }}
          onPointerUp={(e) => { e.stopPropagation(); pressStop(false); }}
          onPointerLeave={(e) => { e.stopPropagation(); pressStop(false); }}
        >
          <meshStandardMaterial color="#EF4444" metalness={0.1} roughness={0.2} />
        </Cylinder>
        <Text position={[0, -0.3, 0.05]} fontSize={0.1} color="#111827">STOP</Text>
      </group>
    </group>
  );
}

// 3D Elektrik Panosu (Kontaktör / Sigorta)
function ElectricalCabinet3D() {
  const { isFuseOn, toggleFuse, isContactorEnergized } = useSimulationStore();

  return (
    <group position={[0, 0, -2]}>
      {/* Pano */}
      <RoundedBox args={[2, 3, 1]} position={[0, 1.5, 0]} radius={0.05} castShadow receiveShadow>
        <meshStandardMaterial color="#9CA3AF" metalness={0.4} roughness={0.6} />
      </RoundedBox>

      {/* Açık Kapak efekti için ön yüz */}
      <Box args={[1.8, 2.8, 0.1]} position={[0, 1.5, 0.45]}>
        <meshStandardMaterial color="#1F2937" />
      </Box>

      <Text position={[0, 2.7, 0.52]} fontSize={0.15} color="white">
        GÜÇ PANOSU
      </Text>

      {/* Sigorta (F1) */}
      <group position={[-0.5, 2, 0.5]}>
        <Box args={[0.3, 0.4, 0.2]}>
           <meshStandardMaterial color="#F3F4F6" />
        </Box>
        <Box 
          args={[0.1, 0.2, 0.1]} 
          position={[0, isFuseOn ? 0.1 : -0.1, 0.1]}
          onClick={(e) => { e.stopPropagation(); toggleFuse(); }}
          className="cursor-pointer"
        >
           <meshStandardMaterial color={isFuseOn ? "#22C55E" : "#EF4444"} />
        </Box>
        <Text position={[0, -0.35, 0.1]} fontSize={0.08} color="white">Sigorta (F1)</Text>
      </group>

      {/* Kontaktör (K1) */}
      <group position={[0.5, 1.5, 0.5]}>
        <Box args={[0.4, 0.5, 0.3]}>
           <meshStandardMaterial color="#374151" />
        </Box>
        {/* Çekili durum göstergesi */}
        <Box args={[0.2, 0.2, 0.1]} position={[0, 0, isContactorEnergized ? 0.1 : 0.15]}>
           <meshStandardMaterial color={isContactorEnergized ? "#3B82F6" : "#9CA3AF"} emissive={isContactorEnergized ? "#3B82F6" : "#000000"} emissiveIntensity={0.5} />
        </Box>
        <Text position={[0, -0.4, 0.1]} fontSize={0.08} color="white">Kontaktör (K1)</Text>
      </group>

      {/* Kablolar */}
      <Cylinder args={[0.02, 0.02, 2, 8]} position={[-0.5, 1, 0.5]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color="#EF4444" />
      </Cylinder>
    </group>
  );
}

export default function Workshop3D() {
  const { isMotorRunning } = useSimulationStore();

  return (
    <div className="w-full h-[600px] bg-gray-950 rounded-xl overflow-hidden border border-gray-800 shadow-2xl relative">
      <div className="absolute top-4 left-4 z-10 bg-gray-900/80 backdrop-blur p-4 rounded-lg border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-2">3D Uygulama Atölyesi (4K Kalite)</h2>
        <p className="text-sm text-gray-400 mb-2">Kamerayı fare ile döndürebilir, yakınlaştırabilirsiniz.</p>
        <ul className="text-xs text-gray-300 space-y-1">
          <li>1. Güç panosundaki <strong className="text-green-400">Sigorta (F1)</strong> şalterine tıklayın.</li>
          <li>2. Kontrol panelindeki <strong className="text-green-400">START</strong> butonuna basılı tutun.</li>
          <li>3. Kontaktörün çekmesini ve Motorun dönüşünü izleyin.</li>
        </ul>
      </div>

      <Canvas shadows camera={{ position: [0, 3, 7], fov: 45 }}>
        <color attach="background" args={['#111827']} />
        
        {/* Işıklandırma (4K Kalitesi için PBR Işıklar) */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          castShadow 
          position={[5, 10, 5]} 
          intensity={1.5} 
          shadow-mapSize={[2048, 2048]} 
        />
        <pointLight position={[-5, 5, -5]} intensity={0.8} color="#60A5FA" />
        <spotLight position={[0, 5, 2]} intensity={2} angle={0.3} penumbra={1} castShadow />

        {/* Çevre Yansımaları (HDRI Kalitesi Hissi) */}
        <Environment preset="warehouse" background blur={0.8} />

        {/* Zemin */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#1F2937" roughness={0.1} metalness={0.2} />
        </mesh>

        <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={10} blur={2} far={4} />

        {/* 3D Objeler */}
        <ControlPanel3D />
        <ElectricalCabinet3D />
        <Motor3D isRunning={isMotorRunning} />

        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 2 - 0.1} // Yerin altına inmeyi engelle
        />
      </Canvas>
    </div>
  );
}
