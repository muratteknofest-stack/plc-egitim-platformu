import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Workshop3D from '@/components/workshop/Workshop3D';

export default function WorkshopPage() {
  return (
    <div className="flex h-screen bg-gray-950 text-slate-200 overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-64 p-6 overflow-hidden flex flex-col h-full gap-6">
        <header className="shrink-0 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white">Uygulama Atölyesi (3D / 4K)</h1>
            <p className="text-gray-400 mt-2">Elektrik kumanda devrelerini fiziksel, üç boyutlu ortamda ve yüksek kalitede simüle edin.</p>
          </div>
        </header>
        
        <div className="flex-1 overflow-hidden min-h-0">
          <Workshop3D />
        </div>
      </main>
    </div>
  );
}
