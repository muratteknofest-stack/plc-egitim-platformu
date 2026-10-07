import Link from 'next/link';
import { ChevronRight, ArrowUpRight, Activity } from 'lucide-react';
import MotorControlLab from '@/components/simulation/MotorControlLab';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4F4F5] text-slate-900 font-sans selection:bg-orange-500 selection:text-white">
      {/* Navbar - Minimal & Industrial */}
      <nav className="flex justify-between items-center p-6 lg:px-12 border-b border-slate-300">
        <div className="flex items-center gap-2 font-black text-2xl tracking-tighter uppercase">
          <div className="w-4 h-4 bg-orange-600 rounded-sm"></div>
          PLC_MASTER
        </div>
        <div className="flex items-center gap-6 text-sm font-semibold uppercase tracking-widest">
          <Link href="#lab" className="hover:text-orange-600 transition-colors">Lab</Link>
          <Link href="#curriculum" className="hover:text-orange-600 transition-colors">Program</Link>
          <Link href="/dashboard" className="bg-slate-900 text-white px-6 py-3 hover:bg-orange-600 transition-colors flex items-center gap-2">
            PANELE GİRİŞ <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero Section - Brutalist / Clean */}
      <div className="relative pt-24 pb-32 px-6 lg:px-12 border-b border-slate-300 overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest mb-8 border border-slate-300">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Sistem Aktif - V2.0
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 text-slate-900 uppercase">
              Teori <br/>
              <span className="text-slate-400 font-light">Değil,</span><br/>
              <span className="text-orange-600">Pratik.</span>
            </h1>
            
            <p className="text-lg text-slate-600 max-w-lg mb-10 font-medium leading-relaxed">
              Geleneksel video eğitimlerini unutun. Elektrik kumanda ve PLC programlamayı, gerçek bir donanım üzerinde çalışıyormuş gibi interaktif olarak simüle edin. Hata yapın, öğrenin, uzmanlaşın.
            </p>

            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="bg-orange-600 text-white px-8 py-5 text-sm font-bold uppercase tracking-widest hover:bg-slate-900 transition-all flex items-center gap-2 group">
                Laboratuvarı Başlat
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Graphic - Technical Data Style */}
          <div className="relative h-[500px] border border-slate-300 bg-white p-6 shadow-[20px_20px_0px_0px_rgba(15,23,42,0.1)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-orange-600"></div>
            <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-6">
              <div className="font-mono text-xs text-slate-500">DIAGNOSTICS_VIEW</div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            
            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200">
                <span className="text-slate-500">PLC_STATUS</span>
                <span className="text-green-600 font-bold">RUN</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200">
                <span className="text-slate-500">SCAN_CYCLE</span>
                <span className="text-slate-900 font-bold">12 ms</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200">
                <span className="text-slate-500">I/O_MODULES</span>
                <span className="text-slate-900 font-bold">CONNECTED</span>
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-200">
                <div className="text-xs text-slate-400 mb-2">LIVE_TELEMETRY</div>
                <div className="h-24 flex items-end gap-1">
                  {[40, 70, 45, 90, 65, 85, 30, 50, 75, 100].map((h, i) => (
                    <div key={i} className="w-full bg-slate-800 transition-all hover:bg-orange-500" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Lab Section */}
      <div id="lab" className="bg-slate-900 text-slate-200 py-32 border-t-[16px] border-orange-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <h2 className="text-4xl font-black text-white uppercase tracking-tight mb-4">Sistemi Deneyimleyin</h2>
            <p className="text-slate-400 max-w-2xl text-lg">Aşağıdaki panel, eğitim platformunun canlı bir demosudur. Sigortayı açın, Start butonuna basın ve devrenin çalışma mantığını inceleyin.</p>
          </div>
          
          {/* Siyah temanın içine oturtmak için padding'i siliyoruz çünkü içeride kendi wrapper'ı var */}
          <div className="border border-slate-700 bg-slate-950 p-2 lg:p-8">
             <MotorControlLab />
          </div>
        </div>
      </div>
    </main>
  );
}
