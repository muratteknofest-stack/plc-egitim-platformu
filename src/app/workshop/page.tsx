"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import Sidebar from '@/components/layout/Sidebar';

const Workshop3D = dynamic(() => import('@/components/workshop/Workshop3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[600px] flex flex-col items-center justify-center bg-gray-950 text-gray-400 border border-gray-800 rounded-xl">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p>3D Atölye Yükleniyor (SSR Devre Dışı)...</p>
    </div>
  )
});

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
