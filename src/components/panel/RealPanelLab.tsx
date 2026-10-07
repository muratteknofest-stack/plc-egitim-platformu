"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Zap, Trash2, Power } from 'lucide-react';

type ComponentType = 'FUSE' | 'CONTACTOR' | 'START_BTN' | 'STOP_BTN';

interface Terminal {
  id: string;
  x: number;
  y: number;
}

interface ComponentInstance {
  id: string;
  type: ComponentType;
  x: number;
  y: number;
}

interface Wire {
  id: string;
  startCompId: string;
  startTermId: string;
  endCompId: string;
  endTermId: string;
  color: string;
}

// Terminal pozisyonları (Componentin sol-üst köşesine göre bağıl X, Y)
const COMPONENT_DEFS: Record<ComponentType, { width: number, height: number, label: string, terminals: Terminal[] }> = {
  FUSE: {
    width: 60, height: 100, label: "F1 (Sigorta)",
    terminals: [
      { id: 'L_IN', x: 30, y: 10 },
      { id: 'L_OUT', x: 30, y: 90 }
    ]
  },
  CONTACTOR: {
    width: 80, height: 120, label: "K1 (Kontaktör)",
    terminals: [
      { id: 'A1', x: 20, y: 15 },
      { id: 'A2', x: 60, y: 15 },
      { id: 'NO_13', x: 20, y: 105 },
      { id: 'NO_14', x: 60, y: 105 }
    ]
  },
  START_BTN: {
    width: 70, height: 70, label: "Start (NO)",
    terminals: [
      { id: '3', x: 15, y: 35 },
      { id: '4', x: 55, y: 35 }
    ]
  },
  STOP_BTN: {
    width: 70, height: 70, label: "Stop (NC)",
    terminals: [
      { id: '1', x: 15, y: 35 },
      { id: '2', x: 55, y: 35 }
    ]
  }
};

