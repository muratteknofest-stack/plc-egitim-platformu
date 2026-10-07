"use client";

import React, { useEffect } from 'react';
import { useSimulationStore } from '@/store/useSimulationStore';
import { Power, CirclePower, Square, Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MotorControlLab() {
  const {
    isFuseOn,
    isStopPressed,
    isStartPressed,
    isContactorEnergized,
    isMotorRunning,
    toggleFuse,
    pressStop,
    pressStart,
    evaluateCircuit
  } = useSimulationStore();

  // Evaluate circuit when component mounts or states change unexpectedly
  useEffect(() => {
    evaluateCircuit();
  }, [evaluateCircuit]);

  return (
    <div className="min-h-screen bg-gray-900 text-slate-200 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Zap className="text-yellow-400" />
            İnteraktif Laboratuvar: Start / Stop Motor Kumanda Devresi
          </h1>
          <p className="text-gray-400 mt-2">
            Aşağıdaki kumanda panelini kullanarak devreyi çalıştırın. Sigortayı açın, START butonuna basılı tutun ve mühürleme mantığını gözlemleyin.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol Panel: Kumanda Panosu */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-2xl">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b border-gray-700 pb-2">
              <Activity className="text-blue-400" /> Kumanda Panosu
            </h2>
            
            <div className="flex flex-col gap-8 items-center">
              {/* Sigorta */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-gray-400">Kumanda Sigortası (F1)</span>
                <button
                  onClick={toggleFuse}
                  className={`w-16 h-24 rounded-md border-2 flex flex-col items-center justify-between p-2 transition-colors ${
                    isFuseOn ? 'bg-green-600/20 border-green-500' : 'bg-red-600/20 border-red-500'
                  }`}
                >
                  <div className={`w-8 h-4 rounded-sm ${isFuseOn ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="font-bold">{isFuseOn ? 'ON' : 'OFF'}</span>
                  <div className="w-8 h-4 rounded-sm bg-gray-700" />
                </button>
              </div>

              <div className="flex gap-8">
                {/* Stop Butonu */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm text-gray-400">Stop Butonu (NC)</span>
                  <button
                    onMouseDown={() => pressStop(true)}
                    onMouseUp={() => pressStop(false)}
                    onMouseLeave={() => pressStop(false)}
                    onTouchStart={() => pressStop(true)}
                    onTouchEnd={() => pressStop(false)}
                    className="relative group outline-none"
                  >
                    <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center border-4 border-gray-600 shadow-lg">
                      <motion.div
                        animate={{ scale: isStopPressed ? 0.9 : 1, y: isStopPressed ? 4 : 0 }}
                        className="w-14 h-14 bg-red-600 rounded-full shadow-[inset_0_-4px_0_rgba(0,0,0,0.3)] border border-red-500 flex items-center justify-center text-white font-bold"
                      >
                        <Square className="w-6 h-6 fill-current" />
                      </motion.div>
                    </div>
                  </button>
                </div>

                {/* Start Butonu */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm text-gray-400">Start Butonu (NO)</span>
                  <button
                    onMouseDown={() => pressStart(true)}
                    onMouseUp={() => pressStart(false)}
                    onMouseLeave={() => pressStart(false)}
                    onTouchStart={() => pressStart(true)}
                    onTouchEnd={() => pressStart(false)}
                    className="relative group outline-none"
                  >
                    <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center border-4 border-gray-600 shadow-lg">
                      <motion.div
                        animate={{ scale: isStartPressed ? 0.9 : 1, y: isStartPressed ? 4 : 0 }}
                        className="w-14 h-14 bg-green-500 rounded-full shadow-[inset_0_-4px_0_rgba(0,0,0,0.3)] border border-green-400 flex items-center justify-center text-white font-bold"
                      >
                        <Power className="w-6 h-6" />
                      </motion.div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Panel: Simülasyon Görüntüsü */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b border-gray-700 pb-2 w-full absolute top-6 left-6 right-6">
              <CirclePower className="text-yellow-400" /> Sistem Durumu
            </h2>

            <div className="mt-16 w-full flex flex-col items-center gap-12">
              {/* Kontaktör (K1) */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-gray-400">Kontaktör (K1)</span>
                <div className={`relative w-32 h-32 rounded-lg border-4 flex items-center justify-center transition-all ${
                  isContactorEnergized ? 'border-blue-500 bg-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.4)]' : 'border-gray-600 bg-gray-700'
                }`}>
                  <div className="text-center">
                    <div className="font-bold text-xl">{isContactorEnergized ? 'ÇEKİLİ' : 'BOŞTA'}</div>
                    <div className="text-xs text-gray-400 mt-1">A1 - A2 Bobin</div>
                  </div>
                  {/* Animasyonlu Mıknatıs Etkisi */}
                  {isContactorEnergized && (
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute inset-0 rounded-lg border-2 border-blue-400"
                    />
                  )}
                </div>
              </div>

              {/* Asenkron Motor */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-gray-400">3 Fazlı Asenkron Motor</span>
                <div className="relative">
                  <motion.div
                    animate={{ rotate: isMotorRunning ? 360 : 0 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className={`w-40 h-40 rounded-full border-8 border-gray-600 flex items-center justify-center relative ${
                      isMotorRunning ? 'bg-gray-700' : 'bg-gray-800'
                    }`}
                  >
                    {/* Fan kanatları */}
                    <div className="absolute w-2 h-full bg-gray-500 rounded-full"></div>
                    <div className="absolute w-full h-2 bg-gray-500 rounded-full"></div>
                    
                    <div className="w-16 h-16 bg-gray-600 rounded-full z-10 flex items-center justify-center border-4 border-gray-500">
                      <span className="font-bold text-white">M</span>
                    </div>
                  </motion.div>
                  {/* Motor Çalışma İndikatörü */}
                  <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${
                    isMotorRunning ? 'bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.8)]' : 'bg-red-500 text-white'
                  }`}>
                    {isMotorRunning ? 'ÇALIŞIYOR' : 'DURUYOR'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kumanda Şeması Animasyonu */}
        <div className="mt-8 bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-2xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-200 border-b border-gray-700 pb-2">Elektrik Akışı (Kumanda Şeması)</h2>
          <div className="h-64 bg-slate-900 rounded-lg border border-slate-700 relative flex items-center justify-center p-8">
            <div className="w-full max-w-3xl flex justify-between items-center relative">
              {/* L1 Fazı */}
              <div className="font-bold text-red-500 mr-4">L1 (24V)</div>
              
              {/* Kablo Yolu L1 -> Sigorta -> Stop -> Start/Mühürleme -> K1 Bobin -> N */}
              <div className="flex-1 flex items-center relative">
                {/* Ana Hat */}
                <div className={`h-1 w-full relative transition-colors ${isFuseOn ? 'bg-red-500' : 'bg-gray-600'}`}>
                  {isFuseOn && (
                    <motion.div animate={{ x: ['0%', '100%'] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="absolute inset-y-0 left-0 w-8 bg-white/50 blur-[2px]" />
                  )}
                </div>

                {/* Node: Sigorta */}
                <div className="absolute left-[15%] w-10 h-10 -mt-5 bg-gray-800 border-2 border-gray-500 rounded flex items-center justify-center text-xs font-bold text-gray-300">
                  F1 {isFuseOn ? '(ON)' : '(OFF)'}
                </div>

                {/* Hat Sigortadan Sonra */}
                <div className={`absolute left-[15%] right-[70%] h-1 transition-colors ${isFuseOn ? 'bg-red-500' : 'bg-gray-600'}`} />

                {/* Node: Stop NC */}
                <div className="absolute left-[30%] w-12 h-10 -mt-5 bg-gray-800 border-2 border-gray-500 flex flex-col items-center justify-center text-xs font-bold text-gray-300">
                  STOP
                  <div className="w-full flex justify-center mt-1">
                    <div className={`w-6 h-1 ${!isStopPressed ? 'bg-red-500' : 'bg-gray-600 -rotate-12 translate-y-[-2px]'}`} />
                  </div>
                </div>

                {/* Hat Stoptan Sonra */}
                <div className={`absolute left-[30%] right-[40%] h-1 transition-colors ${isFuseOn && !isStopPressed ? 'bg-red-500' : 'bg-gray-600'}`} />

                {/* Node: Start NO */}
                <div className="absolute left-[60%] w-12 h-10 -mt-10 bg-gray-800 border-2 border-gray-500 flex flex-col items-center justify-center text-xs font-bold text-gray-300">
                  START
                  <div className="w-full flex justify-center mt-1">
                    <div className={`w-6 h-1 ${isStartPressed ? 'bg-red-500' : 'bg-gray-600 -rotate-12 translate-y-[-4px]'}`} />
                  </div>
                </div>

                {/* Paralel Hat: Mühürleme (K1 NO) */}
                <div className="absolute left-[50%] w-32 h-20 -mt-5 border-l-2 border-b-2 border-r-2 border-gray-600 flex justify-center items-end pb-2">
                  <div className={`absolute left-0 bottom-0 w-full h-[2px] transition-colors ${isContactorEnergized ? 'bg-red-500' : 'bg-transparent'}`} />
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] transition-colors" style={{ backgroundColor: isFuseOn && !isStopPressed ? '#ef4444' : 'transparent' }} />
                  <div className="absolute right-0 top-0 bottom-0 w-[2px] transition-colors" style={{ backgroundColor: isContactorEnergized ? '#ef4444' : 'transparent' }} />
                  
                  <div className="bg-gray-800 border-2 border-gray-500 w-16 h-8 flex flex-col items-center justify-center text-[10px] text-gray-300 z-10 translate-y-4">
                    K1 (13-14)
                    <div className="w-full flex justify-center mt-1">
                      <div className={`w-6 h-1 ${isContactorEnergized ? 'bg-red-500' : 'bg-gray-600 -rotate-12 translate-y-[-2px]'}`} />
                    </div>
                  </div>
                </div>

                {/* Hat Start'tan Sonra */}
                <div className={`absolute left-[60%] right-[10%] h-1 transition-colors ${isContactorEnergized ? 'bg-red-500' : 'bg-gray-600'}`} />

                {/* Node: K1 Bobin */}
                <div className="absolute right-[15%] w-12 h-12 -mt-6 bg-blue-900 border-2 border-blue-400 rounded-full flex flex-col items-center justify-center text-xs font-bold text-blue-200">
                  K1
                  <span className="text-[9px]">A1-A2</span>
                </div>
              </div>

              {/* N Nötr */}
              <div className="font-bold text-blue-500 ml-4">0V (N)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
