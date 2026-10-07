import { create } from 'zustand';

interface FactoryState {
  boxX: number; // Kutunun X pozisyonu (0 - 100 arası yüzdelik)
  boxY: number; // Kutunun Y pozisyonu (Piston itince artar)
  isBoxVisible: boolean;
  sortedCount: number; // Başarıyla ayrılan (itilen) kutu sayısı
  missedCount: number; // İtilemeden sona ulaşan kutu sayısı
  sensorActive: boolean; // Fotosel durumu
  pistonExtended: boolean; // Piston durumu
  
  spawnBox: () => void;
  updatePhysics: (conveyorRun: boolean, pistonPush: boolean, setPlcInput: (addr: string, val: boolean) => void) => void;
  resetCounters: () => void;
}

export const useFactoryStore = create<FactoryState>((set, get) => ({
  boxX: 0,
  boxY: 0,
  isBoxVisible: false,
  sortedCount: 0,
  missedCount: 0,
  sensorActive: false,
  pistonExtended: false,

  spawnBox: () => {
    set({ boxX: 0, boxY: 0, isBoxVisible: true, sensorActive: false });
  },

  resetCounters: () => set({ sortedCount: 0, missedCount: 0 }),

  updatePhysics: (conveyorRun, pistonPush, setPlcInput) => {
    const { boxX, boxY, isBoxVisible, sortedCount, missedCount } = get();
    
    let newBoxX = boxX;
    let newBoxY = boxY;
    let newVisible = isBoxVisible;
    let newSorted = sortedCount;
    let newMissed = missedCount;

    // Eğer kutu yoksa, rastgele bir zamanda yeni kutu oluştur
    if (!isBoxVisible) {
      if (Math.random() < 0.02) { // Yaklaşık %2 ihtimalle her frame'de kutu gelir
        get().spawnBox();
      }
      return;
    }

    // Konveyör çalışıyorsa ve kutu Y ekseninde itilmediyse sağa doğru ilerle
    if (conveyorRun && boxY === 0) {
      newBoxX += 0.5; // Hız
    }

    // Piston İtme Mantığı
    // Sensör kutuyu X: 45 ile X: 55 arasında algılar
    const isAtSensor = newBoxX >= 45 && newBoxX <= 55 && boxY === 0;
    
    // Sensör durumu değiştiyse PLC'ye bildir (I0.0)
    if (isAtSensor !== get().sensorActive) {
      set({ sensorActive: isAtSensor });
      setPlcInput('I0.0', isAtSensor);
    }

    // Piston aktifse ve kutu pistonun önündeyse (Sensör hizası)
    if (pistonPush && isAtSensor && boxY < 50) {
      newBoxY += 5; // Kutuyu aşağı (diğer banda/kutuya) it
    }

    // Kutu aşağı itildiyse ve ekrandan çıktıysa başarılı say
    if (newBoxY >= 50) {
      newVisible = false;
      newSorted += 1;
      // Sensörün önünden düştüğü için sensörü sıfırla
      set({ sensorActive: false });
      setPlcInput('I0.0', false);
    }

    // Kutu itilmeden konveyörün sonuna ulaştıysa kaçırıldı say
    if (newBoxX > 100) {
      newVisible = false;
      newMissed += 1;
      set({ sensorActive: false });
      setPlcInput('I0.0', false);
    }

    set({
      boxX: newBoxX,
      boxY: newBoxY,
      isBoxVisible: newVisible,
      sortedCount: newSorted,
      missedCount: newMissed,
      pistonExtended: pistonPush,
    });
  }
}));