export default function RealPanelLab() {
  const [components, setComponents] = useState<ComponentInstance[]>([]);
  const [wires, setWires] = useState<Wire[]>([]);
  const [wireColor, setWireColor] = useState<string>('#EF4444'); // Kırmızı (Faz)
  
  // Kablo çekme state'i
  const [wiringStart, setWiringStart] = useState<{ compId: string, termId: string, x: number, y: number } | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent, type: ComponentType) => {
    e.dataTransfer.setData('type', type);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('type') as ComponentType;
    if (!type || !panelRef.current) return;

    const rect = panelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - (COMPONENT_DEFS[type].width / 2);
    const y = e.clientY - rect.top - (COMPONENT_DEFS[type].height / 2);

    setComponents([...components, { id: `comp_${Date.now()}`, type, x, y }]);
  };

  const handleTerminalClick = (e: React.MouseEvent, compId: string, termId: string, compX: number, compY: number, termX: number, termY: number) => {
    e.stopPropagation();
    
    // Gerçek panel üzerindeki mutlak konumu
    const absX = compX + termX;
    const absY = compY + termY;

    if (!wiringStart) {
      // Kablo çekmeye başla
      setWiringStart({ compId, termId, x: absX, y: absY });
    } else {
      // Aynı terminale tıklandıysa iptal et
      if (wiringStart.compId === compId && wiringStart.termId === termId) {
        setWiringStart(null);
        return;
      }
      
      // Kabloyu tamamla
      setWires([...wires, {
        id: `wire_${Date.now()}`,
        startCompId: wiringStart.compId,
        startTermId: wiringStart.termId,
        endCompId: compId,
        endTermId: termId,
        color: wireColor
      }]);
      setWiringStart(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (wiringStart && panelRef.current) {
      const rect = panelRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  // Render Component (Gerçekçi Gölgeler ve Gradients)
  const renderComponent = (comp: ComponentInstance) => {
    const def = COMPONENT_DEFS[comp.type];
    
    return (
      <motion.div
        key={comp.id}
        drag
        dragMomentum={false}
        onDrag={(event, info) => {
          // Komponent sürüklendiğinde pozisyonunu güncelle ki kablolar da kopsun/hareket etsin
          const newComps = components.map(c => 
            c.id === comp.id ? { ...c, x: c.x + info.delta.x, y: c.y + info.delta.y } : c
          );
          setComponents(newComps);
        }}
        className="absolute cursor-move shadow-2xl"
        style={{ left: comp.x, top: comp.y, width: def.width, height: def.height, zIndex: 10 }}
      >
        {/* Render Base */}
        <div className="w-full h-full relative rounded border border-gray-600 bg-gradient-to-b from-gray-700 to-gray-900 shadow-[inset_0_1px_3px_rgba(255,255,255,0.3),_5px_5px_15px_rgba(0,0,0,0.8)]">
          <div className="absolute top-1 left-0 right-0 text-center text-[10px] font-bold text-gray-300 pointer-events-none">{def.label}</div>
          
          {/* Özel Tasarımlar */}
          {comp.type === 'START_BTN' && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-b from-green-400 to-green-600 border-2 border-green-800 shadow-[inset_0_2px_4px_rgba(255,255,255,0.5)]" />
          )}
          {comp.type === 'STOP_BTN' && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-b from-red-400 to-red-600 border-2 border-red-800 shadow-[inset_0_2px_4px_rgba(255,255,255,0.5)]" />
          )}
          {comp.type === 'CONTACTOR' && (
            <div className="absolute top-[30%] bottom-[30%] left-2 right-2 bg-gradient-to-b from-blue-800 to-blue-950 border border-blue-900 rounded flex items-center justify-center">
              <span className="text-blue-300 text-xs font-bold">24V DC</span>
            </div>
          )}

          {/* Terminaller (Vida Kafaları) */}
          {def.terminals.map(term => (
            <div 
              key={term.id}
              className="absolute w-4 h-4 rounded-full bg-gradient-to-b from-gray-300 to-gray-500 border border-gray-600 shadow-sm flex items-center justify-center hover:scale-125 transition-transform"
              style={{ left: term.x - 8, top: term.y - 8, cursor: 'crosshair' }}
              onPointerDown={(e) => handleTerminalClick(e, comp.id, term.id, comp.x, comp.y, term.x, term.y)}
            >
              <div className="w-2 h-0.5 bg-gray-700 rotate-45" />
              <div className="absolute -top-3 text-[8px] font-bold text-gray-400 pointer-events-none">{term.id}</div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  // SVG Bezier Eğrisi Çizimi
  const getWirePath = (startX: number, startY: number, endX: number, endY: number) => {
    // Gerçekçi sarkan kablo efekti (Bezier Curve)
    const curve = Math.abs(startX - endX) * 0.3 + 50;
    return `M ${startX} ${startY} C ${startX} ${startY + curve}, ${endX} ${endY + curve}, ${endX} ${endY}`;
  };

  return (
    <div className="h-full flex flex-col">
      <header className="mb-4 shrink-0 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings className="text-blue-400" />
            Gerçek Pano Kablolama Simülasyonu
          </h1>
          <p className="text-sm text-gray-400 mt-1">Sol menüden elemanları panoya sürükleyin. Vidalara (terminallere) tıklayarak aralarında kablo çekin.</p>
        </div>
        <div className="flex items-center gap-4 bg-gray-900 p-2 rounded-lg border border-gray-700">
          <span className="text-xs text-gray-400">Kablo Rengi:</span>
          <button onClick={() => setWireColor('#EF4444')} className={`w-6 h-6 rounded-full bg-red-500 ${wireColor === '#EF4444' ? 'ring-2 ring-white' : ''}`} />
          <button onClick={() => setWireColor('#3B82F6')} className={`w-6 h-6 rounded-full bg-blue-500 ${wireColor === '#3B82F6' ? 'ring-2 ring-white' : ''}`} />
          <button onClick={() => setWireColor('#10B981')} className={`w-6 h-6 rounded-full bg-green-500 ${wireColor === '#10B981' ? 'ring-2 ring-white' : ''}`} />
          <button onClick={() => setWireColor('#111827')} className={`w-6 h-6 rounded-full bg-gray-900 border border-gray-600 ${wireColor === '#111827' ? 'ring-2 ring-white' : ''}`} />
          
          <button 
            onClick={() => { setWires([]); setComponents([]); setWiringStart(null); }}
            className="ml-4 flex items-center gap-1 text-xs bg-red-900/50 text-red-400 px-3 py-1.5 rounded hover:bg-red-900 transition-colors"
          >
            <Trash2 className="w-3 h-3" /> Temizle
          </button>
        </div>
      </header>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Sol Menü: Eleman Kutusu */}
        <div className="w-64 bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-4 overflow-y-auto">
          <h3 className="text-white font-bold border-b border-gray-800 pb-2">Ray Elemanları</h3>
          
          <div 
            draggable 
            onDragStart={(e) => handleDragStart(e, 'FUSE')}
            className="p-3 bg-gray-800 border border-gray-700 rounded-lg cursor-grab hover:border-blue-500 transition-colors flex items-center gap-3"
          >
            <div className="w-6 h-10 bg-gray-300 rounded border border-gray-400 flex items-center justify-center">
              <div className="w-2 h-4 bg-green-500 rounded-sm" />
            </div>
            <div className="text-sm font-medium text-gray-300">Kumanda Sigortası</div>
          </div>

          <div 
            draggable 
            onDragStart={(e) => handleDragStart(e, 'CONTACTOR')}
            className="p-3 bg-gray-800 border border-gray-700 rounded-lg cursor-grab hover:border-blue-500 transition-colors flex items-center gap-3"
          >
            <div className="w-8 h-10 bg-gray-700 rounded border border-gray-600 flex items-center justify-center">
               <div className="w-6 h-6 rounded-full border-2 border-gray-500" />
            </div>
            <div className="text-sm font-medium text-gray-300">Kontaktör (24V)</div>
          </div>

          <h3 className="text-white font-bold border-b border-gray-800 pb-2 mt-4">Kapak Elemanları</h3>

          <div 
            draggable 
            onDragStart={(e) => handleDragStart(e, 'START_BTN')}
            className="p-3 bg-gray-800 border border-gray-700 rounded-lg cursor-grab hover:border-blue-500 transition-colors flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-green-700" />
            <div className="text-sm font-medium text-gray-300">Start Butonu (NO)</div>
          </div>

          <div 
            draggable 
            onDragStart={(e) => handleDragStart(e, 'STOP_BTN')}
            className="p-3 bg-gray-800 border border-gray-700 rounded-lg cursor-grab hover:border-blue-500 transition-colors flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-red-700" />
            <div className="text-sm font-medium text-gray-300">Stop Butonu (NC)</div>
          </div>
        </div>

        {/* Gerçek Pano Çalışma Alanı (Montaj Sacı) */}
        <div 
          ref={panelRef}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onMouseMove={handleMouseMove}
          className="flex-1 rounded-xl relative overflow-hidden shadow-inner cursor-crosshair"
          style={{
            backgroundColor: '#d1d5db',
            backgroundImage: `
              linear-gradient(90deg, transparent 95%, #9ca3af 95%),
              linear-gradient(transparent 95%, #9ca3af 95%)
            `,
            backgroundSize: '40px 40px',
            boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)'
          }}
        >
          {/* DIN Rayları (Görsel) */}
          <div className="absolute top-[20%] left-10 right-10 h-8 bg-gradient-to-b from-gray-400 to-gray-500 border-y-2 border-gray-400 shadow-md" />
          <div className="absolute top-[60%] left-10 right-10 h-8 bg-gradient-to-b from-gray-400 to-gray-500 border-y-2 border-gray-400 shadow-md" />

          {/* SVG Katmanı (Kablolar) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
            <defs>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="5" stdDeviation="3" floodOpacity="0.5" />
              </filter>
            </defs>

            {/* Tamamlanmış Kablolar */}
            {wires.map(wire => {
              const startComp = components.find(c => c.id === wire.startCompId);
              const endComp = components.find(c => c.id === wire.endCompId);
              if (!startComp || !endComp) return null;

              const startTerm = COMPONENT_DEFS[startComp.type].terminals.find(t => t.id === wire.startTermId);
              const endTerm = COMPONENT_DEFS[endComp.type].terminals.find(t => t.id === wire.endTermId);
              if (!startTerm || !endTerm) return null;

              const sx = startComp.x + startTerm.x;
              const sy = startComp.y + startTerm.y;
              const ex = endComp.x + endTerm.x;
              const ey = endComp.y + endTerm.y;

              return (
                <path 
                  key={wire.id}
                  d={getWirePath(sx, sy, ex, ey)}
                  fill="none"
                  stroke={wire.color}
                  strokeWidth="6"
                  strokeLinecap="round"
                  filter="url(#shadow)"
                  className="transition-all"
                />
              );
            })}

            {/* Çizilmekte Olan Kablo */}
            {wiringStart && (
              <path 
                d={getWirePath(wiringStart.x, wiringStart.y, mousePos.x, mousePos.y)}
                fill="none"
                stroke={wireColor}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="10,10"
                className="opacity-70 animate-[dash_1s_linear_infinite]"
              />
            )}
          </svg>

          {/* Komponentler */}
          {components.map(renderComponent)}
        </div>
      </div>
    </div>
  );
}
