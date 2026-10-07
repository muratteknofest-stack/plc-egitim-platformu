"use client";

import React, { useState, useEffect } from 'react';
import { Activity, Waves, ArrowRight, Gauge, Cpu } from 'lucide-react';

export default function AnalogLab() {
  // Fiziksel Seviye (0-100 cm)
  const [level, setLevel] = useState<number>(50);

  // Elektriksel Sinyal (4-20 mA)
  // Formül: mA = 4 + (Level / 100) * 16
  const mA = 4 + (level / 100) * 16;

  // PLC Raw Değeri (Siemens Standardı: 0 - 27648)
  // Formül: Raw = (mA - 4) / 16 * 27648
  const rawValue = Math.round(((mA - 4) / 16) * 27648);

  // PLC Engineering Unit (Scale_X)
  const scaledValue = ((rawValue / 27648) * 100).toFixed(1);

  return (
    <div className="max-w-6xl mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Activity className="text-purple-400 w-8 h-8" />
          Analog Sinyal Laboratuvarı (4-20mA)
        </h1>
        <p className="text-gray-400 mt-2">Endüstride analog sensörlerin fiziksel dünyadan PLC yazılımına kadar geçirdiği 4 aşamalı dönüşümü (Scaling) inceleyin.</p>
      </header>

      {/* Main Lab Area */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-2xl">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          
          {/* Adım 1: Fiziksel Dünya (Tank) */}
          <div className="flex flex-col items-center bg-gray-800 p-6 rounded-xl border border-gray-700 h-[400px]">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
              <Waves className="text-blue-400" /> Fiziksel Tank
            </h3>
            <p className="text-xs text-gray-400 mb-6 text-center">0 - 100 cm Su Seviyesi</p>
            
            <div className="relative w-32 flex-1 border-4 border-gray-600 rounded-b-lg overflow-hidden bg-gray-950 flex flex-col justify-end">
              {/* Su Animasyonu */}
              <div 
                className="w-full bg-blue-500/80 transition-all duration-300 relative"
                style={{ height: `${level}%` }}
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-blue-400/50 animate-pulse" />
              </div>
              
              {/* Seviye Çizgileri */}
              <div className="absolute inset-y-0 left-0 w-4 border-r border-gray-700 flex flex-col justify-between py-2 text-[8px] text-gray-500">
                <span>100</span>
                <span>75</span>
                <span>50</span>
                <span>25</span>
                <span>0</span>
              </div>
            </div>

            <input 
              type="range" 
              min="0" 
              max="100" 
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              className="w-full mt-6 accent-blue-500"
            />
            <div className="text-xl font-bold text-white mt-2">{level} cm</div>
          </div>

          <div className="hidden md:flex justify-center text-gray-600"><ArrowRight className="w-12 h-12" /></div>

          {/* Adım 2: Sensör / Transmitter */}
          <div className="flex flex-col items-center bg-gray-800 p-6 rounded-xl border border-gray-700 h-[400px] justify-center">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
              <Gauge className="text-orange-400" /> Transmitter
            </h3>
            <p className="text-xs text-gray-400 mb-8 text-center">Fiziksel veriyi elektrik sinyaline çevirir.</p>
            
            <div className="w-32 h-32 rounded-full border-4 border-gray-600 bg-gray-900 flex flex-col items-center justify-center relative shadow-inner">
              <div className="text-3xl font-black text-orange-400">{mA.toFixed(2)}</div>
              <div className="text-sm font-bold text-gray-500">mA</div>
              
              {/* Fake Dial */}
              <div className="absolute bottom-4 w-full px-4 flex justify-between text-[10px] text-gray-500 font-bold">
                <span>4mA</span>
                <span>20mA</span>
              </div>
            </div>

            <div className="mt-8 bg-gray-900 p-3 rounded text-xs text-gray-400 w-full font-mono text-center border border-gray-700">
              mA = 4 + (Level/100) * 16
            </div>
          </div>

          <div className="hidden md:flex justify-center text-gray-600"><ArrowRight className="w-12 h-12" /></div>

          {/* Adım 3: PLC Analog Input & Yazılım */}
          <div className="flex flex-col items-center bg-gray-800 p-6 rounded-xl border border-gray-700 h-[400px] justify-center col-span-1 md:col-span-1 relative">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
              <Cpu className="text-green-400" /> PLC İşlemcisi
            </h3>
            <p className="text-xs text-gray-400 mb-6 text-center">A/D Çevirici ve Scaling İşlemi</p>
            
            <div className="w-full space-y-6">
              {/* ADC Raw Value */}
              <div className="bg-gray-900 border border-gray-600 p-4 rounded-lg text-center relative overflow-hidden">
                <div className="text-[10px] text-gray-400 mb-1">A/D Converter (Raw INT)</div>
                <div className="text-2xl font-mono text-green-400 font-bold">{rawValue}</div>
                <div className="text-[9px] text-gray-500 mt-1">Range: 0 - 27648</div>
                
                {/* Visualizer Bar */}
                <div className="w-full h-1 bg-gray-800 mt-3 rounded overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${(rawValue/27648)*100}%` }} />
                </div>
              </div>

              {/* TIA Portal NORM_X / SCALE_X Block Simulation */}
              <div className="bg-blue-900/20 border border-blue-800 p-4 rounded-lg relative">
                <div className="text-xs font-bold text-blue-300 mb-3 border-b border-blue-800/50 pb-1">SCALE_X (Mühendislik Birimi)</div>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-gray-400">
                  <div className="text-right pr-2 border-r border-blue-800/50">MIN:</div><div>0.0</div>
                  <div className="text-right pr-2 border-r border-blue-800/50">MAX:</div><div>100.0</div>
                  <div className="text-right pr-2 border-r border-blue-800/50">VALUE:</div><div className="text-green-400">{rawValue}</div>
                  <div className="text-right pr-2 border-r border-blue-800/50 pt-2 font-bold text-white">OUT:</div>
                  <div className="pt-2 text-lg font-bold text-white">{scaledValue} L</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
          <h4 className="text-white font-bold mb-2">1. Neden 4-20mA?</h4>
          <p className="text-sm text-gray-400">Kablo koptuğunda akım 0mA'e düşer. PLC 4mA'in altını okuduğunda kablonun koptuğunu anlar ve sistemi güvenli duruma geçirir (Wire Break Detection).</p>
        </div>
        <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
          <h4 className="text-white font-bold mb-2">2. Raw Value (27648) Nedir?</h4>
          <p className="text-sm text-gray-400">Siemens S7 serisi PLC'lerde 16-bit analog kartlar 20mA akımı maksimum çözünürlük olarak 27648 tam sayısına (Integer) dönüştürür.</p>
        </div>
        <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
          <h4 className="text-white font-bold mb-2">3. Scaling İşlemi</h4>
          <p className="text-sm text-gray-400">PLC'nin okuduğu 27648 gibi anlamsız bir sayıyı, operatör ekranında (HMI) litresine (L), bar'ına veya santigratına çevirme işlemine Scaling denir.</p>
        </div>
      </div>
    </div>
  );
}
