"use client";

import React, { useState, useEffect } from 'react';
import { useLadderStore, ElementType } from '@/store/useLadderStore';
import { Play, Square, Plus, Trash2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const ADDRESS_OPTIONS = {
  inputs: ['I0.0', 'I0.1', 'I0.2'],
  outputs: ['Q0.0', 'Q0.1'],
  memory: ['M0.0'],
};

export default function LadderEditor() {
  const {
    rungs,
    memory,
    isSimulating,
    addRung,
    addElementToRung,
    removeElement,
    toggleMemoryBit,
    toggleSimulation,
    evaluateLogic
  } = useLadderStore();

  const [draggedTool, setDraggedTool] = useState<{ type: ElementType } | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>('I0.0');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating) {
      interval = setInterval(() => {
        evaluateLogic();
      }, 100); // PLC Scan Cycle (100ms for visual purposes)
    }
    return () => clearInterval(interval);
  }, [isSimulating, evaluateLogic]);

  const handleDragStart = (e: React.DragEvent, type: ElementType) => {
    e.dataTransfer.setData('type', type);
    setDraggedTool({ type });
  };

  const handleDrop = (e: React.DragEvent, rungId: string, position: 'input' | 'output') => {
    e.preventDefault();
    const type = e.dataTransfer.getData('type') as ElementType;
    if (!type) return;

    // Validation: only Coils on the right (output), contacts on the left (input)
    if (position === 'output' && type !== 'COIL') {
      alert("Çıkış kısmına sadece Bobin (Coil) eklenebilir.");
      return;
    }
    if (position === 'input' && type === 'COIL') {
      alert("Giriş kısmına Bobin (Coil) eklenemez.");
      return;
    }

    addElementToRung(rungId, type, selectedAddress, position);
    setDraggedTool(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6">
      
      {/* Sol Panel: Araç Kutusu ve Tag Listesi */}
      <div className="w-full lg:w-72 bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-6">
        <div>
          <h2 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
            <Zap className="text-yellow-400 w-5 h-5" /> Araç Kutusu
          </h2>
          <p className="text-xs text-gray-400 mb-4">Elemanı tutup çalışma alanındaki kırmızı (+) alanlara bırakın.</p>
          
          <div className="space-y-3">
            <div 
              draggable 
              onDragStart={(e) => handleDragStart(e, 'NO')}
              className="bg-gray-800 p-3 rounded border border-gray-700 cursor-grab flex items-center gap-3 hover:bg-gray-700 transition-colors"
            >
              <div className="text-blue-400 font-bold tracking-widest text-lg">] [</div>
              <div>
                <div className="text-sm text-white font-medium">Normalde Açık (NO)</div>
                <div className="text-xs text-gray-500">Contact</div>
              </div>
            </div>

            <div 
              draggable 
              onDragStart={(e) => handleDragStart(e, 'NC')}
              className="bg-gray-800 p-3 rounded border border-gray-700 cursor-grab flex items-center gap-3 hover:bg-gray-700 transition-colors"
            >
              <div className="text-blue-400 font-bold tracking-widest text-lg">]/[</div>
              <div>
                <div className="text-sm text-white font-medium">Normalde Kapalı (NC)</div>
                <div className="text-xs text-gray-500">Contact</div>
              </div>
            </div>

            <div 
              draggable 
              onDragStart={(e) => handleDragStart(e, 'COIL')}
              className="bg-gray-800 p-3 rounded border border-gray-700 cursor-grab flex items-center gap-3 hover:bg-gray-700 transition-colors"
            >
              <div className="text-green-400 font-bold tracking-widest text-lg">( )</div>
              <div>
                <div className="text-sm text-white font-medium">Bobin (Coil)</div>
                <div className="text-xs text-gray-500">Output</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-white font-bold mb-3 text-sm">Aktif Adres Seçimi</h3>
          <select 
            className="w-full bg-gray-800 text-white border border-gray-700 rounded p-2 mb-4"
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
          >
            <optgroup label="Girişler (Inputs)">
              {ADDRESS_OPTIONS.inputs.map(a => <option key={a} value={a}>{a}</option>)}
            </optgroup>
            <optgroup label="Çıkışlar (Outputs)">
              {ADDRESS_OPTIONS.outputs.map(a => <option key={a} value={a}>{a}</option>)}
            </optgroup>
            <optgroup label="Hafıza (Memory)">
              {ADDRESS_OPTIONS.memory.map(a => <option key={a} value={a}>{a}</option>)}
            </optgroup>
          </select>

          {isSimulating && (
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mt-6">
              <h3 className="text-white font-bold mb-3 text-sm flex items-center justify-between">
                <span>Fiziksel Girişler (I)</span>
                <span className="text-xs text-green-400 animate-pulse">CANLI</span>
              </h3>
              <div className="flex gap-2 mb-4">
                {ADDRESS_OPTIONS.inputs.map(addr => (
                  <button
                    key={addr}
                    onClick={() => toggleMemoryBit(addr)}
                    className={`flex-1 py-2 rounded text-xs font-bold transition-colors ${
                      memory[addr] ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    {addr}
                  </button>
                ))}
              </div>

              <h3 className="text-white font-bold mb-3 text-sm">Çıkış Durumları (Q)</h3>
              <div className="flex gap-2">
                {ADDRESS_OPTIONS.outputs.map(addr => (
                  <div
                    key={addr}
                    className={`flex-1 py-2 rounded text-xs font-bold text-center border-2 ${
                      memory[addr] ? 'border-green-500 bg-green-500/20 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'border-gray-700 bg-gray-800 text-gray-600'
                    }`}
                  >
                    {addr}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sağ Panel: Ladder Çalışma Alanı */}
      <div className="flex-1 bg-gray-950 border border-gray-800 rounded-xl flex flex-col overflow-hidden relative">
        {/* Üst Bar */}
        <div className="bg-gray-900 border-b border-gray-800 p-4 flex justify-between items-center z-10">
          <h2 className="text-white font-bold">Main [OB1]</h2>
          <div className="flex gap-3">
            <button 
              onClick={addRung}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium flex items-center gap-2 text-sm transition-colors"
            >
              <Plus className="w-4 h-4" /> Rung Ekle
            </button>
            <button 
              onClick={toggleSimulation}
              className={`px-4 py-2 rounded font-bold flex items-center gap-2 text-sm transition-colors ${
                isSimulating ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isSimulating ? <><Square className="w-4 h-4 fill-current" /> STOP PLC</> : <><Play className="w-4 h-4 fill-current" /> RUN PLC</>}
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 p-8 overflow-y-auto relative bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]">
          
          {/* Sol ve Sağ Enerji Rayları */}
          <div className={`absolute top-0 bottom-0 left-12 w-1 shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-colors ${isSimulating ? 'bg-red-500' : 'bg-gray-600'}`} />
          <div className="absolute top-0 bottom-0 right-12 w-1 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

          <div className="space-y-12">
            {rungs.map((rung, index) => (
              <div key={rung.id} className="relative flex items-center h-24 group pl-6 pr-6">
                <div className="absolute left-0 text-xs font-bold text-gray-500 w-6 text-center">
                  {index + 1}
                </div>

                {/* Ana Hat Çizgisi */}
                <div className="absolute left-12 right-12 h-1 bg-gray-700" />
                <div className={`absolute left-12 h-1 transition-colors ${
                  isSimulating && rung.powerReachesOutput ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]' : 'bg-transparent'
                }`} style={{ width: 'calc(100% - 6rem)' }} />

                {/* Girişler (Kontaklar) Alanı */}
                <div className="flex-1 flex items-center pl-8 relative z-10 gap-8 h-full">
                  {rung.inputs.map((input) => (
                    <div key={input.id} className="relative flex flex-col items-center justify-center bg-gray-950 px-2 group/el">
                      <div className="text-[10px] font-bold text-blue-300 mb-1 absolute -top-4">{input.address}</div>
                      <div className={`text-2xl font-black transition-colors ${
                        isSimulating && input.active ? 'text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] drop-shadow-md' : 
                        isSimulating ? 'text-gray-500' : 'text-blue-400'
                      }`}>
                        {input.type === 'NO' ? '] [' : ']/['}
                      </div>
                      {!isSimulating && (
                        <button 
                          onClick={() => removeElement(rung.id, input.id, 'input')}
                          className="absolute -top-6 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover/el:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}

                  {/* Giriş Dropzone */}
                  {!isSimulating && (
                    <div 
                      onDrop={(e) => handleDrop(e, rung.id, 'input')}
                      onDragOver={handleDragOver}
                      className="w-12 h-12 border-2 border-dashed border-red-500/50 rounded-lg flex items-center justify-center bg-red-500/10 text-red-400 opacity-50 hover:opacity-100 transition-opacity ml-4"
                    >
                      <Plus className="w-5 h-5" />
                    </div>
                  )}
                </div>

                {/* Çıkış (Bobin) Alanı */}
                <div className="w-32 flex justify-end pr-8 relative z-10 bg-gray-950 items-center group/out h-full">
                  {rung.output ? (
                    <div className="relative flex flex-col items-center justify-center">
                      <div className="text-[10px] font-bold text-green-300 mb-1 absolute -top-4">{rung.output.address}</div>
                      <div className={`text-2xl font-black transition-colors ${
                        isSimulating && rung.output.active ? 'text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)] drop-shadow-lg' : 
                        isSimulating ? 'text-gray-500' : 'text-green-400'
                      }`}>
                        ( )
                      </div>
                      {!isSimulating && (
                        <button 
                          onClick={() => removeElement(rung.id, rung.output!.id, 'output')}
                          className="absolute -top-6 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover/out:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ) : (
                    /* Çıkış Dropzone */
                    !isSimulating && (
                      <div 
                        onDrop={(e) => handleDrop(e, rung.id, 'output')}
                        onDragOver={handleDragOver}
                        className="w-12 h-12 border-2 border-dashed border-red-500/50 rounded-full flex items-center justify-center bg-red-500/10 text-red-400 opacity-50 hover:opacity-100 transition-opacity"
                      >
                        <Plus className="w-5 h-5" />
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
