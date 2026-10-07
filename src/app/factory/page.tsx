import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import LadderEditor from '@/components/ladder/LadderEditor';
import VirtualFactory from '@/components/factory/VirtualFactory';

export default function FactoryPage() {
  return (
    <div className="flex h-screen bg-gray-950 text-slate-200 overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-64 p-6 overflow-hidden flex flex-col h-full gap-6">
        <header className="shrink-0 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white">Sanal Fabrika & PLC Kontrolü</h1>
            <p className="text-gray-400 mt-2">Yazdığınız Ladder mantığı ile konveyör ve ayırma pistonunu kontrol edin.</p>
          </div>
          <div className="bg-blue-900/30 border border-blue-800 p-3 rounded-lg text-sm max-w-sm">
            <p className="text-blue-200"><strong className="text-blue-400">Görev:</strong> I0.1'e basınca Konveyörü (Q0.0) çalıştırın. Sensör (I0.0) kutuyu algıladığında Pistonu (Q0.1) iterek kutuyu ayırın.</p>
          </div>
        </header>
        
        <div className="flex-1 overflow-hidden min-h-0 grid grid-rows-2 gap-6">
          {/* Üst Kısım: Fabrika Görseli */}
          <div className="h-full overflow-hidden">
             <VirtualFactory />
          </div>

          {/* Alt Kısım: Ladder Editörü */}
          <div className="h-full overflow-hidden border-t border-gray-800 pt-6">
             <LadderEditor />
          </div>
        </div>
      </main>
    </div>
  );
}
