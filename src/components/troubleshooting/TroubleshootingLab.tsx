"use client";

import React, { useState } from 'react';
import { AlertTriangle, Wrench, Search, CheckCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

type FaultType = 'FUSE_BLOWN' | 'SENSOR_DEAD' | 'CABLE_BROKEN' | 'COIL_BURNED';

interface Level {
  id: number;
  title: string;
  description: string;
  fault: FaultType;
  options: { id: FaultType, label: string }[];
  hint: string;
  xp: number;
}

const levels: Level[] = [
  {
    id: 1,
    title: "Çalışmayan Motor (Seviye 1)",
    description: "Start butonuna basıldığında kontaktör hiç tepki vermiyor ve motor dönmüyor. Ölçüm yaptığında L1 fazında 24V var, ancak Sigorta çıkışında 0V okuyorsun.",
    fault: 'FUSE_BLOWN',
    hint: "Sigortanın giriş ve çıkış voltajlarını karşılaştır.",
    options: [
      { id: 'CABLE_BROKEN', label: 'Motor Güç Kablosu Kopuk' },
      { id: 'FUSE_BLOWN', label: 'Kumanda Sigortası Atmış (Açık Devre)' },
      { id: 'COIL_BURNED', label: 'Kontaktör Bobini Yanmış' },
    ],
    xp: 50
  },
  {
    id: 2,
    title: "Tepkisiz Konveyör (Seviye 2)",
    description: "Fabrikada kutu sensörün önünden geçmesine rağmen pnömatik piston aşağı inmiyor. PLC yazılımında sorun yok (Q0.1 = TRUE oluyor). Piston valfinin soketine gelen voltajı ölçtüğünde 0V görüyorsun.",
    fault: 'CABLE_BROKEN',
    hint: "PLC çıkışı veriyor ama valfe enerji gitmiyor. Aradaki bağlantıyı kontrol etmelisin.",
    options: [
      { id: 'SENSOR_DEAD', label: 'Fotosel Sensörü Bozuk' },
      { id: 'FUSE_BLOWN', label: 'Ana Sigorta Atmış' },
      { id: 'CABLE_BROKEN', label: 'PLC Çıkış - Valf Arası Kablo Kopuk' },
    ],
    xp: 100
  }
];

export default function TroubleshootingLab() {
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<FaultType | null>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showHint, setShowHint] = useState(false);

  const level = levels[currentLevel];

  const handleCheck = () => {
    if (selectedOption === level.fault) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(prev => prev + 1);
      setSelectedOption(null);
      setStatus('idle');
      setShowHint(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Wrench className="text-orange-500 w-8 h-8" />
          Arıza Bulma Laboratuvarı
        </h1>
        <p className="text-gray-400 mt-2">Arızalı bir sistem karşısındasın. İpuçlarını ve ölçüm sonuçlarını değerlendirerek sorunu tespit et.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Görev Paneli */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl relative overflow-hidden">
            {status === 'success' && (
              <div className="absolute inset-0 bg-green-900/90 z-20 flex flex-col items-center justify-center backdrop-blur-sm">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-green-500 rounded-full p-4 mb-4">
                  <CheckCircle className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-2">Arıza Çözüldü!</h2>
                <p className="text-green-200 text-lg mb-6">+{level.xp} XP Kazandın</p>
                {currentLevel < levels.length - 1 ? (
                  <button onClick={nextLevel} className="px-6 py-3 bg-white text-green-900 font-bold rounded-lg hover:bg-gray-100 transition-colors">
                    Sıradaki Görev
                  </button>
                ) : (
                  <div className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg border border-gray-700">Tüm Görevler Tamamlandı!</div>
                )}
              </div>
            )}

            <div className="flex justify-between items-start border-b border-gray-700 pb-4 mb-6">
              <div>
                <div className="text-orange-400 font-bold text-sm mb-1">GÖREV {currentLevel + 1}/{levels.length}</div>
                <h2 className="text-2xl font-bold text-white">{level.title}</h2>
              </div>
              <div className="bg-gray-900 px-3 py-1 rounded border border-gray-700 flex items-center gap-2">
                <Zap className="text-yellow-400 w-4 h-4" />
                <span className="font-bold text-yellow-400">{level.xp} XP</span>
              </div>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-red-500/20 mb-8">
              <div className="flex gap-4">
                <AlertTriangle className="text-red-500 w-8 h-8 shrink-0" />
                <p className="text-gray-300 text-lg leading-relaxed">{level.description}</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-4">Sence Arıza Nerede?</h3>
            <div className="space-y-3">
              {level.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => { setSelectedOption(opt.id); setStatus('idle'); }}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedOption === opt.id 
                      ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                      : 'border-gray-700 bg-gray-800 hover:border-gray-500'
                  }`}
                >
                  <span className={`font-medium ${selectedOption === opt.id ? 'text-blue-400' : 'text-gray-300'}`}>
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-between items-center pt-6 border-t border-gray-700">
              <button 
                onClick={() => setShowHint(true)}
                className="text-yellow-500 hover:text-yellow-400 font-medium flex items-center gap-2 text-sm"
              >
                <Search className="w-4 h-4" /> Multimetre ile Ölç (İpucu)
              </button>
              
              <div className="flex items-center gap-4">
                {status === 'error' && <span className="text-red-500 font-bold animate-pulse">Yanlış Tespit! Tekrar dene.</span>}
                <button
                  onClick={handleCheck}
                  disabled={!selectedOption}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 text-white px-8 py-3 rounded-lg font-bold transition-colors"
                >
                  Arızayı Onayla
                </button>
              </div>
            </div>

            {showHint && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-200 text-sm">
                <strong>Multimetre Sonucu:</strong> {level.hint}
              </motion.div>
            )}
          </div>
        </div>

        {/* Sağ Panel: Araçlar & Envanter */}
        <div className="space-y-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-gray-700 pb-2">
              <Wrench className="w-5 h-5 text-gray-400" /> Araç Çantam
            </h3>
            <div className="space-y-3">
              <div className="bg-gray-900 border border-gray-700 p-3 rounded flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center border-2 border-red-500 text-red-500 font-bold text-xs">V-</div>
                <div>
                  <div className="text-sm font-bold text-white">Dijital Multimetre</div>
                  <div className="text-xs text-gray-400">Voltaj, Direnç Ölçümü</div>
                </div>
              </div>
              <div className="bg-gray-900 border border-gray-700 p-3 rounded flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center border border-gray-600 text-gray-400 text-xs">🛠️</div>
                <div>
                  <div className="text-sm font-bold text-white">Tornavida Seti</div>
                  <div className="text-xs text-gray-400">Klemens Sıkma</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
