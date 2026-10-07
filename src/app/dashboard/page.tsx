"use client";

import React from 'react';
import { Award, Zap, CheckCircle, Clock, Terminal, ShieldAlert } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const skillData = [
  { subject: 'ELEKTRİK', A: 85, fullMark: 100 },
  { subject: 'KUMANDA', A: 60, fullMark: 100 },
  { subject: 'PLC', A: 40, fullMark: 100 },
  { subject: 'LADDER', A: 30, fullMark: 100 },
  { subject: 'ARIZA_BULMA', A: 70, fullMark: 100 },
  { subject: 'HMI', A: 20, fullMark: 100 },
];

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12 font-sans selection:bg-orange-500 selection:text-white text-slate-900">
      
      {/* Header - Industrial Style */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-slate-900 pb-6 pt-4">
        <div>
          <div className="text-xs font-bold text-orange-600 tracking-widest mb-2 uppercase flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-600" /> Profil_Sistemi
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Opr. Ali Akın</h1>
          <p className="text-slate-500 mt-2 font-medium">Yetki Seviyesi: TEKNİSYEN (LVL 4)</p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Gorev_Serisi</div>
          <div className="text-3xl font-black text-slate-900 flex items-center justify-end gap-2">
            <Zap className="w-6 h-6 fill-current text-orange-500" /> 14 GÜN
          </div>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border-2 border-slate-900 p-6 relative group hover:bg-slate-50 transition-colors shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <div className="absolute top-0 right-0 w-8 h-8 bg-slate-900 flex items-center justify-center">
             <Terminal className="w-4 h-4 text-white" />
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Birikimli_XP</div>
          <div className="text-4xl font-black text-slate-900 mb-4">2,450</div>
          
          <div className="mt-4">
            <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase">
              <span>Hedef: 3000</span>
              <span>81%</span>
            </div>
            <div className="w-full bg-slate-200 h-3 border border-slate-900 p-0.5">
              <div className="bg-slate-900 h-full" style={{ width: '81%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-900 p-6 relative shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <div className="absolute top-0 right-0 w-8 h-8 bg-slate-900 flex items-center justify-center">
             <CheckCircle className="w-4 h-4 text-white" />
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Proje_Tamamlama</div>
          <div className="text-4xl font-black text-slate-900">12<span className="text-lg text-slate-400">/50</span></div>
        </div>

        <div className="bg-white border-2 border-slate-900 p-6 relative shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <div className="absolute top-0 right-0 w-8 h-8 bg-orange-500 flex items-center justify-center">
             <Clock className="w-4 h-4 text-white" />
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Sistem_Suresi</div>
          <div className="text-4xl font-black text-slate-900">18<span className="text-lg text-slate-400"> SAAT</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Radar Chart */}
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight border-b-2 border-slate-900 pb-2 mb-6">Yetenek_Matrisi</h2>
          <div className="bg-slate-900 border-2 border-slate-900 p-6 h-[400px] shadow-[8px_8px_0px_0px_rgba(249,115,22,1)] relative">
            <div className="absolute top-4 left-4 text-xs font-mono text-slate-500">DIAGNOSTIC_RADAR_V1</div>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 10, fontFamily: 'monospace', fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Tooltip wrapperStyle={{ backgroundColor: '#0F172A', border: '1px solid #334155', borderRadius: '0' }} itemStyle={{ color: '#F97316' }} />
                <Radar name="Skor" dataKey="A" stroke="#F97316" strokeWidth={2} fill="#F97316" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Tasks */}
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight border-b-2 border-slate-900 pb-2 mb-6 flex items-center justify-between">
            <span>Is_Emirleri (Gunluk)</span>
            <span className="bg-red-500 text-white text-xs px-2 py-1 flex items-center gap-1"><ShieldAlert className="w-3 h-3"/> GEREKLİ</span>
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white border-2 border-slate-900 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:bg-slate-50 transition-colors">
              <div>
                <h3 className="font-bold text-slate-900 uppercase">SYS-01: Start/Stop Devresi Kur</h3>
                <p className="text-sm text-slate-500 mt-1 font-medium">Laboratuvarda hatasız bir mühürleme devresi kur.</p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-sm font-black text-orange-600">+50 XP</span>
                <button className="bg-slate-900 text-white px-6 py-2 text-sm font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors border border-slate-900">
                  Execute
                </button>
              </div>
            </div>

            <div className="bg-slate-100 border-2 border-slate-300 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 opacity-70">
              <div>
                <h3 className="font-bold text-slate-500 uppercase line-through">EDU-02: Kontaktör Prensibi</h3>
                <p className="text-sm text-slate-400 mt-1 font-medium">2. modül eğitimini tamamla.</p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-sm font-black text-slate-400">DONE</span>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-green-700">
                   <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-900 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:bg-slate-50 transition-colors">
              <div>
                <h3 className="font-bold text-slate-900 uppercase">TRB-03: Zaman Rölesi Arızası Çöz</h3>
                <p className="text-sm text-slate-500 mt-1 font-medium">Sanal fabrikada arızalı motorun sorununu bul.</p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-sm font-black text-orange-600">+100 XP</span>
                <button className="bg-slate-900 text-white px-6 py-2 text-sm font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors border border-slate-900">
                  Execute
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
