"use client";

import React, { useEffect } from 'react';
import { useFactoryStore } from '@/store/useFactoryStore';
import { useLadderStore } from '@/store/useLadderStore';
import { motion } from 'framer-motion';
import { Box, Factory, Play, Square, Settings, RefreshCcw } from 'lucide-react';

export default function VirtualFactory() {
  const {
    boxX,
    boxY,
    isBoxVisible,
    sortedCount,
    missedCount,
    sensorActive,
    pistonExtended,
    updatePhysics,
    spawnBox,
    resetCounters
  } = useFactoryStore();

  const { memory, isSimulating, setMemoryBit, toggleSimulation, toggleMemoryBit } = useLadderStore();

  const conveyorRun = memory['Q0.0'] || false;
  const pistonPush = memory['Q0.1'] || false;

  useEffect(() => {
    let animationFrameId: number;

    const loop = () => {
      if (isSimulating) {
        updatePhysics(conveyorRun, pistonPush, setMemoryBit);
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isSimulating, conveyorRun, pistonPush, updatePhysics, setMemoryBit]);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-2xl h-full flex flex-col">
      <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Factory className="text-purple-400" /> Sanal Fabrika (Kutu Ayırma Hattı)
        </h2>
        
        <div className="flex gap-4">
          <div className="text-center px-4 py-2 bg-gray-800 rounded-lg border border-gray-700">
            <div className="text-xs text-gray-400">Ayrılan</div>
            <div className="text-xl font-bold text-green-400">{sortedCount}</div>
          </div>
          <div className="text-center px-4 py-2 bg-gray-800 rounded-lg border border-gray-700">
            <div className="text-xs text-gray-400">Kaçan</div>
            <div className="text-xl font-bold text-red-400">{missedCount}</div>
          </div>
          <button 
            onClick={resetCounters}
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 p-2 rounded-lg border border-gray-700 transition-colors flex items-center justify-center"
            title="Sıfırla"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 relative bg-gray-950 rounded-xl border border-gray-800 overflow-hidden flex items-center justify-center min-h-[300px]">
        {/* Ortam Arka Planı (Grid) */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        {/* Ana Konveyör Bandı */}
        <div className="absolute top-[60%] left-0 right-0 h-4 bg-gray-700 border-y border-gray-600 shadow-[0_10px_20px_rgba(0,0,0,0.5)] z-10 flex overflow-hidden">
          {/* Bant Hareket Efekti */}
          {conveyorRun && (
            <motion.div 
              animate={{ x: [-20, 0] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
              className="w-full h-full flex"
            >
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="h-full w-2 border-r border-gray-900 bg-gray-600 flex-shrink-0" />
              ))}
            </motion.div>
          )}
          {!conveyorRun && (
            <div className="w-full h-full flex">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="h-full w-2 border-r border-gray-900 bg-gray-600 flex-shrink-0" />
              ))}
            </div>
          )}
        </div>

        {/* Alt Konveyör (Ayırma Bandı) */}
        <div className="absolute top-[60%] bottom-0 left-[50%] w-24 bg-gray-800 border-x border-gray-700 z-0">
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 border-l border-dashed border-gray-600" />
        </div>

        {/* Fotosel (Sensör - I0.0) */}
        <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -mt-4 z-20 flex flex-col items-center">
          <div className={`w-4 h-4 rounded-full border-2 transition-colors ${sensorActive ? 'bg-red-500 border-red-300 shadow-[0_0_15px_rgba(239,68,68,0.8)]' : 'bg-gray-800 border-gray-600'}`} />
          <div className="w-1 h-12 bg-gray-600 mt-1" />
          <div className="text-[10px] font-bold text-gray-400 mt-1 bg-gray-900 px-1 rounded">I0.0 (Sensör)</div>
        </div>
        
        {/* Lazer Çizgisi */}
        {isSimulating && (
          <div className={`absolute top-[45%] left-[50%] w-0.5 h-[15%] -translate-x-1/2 z-10 transition-opacity ${sensorActive ? 'bg-red-500 opacity-80' : 'bg-red-500/20'}`} />
        )}

        {/* İtici Piston (Q0.1) */}
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 z-20 flex flex-col items-center">
          <div className="text-[10px] font-bold text-gray-400 mb-1 bg-gray-900 px-1 rounded">Q0.1 (Piston)</div>
          <div className="w-16 h-8 bg-blue-900 border-2 border-blue-600 rounded flex items-center justify-center">
             <div className="w-full h-2 bg-blue-950" />
          </div>
          {/* Piston Çubuğu */}
          <motion.div 
            animate={{ height: pistonExtended ? 60 : 10 }}
            transition={{ duration: 0.2 }}
            className="w-4 bg-gray-400 border-x border-gray-500 origin-top"
          />
          {/* Piston Ucu */}
          <motion.div 
            animate={{ y: pistonExtended ? 60 : 10 }}
            transition={{ duration: 0.2 }}
            className="w-12 h-4 bg-gray-300 rounded absolute top-8"
          />
        </div>

        {/* Kutu (Ürün) */}
        {isBoxVisible && (
          <motion.div 
            className="absolute z-15 w-12 h-12 bg-yellow-600 border-2 border-yellow-500 rounded shadow-lg flex items-center justify-center"
            style={{ 
              left: `${boxX}%`, 
              top: `calc(60% - 3rem + ${boxY}px)`,
              marginLeft: '-1.5rem' // Ortalamak için
            }}
          >
            <Box className="w-6 h-6 text-yellow-300 opacity-50" />
          </motion.div>
        )}
      </div>

      <div className="mt-6 bg-gray-800 rounded-lg p-4 border border-gray-700 flex justify-between items-center">
        <div>
          <h3 className="text-white font-bold text-sm">Manuel Kontrol Paneli</h3>
          <p className="text-xs text-gray-400">PLC dışı donanım testleri için</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={spawnBox}
            disabled={isBoxVisible || !isSimulating}
            className="px-4 py-2 bg-blue-600 disabled:bg-gray-700 text-white rounded text-sm font-medium transition-colors"
          >
            Yeni Kutu Gönder
          </button>
          
          <div className="flex items-center gap-2 border-l border-gray-700 pl-4">
             {/* Start Butonu (I0.1) */}
             <button
               onMouseDown={() => toggleMemoryBit('I0.1')}
               onMouseUp={() => toggleMemoryBit('I0.1')}
               className="w-10 h-10 rounded-full bg-green-600 active:bg-green-500 active:scale-95 border-2 border-green-800 shadow flex items-center justify-center text-xs font-bold text-white"
               title="I0.1 (Start)"
             >
               I0.1
             </button>
             {/* Stop Butonu (I0.2) */}
             <button
               onMouseDown={() => toggleMemoryBit('I0.2')}
               onMouseUp={() => toggleMemoryBit('I0.2')}
               className="w-10 h-10 rounded-full bg-red-600 active:bg-red-500 active:scale-95 border-2 border-red-800 shadow flex items-center justify-center text-xs font-bold text-white"
               title="I0.2 (Stop)"
             >
               I0.2
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
