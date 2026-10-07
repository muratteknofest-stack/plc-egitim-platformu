import React from 'react';
import { BookOpen, Clock, CheckCircle, PlayCircle, Monitor, ShieldAlert } from 'lucide-react';

const curriculum = [
  {
    week: 1,
    title: "Elektrik ve Otomasyon Temelleri",
    hours: [
      { id: 1, title: "Elektrik Nedir? Gerilim, Akım, Direnç", details: "Ohm Kanunu animasyonlu anlatım, su borusu analojisi.", type: "theory" },
      { id: 2, title: "AC ve DC Akım Farkları, Güç Hesaplama", details: "Pano üzerinde güç kaynağı seçimi ve şebeke gerilimi incelemesi.", type: "theory" },
      { id: 3, title: "Elektriksel Ölçüm ve İş Güvenliği", details: "Sanal multimetre ile voltaj/direnç ölçümü ve LOTO (Lockout-Tagout) prosedürleri.", type: "lab" },
    ]
  },
  {
    week: 2,
    title: "Elektrik Kumanda Elemanları",
    hours: [
      { id: 4, title: "Butonlar ve Sinyal Lambaları", details: "NO (Normalde Açık) ve NC (Normalde Kapalı) kontak mantığı, 3D buton incelemesi.", type: "theory" },
      { id: 5, title: "Röle ve Kontaktörler", details: "Bobin enerjilenmesi, manyetik alan oluşumu ve güç kontaklarının kapanması simülasyonu.", type: "animation" },
      { id: 6, title: "Koruma Elemanları", details: "Otomatik sigorta (MCB), Motor Koruma Şalteri ve Termik Röle arıza testleri.", type: "lab" },
    ]
  },
  {
    week: 3,
    title: "Temel Kumanda Devreleri",
    hours: [
      { id: 7, title: "Kesik (Jog) Çalıştırma", details: "Butona basıldığı sürece çalışan motor devresi kurulumu.", type: "lab" },
      { id: 8, title: "Mühürleme Devresi Mantığı", details: "Kontaktör yardımcı kontağı (13-14) üzerinden sürekli çalışma devresi kablolaması.", type: "lab" },
      { id: 9, title: "Elektriksel ve Mekanik Kilitleme", details: "Asenkron motorlarda İleri-Geri (Sağ-Sol) çalıştırma sırasında kısa devreyi önleme.", type: "lab" },
    ]
  },
  {
    week: 4,
    title: "Gelişmiş Kumanda ve Zamanlama",
    hours: [
      { id: 10, title: "Zaman Rölesi Kullanımı", details: "Düz (On-Delay) ve Ters (Off-Delay) zamanlı rölelerin karşılaştırmalı analizi.", type: "theory" },
      { id: 11, title: "Yıldız-Üçgen Yol Verme", details: "Kalkış akımını düşürme mantığı ve otomatik yıldız-üçgen pano montajı.", type: "lab" },
      { id: 12, title: "Sıralı Motor Çalıştırma", details: "Bant ve kırıcı motorların senkron çalışması, pompa otomasyonu projesi.", type: "project" },
    ]
  },
  {
    week: 5,
    title: "Algılayıcılar (Sensörler)",
    hours: [
      { id: 13, title: "Limit Switch ve Proximity Sensörler", details: "Endüktif (Metal algılayan) ve Kapasitif sensörlerin 3D sanal atölyede testi.", type: "lab" },
      { id: 14, title: "Fotosel ve Enkoder Okuma", details: "Konveyör bandında ürün sayma ve mil dönüş hızını hesaplama.", type: "lab" },
      { id: 15, title: "Analog Sensörler", details: "0-10V ve 4-20mA sinyal yapısı, PT100 Sıcaklık sensörü simülasyonu.", type: "theory" },
    ]
  },
  {
    week: 6,
    title: "PLC'ye Giriş ve Donanım",
    hours: [
      { id: 16, title: "PLC Mimarisi ve CPU", details: "PLC nedir? Siemens, Schneider, Delta donanım yapıları ve modül montajı.", type: "theory" },
      { id: 17, title: "Dijital/Analog I/O Birimleri", details: "Sensörlerin PLC girişine, kontaktörlerin PLC çıkışına bağlanması (Sink/Source mantığı).", type: "lab" },
      { id: 18, title: "PLC Tarama Döngüsü (Scan Cycle)", details: "Giriş okuma, program işleme ve çıkış yazma aşamalarının ağır çekim animasyonu.", type: "animation" },
    ]
  },
  {
    week: 7,
    title: "PLC Ladder Programlama",
    hours: [
      { id: 19, title: "Ladder Diagram (Merdiven Mantığı)", details: "Sürükle bırak editör ile NO/NC kontak ve Bobin atamaları (I0.0, Q0.0).", type: "lab" },
      { id: 20, title: "Zamanlayıcı (Timer) ve Sayıcı (Counter)", details: "TON, TOF, CTU, CTD bloklarının kullanımı ve otopark araç sayma uygulaması.", type: "lab" },
      { id: 21, title: "Karşılaştırma ve Matematik Blokları", "details": "Sıcaklık değerini okuyup (CMP) set değeriyle karşılaştırarak ısıtıcı çalıştırma.", type: "theory" },
    ]
  },
  {
    week: 8,
    title: "Endüstriyel Otomasyon Projeleri (Sanal Fabrika)",
    hours: [
      { id: 22, title: "Trafik Lambası ve Tank Dolum Otomasyonu", details: "Zamanlayıcılarla karmaşık senaryolar üretme.", type: "project" },
      { id: 23, title: "Konveyörlü Ürün Ayırma (Sorting)", details: "Fotosel ve Piston entegrasyonuyla sanal fabrikada hatalı ürünleri ayırma görevi.", type: "project" },
      { id: 24, title: "HMI Tasarımı ve SCADA'ya Giriş", details: "Dokunmatik operatör paneli arayüzü tasarlama ve PLC Tag'lerini bağlama.", type: "project" },
    ]
  }
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'theory': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    case 'lab': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
    case 'animation': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
    case 'project': return 'bg-green-500/20 text-green-400 border-green-500/50';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'theory': return <BookOpen className="w-4 h-4" />;
    case 'lab': return <Monitor className="w-4 h-4" />;
    case 'animation': return <PlayCircle className="w-4 h-4" />;
    case 'project': return <CheckCircle className="w-4 h-4" />;
    default: return null;
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'theory': return 'Teori';
    case 'lab': return 'İnteraktif Lab';
    case 'animation': return 'Animasyon';
    case 'project': return 'Proje Görevi';
    default: return type;
  }
};

