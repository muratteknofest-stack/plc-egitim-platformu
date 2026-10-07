"use client";

import React, { useState, useEffect } from 'react';
import { useLadderStore } from '@/store/useLadderStore';
import { Bot, X, MessageSquare, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AITutor() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([
    { role: 'ai', text: 'Merhaba! Ben senin yapay zeka otomasyon eğitmeninim. Devrende bir sorun mu var? Neyi başarmak istediğini söyle, sana ipucu vereyim.' }
  ]);
  const [input, setInput] = useState('');

  const { rungs, memory, isSimulating } = useLadderStore();

  // Basic Rule-based AI evaluation for MVP
  const analyzeLadderLogic = () => {
    let advice = "";

    const hasStart = rungs.some(r => r.inputs.some(i => i.address === 'I0.1' && i.type === 'NO'));
    const hasStop = rungs.some(r => r.inputs.some(i => i.address === 'I0.2' && i.type === 'NC'));
    const hasCoil = rungs.some(r => r.output !== null);

    if (rungs.length === 0 || rungs[0].inputs.length === 0) {
      advice = "Şu an boş bir proje üzerinde çalışıyorsun. Sol taraftan bir NO (Normalde Açık) kontağı sürükleyerek başlayabilirsin.";
    } else if (!hasStart) {
      advice = "Devrende bir Start butonu göremiyorum. Sistemin çalışması için bir I0.1 (NO) kontağı eklemeyi dene.";
    } else if (!hasStop) {
      advice = "Sistemi durdurmak için bir Stop butonuna ihtiyacın olacak. Güvenlik için I0.2 adresli bir NC (Normalde Kapalı) kontağı eklemelisin.";
    } else if (!hasCoil) {
      advice = "Devrenin bir çıkışı yok. Kontaktörü veya motoru çalıştırmak için sağ tarafa bir Bobin (Coil) eklemeyi unutma.";
    } else if (!isSimulating) {
      advice = "Görünüşe göre devreyi kurdun! Üst taraftaki 'RUN PLC' butonuna basarak simülasyonu başlatabilir ve test edebilirsin.";
    } else if (isSimulating && !memory['Q0.0'] && !memory['Q0.1']) {
      advice = "Simülasyon çalışıyor ancak çıkış alamıyoruz. I0.1 girişini manuel olarak tetiklemeyi denedin mi?";
    } else {
      advice = "Harika gidiyorsun! Devren aktif ve çalışıyor. Şimdi bir mühürleme eklemeyi veya sanal fabrikadaki pistonu kontrol etmeyi deneyebilirsin.";
    }

    setMessages(prev => [...prev, { role: 'ai', text: `👀 Ladder devreni inceledim:\n${advice}` }]);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: input }]);
    const userText = input.toLowerCase();
    setInput('');

    setTimeout(() => {
      if (userText.includes('çalışmıyor') || userText.includes('hata') || userText.includes('bak')) {
        analyzeLadderLogic();
      } else if (userText.includes('mühürleme')) {
        setMessages(prev => [...prev, { role: 'ai', text: 'Mühürleme yapmak için Start butonunun (I0.1) altına, çıkış rölesinin (örn: Q0.0) kendi açık kontağını (NO) paralel bağlamalısın. Böylece elini Start butonundan çeksen bile akım Q0.0 üzerinden geçmeye devam eder.' }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: 'Anlıyorum. Kurduğun Ladder devresini kontrol etmemi istersen "Devreme bak" yazman yeterli.' }]);
      }
    }, 1000);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform z-50 border-4 border-gray-900"
      >
        <Bot className="w-8 h-8" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-28 right-6 w-96 h-[500px] bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">AI Eğitmen</h3>
                  <div className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> Çevrimiçi
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-gray-950/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="p-2 flex gap-2 overflow-x-auto no-scrollbar bg-gray-900 border-t border-gray-800">
              <button 
                onClick={analyzeLadderLogic}
                className="whitespace-nowrap px-3 py-1.5 bg-gray-800 border border-gray-700 hover:bg-gray-700 rounded-full text-xs text-gray-300 flex items-center gap-1 transition-colors"
              >
                <Lightbulb className="w-3 h-3 text-yellow-400" /> Devremi İncele
              </button>
              <button 
                onClick={() => setInput("Mühürleme nasıl yapılır?")}
                className="whitespace-nowrap px-3 py-1.5 bg-gray-800 border border-gray-700 hover:bg-gray-700 rounded-full text-xs text-gray-300 transition-colors"
              >
                Mühürleme nedir?
              </button>
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-gray-900 border-t border-gray-800 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Yapay zekaya sor..."
                className="flex-1 bg-gray-950 text-white border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:text-gray-600 text-white p-2 rounded-lg transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
