import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import LadderEditor from '@/components/ladder/LadderEditor';

export default function LadderPage() {
  return (
    <div className="flex h-screen bg-gray-950 text-slate-200 overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-64 p-6 overflow-hidden flex flex-col h-full">
        <header className="mb-6 shrink-0">
          <h1 className="text-3xl font-bold text-white">PLC Ladder Simülatörü</h1>
          <p className="text-gray-400 mt-2">Sürükle bırak yöntemiyle PLC programı yazın, gerçek zamanlı simülasyonla test edin.</p>
        </header>
        
        <div className="flex-1 overflow-hidden min-h-0">
          <LadderEditor />
        </div>
      </main>
    </div>
  );
}
