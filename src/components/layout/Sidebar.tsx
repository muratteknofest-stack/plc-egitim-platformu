import React from 'react';
import Link from 'next/link';
import { Home, Compass, Activity, BookOpen, Settings, LayoutDashboard, Award, Zap, Wrench } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 border-r-4 border-slate-950 h-screen flex flex-col fixed top-0 left-0 font-sans">
      <div className="p-6 flex items-center gap-3 border-b-2 border-slate-800 bg-slate-950">
        <Zap className="text-orange-500 w-8 h-8" />
        <span className="text-2xl font-black text-white tracking-tighter uppercase">PLC_<span className="text-orange-500">Master</span></span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="px-4 space-y-1">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 pl-3">Sistem_Menusu</div>
          
          <Link href="/dashboard" className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 p-3 transition-colors border-l-2 border-transparent hover:border-orange-500">
            <LayoutDashboard className="w-5 h-5 text-slate-400" />
            <span className="font-bold text-sm tracking-wide uppercase">Öğrenci Paneli</span>
          </Link>
          <Link href="/dashboard/curriculum" className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 p-3 transition-colors border-l-2 border-transparent hover:border-orange-500">
            <BookOpen className="w-5 h-5 text-slate-400" />
            <span className="font-bold text-sm tracking-wide uppercase">Eğitim Programı</span>
          </Link>
          <Link href="/dashboard/roadmap" className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 p-3 transition-colors border-l-2 border-transparent hover:border-orange-500">
            <Compass className="w-5 h-5 text-slate-400" />
            <span className="font-bold text-sm tracking-wide uppercase">Eğitim Haritası</span>
          </Link>
          <Link href="/dashboard/panel" className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 p-3 transition-colors border-l-2 border-transparent hover:border-orange-500">
            <Settings className="w-5 h-5 text-slate-400" />
            <span className="font-bold text-sm tracking-wide uppercase">Gerçek Pano</span>
          </Link>
          <Link href="/lab" className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 p-3 transition-colors border-l-2 border-transparent hover:border-orange-500">
            <Activity className="w-5 h-5 text-slate-400" />
            <span className="font-bold text-sm tracking-wide uppercase">İnteraktif Lab</span>
          </Link>
          <Link href="/workshop" className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 p-3 transition-colors border-l-2 border-transparent hover:border-orange-500">
            <BookOpen className="w-5 h-5 text-slate-400" />
            <span className="font-bold text-sm tracking-wide uppercase">3D Atölye</span>
          </Link>
          <Link href="/ladder" className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 p-3 transition-colors border-l-2 border-transparent hover:border-orange-500">
            <Zap className="w-5 h-5 text-slate-400" />
            <span className="font-bold text-sm tracking-wide uppercase">Ladder Sim.</span>
          </Link>
          <Link href="/factory" className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 p-3 transition-colors border-l-2 border-transparent hover:border-orange-500">
            <Activity className="w-5 h-5 text-slate-400" />
            <span className="font-bold text-sm tracking-wide uppercase">Sanal Fabrika</span>
          </Link>
          <Link href="/dashboard/troubleshooting" className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 p-3 transition-colors border-l-2 border-transparent hover:border-orange-500">
            <Wrench className="w-5 h-5 text-slate-400" />
            <span className="font-bold text-sm tracking-wide uppercase">Arıza Bulma</span>
          </Link>
          <Link href="/dashboard/analog" className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 p-3 transition-colors border-l-2 border-transparent hover:border-orange-500">
            <Activity className="w-5 h-5 text-slate-400" />
            <span className="font-bold text-sm tracking-wide uppercase">Analog Sinyal</span>
          </Link>
        </nav>
      </div>

      <div className="p-4 border-t-2 border-slate-800 bg-slate-950">
        <div className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800">
          <div className="w-10 h-10 bg-orange-600 flex items-center justify-center text-white font-black text-lg">
            AA
          </div>
          <div>
            <div className="text-sm font-black text-white uppercase">Ali Akın</div>
            <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Teknisyen_LVL4</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