export default function CurriculumPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-4">Detaylı Eğitim Programı (Syllabus)</h1>
        <p className="text-lg text-gray-400 max-w-3xl">
          Sıfırdan ileri seviyeye 8 haftalık yapılandırılmış müfredat. Her saat teorik bilgi, interaktif laboratuvar, animasyon ve mini sınavlar barındırır. Standart ders süreleri 1 saattir (15dk Teori, 10dk Animasyon, 30dk Laboratuvar, 5dk Sınav).
        </p>
      </header>

      <div className="space-y-12">
        {curriculum.map((weekData) => (
          <div key={weekData.week} className="relative">
            {/* Sol taraftaki timeline çizgisi */}
            <div className="absolute top-0 bottom-0 left-6 w-1 bg-gray-800 rounded-full z-0" />
            
            <div className="flex items-center gap-6 mb-6 relative z-10">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] border-4 border-gray-950 shrink-0">
                {weekData.week}
              </div>
              <h2 className="text-2xl font-bold text-white">Hafta: {weekData.title}</h2>
            </div>

            <div className="pl-16 space-y-4">
              {weekData.hours.map((hour) => (
                <div key={hour.id} className="bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors p-5 rounded-xl shadow-lg flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Saat {hour.id}</span>
                      <h3 className="text-lg font-bold text-gray-200">{hour.title}</h3>
                    </div>
                    <p className="text-sm text-gray-400">{hour.details}</p>
                  </div>
                  
                  <div className="shrink-0 flex items-center gap-4">
                    <div className={`px-3 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 ${getTypeColor(hour.type)}`}>
                      {getTypeIcon(hour.type)}
                      {getTypeLabel(hour.type)}
                    </div>
                    <button className="text-gray-400 hover:text-blue-400 transition-colors">
                      <PlayCircle className="w-8 h-8" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
