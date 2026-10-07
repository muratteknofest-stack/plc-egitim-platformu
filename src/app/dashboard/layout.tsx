import React from 'react';
import Sidebar from '@/components/layout/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F4F4F5] text-slate-900 font-sans">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
