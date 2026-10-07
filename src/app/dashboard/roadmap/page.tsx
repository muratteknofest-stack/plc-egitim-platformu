import React from 'react';
import { Check, Lock, Play, Star } from 'lucide-react';

const roadmapNodes = [
  { id: 1, title: 'Elektrik Temelleri', status: 'completed', stars: 3 },
  { id: 2, title: 'Ohm Kanunu ve Güç', status: 'completed', stars: 2 },
  { id: 3, title: 'Kumanda Elemanları', status: 'completed', stars: 3 },
  { id: 4, title: 'Start/Stop Motor Devresi', status: 'active', stars: 0 },
  { id: 5, title: 'Zaman Röleleri (Timer)', status: 'locked', stars: 0 },
  { id: 6, title: 'Yıldız - Üçgen Yol Verme', status: 'locked', stars: 0 },
  { id: 7, title: 'PLC Temelleri', status: 'locked', stars: 0 },
  { id: 8, title: 'Ladder Programlamaya Giriş', status: 'locked', stars: 0 },
];

export default function RoadmapPage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Eğitim Yol Haritası</h1>
        <p className="text-gray-400">Adım adım ilerleyerek otomasyon uzmanı olun. Bir konuyu tam olarak anlamadan diğerine geçmeyin.</p>
      </header>

      <div className="relative flex flex-col items-center">
        {/* Bağlantı Çizgisi */}
        <div className="absolute top-0 bottom-0 w-2 bg-gray-800 rounded-full z-0 left-1/2 -translate-x-1/2" />
        
        {/* Tamamlanan Kısım İçin Mavi Çizgi */}
        <div 
          className="absolute top-0 w-2 bg-blue-500 rounded-full z-0 left-1/2 -translate-x-1/2 transition-all duration-1000" 
          style={{ height: '35%' }}
        />

        {roadmapNodes.map((node, index) => (
          <div key={node.id} className={`relative z-10 w-full flex items-center justify-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
            
            {/* Boş alan (Dengeleyici) */}
            <div className="w-1/2" />

            {/* Düğüm (Node) */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center shadow-xl transition-transform hover:scale-110 cursor-pointer ${
                node.status === 'completed' ? 'bg-blue-600 border-blue-400' :
                node.status === 'active' ? 'bg-orange-500 border-yellow-300 shadow-[0_0_20px_rgba(249,115,22,0.6)] animate-pulse' :
                'bg-gray-800 border-gray-600'
              }`}>
                {node.status === 'completed' && <Check className="w-10 h-10 text-white" />}
                {node.status === 'active' && <Play className="w-10 h-10 text-white ml-1" />}
                {node.status === 'locked' && <Lock className="w-8 h-8 text-gray-500" />}
              </div>
            </div>

            {/* İçerik Kartı */}
            <div className={`w-1/2 flex ${index % 2 === 0 ? 'justify-start pl-16' : 'justify-end pr-16'}`}>
              <div className={`p-4 rounded-xl border ${
                node.status === 'active' ? 'bg-gray-800 border-orange-500/50' : 'bg-gray-800/50 border-gray-700'
              }`}>
                <h3 className={`font-bold text-lg mb-2 ${node.status === 'locked' ? 'text-gray-500' : 'text-white'}`}>{node.title}</h3>
                
                {/* Yıldızlar */}
                <div className="flex gap-1">
                  {[1, 2, 3].map(star => (
                    <Star 
                      key={star} 
                      className={`w-4 h-4 ${star <= node.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
