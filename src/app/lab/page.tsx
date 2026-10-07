import React from 'react';
import MotorControlLab from '@/components/simulation/MotorControlLab';
import Sidebar from '@/components/layout/Sidebar';

export default function LabPage() {
  return (
    <div className="flex min-h-screen bg-gray-950 text-slate-200">
      <Sidebar />
      <main className="flex-1 ml-64 overflow-y-auto">
        <MotorControlLab />
      </main>
    </div>
  );
}
