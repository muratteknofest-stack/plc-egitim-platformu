import { create } from 'zustand';

interface SimulationState {
  isFuseOn: boolean;
  isStopPressed: boolean;
  isStartPressed: boolean;
  isContactorEnergized: boolean;
  isMotorRunning: boolean;
  toggleFuse: () => void;
  pressStop: (pressed: boolean) => void;
  pressStart: (pressed: boolean) => void;
  evaluateCircuit: () => void;
}

export const useSimulationStore = create<SimulationState>((set, get) => ({
  isFuseOn: false,
  isStopPressed: false,
  isStartPressed: false,
  isContactorEnergized: false,
  isMotorRunning: false,

  toggleFuse: () => {
    set((state) => ({ isFuseOn: !state.isFuseOn }));
    get().evaluateCircuit();
  },

  pressStop: (pressed) => {
    set({ isStopPressed: pressed });
    get().evaluateCircuit();
  },

  pressStart: (pressed) => {
    set({ isStartPressed: pressed });
    get().evaluateCircuit();
  },

  evaluateCircuit: () => {
    const { isFuseOn, isStopPressed, isStartPressed, isContactorEnergized } = get();

    // Akım mantığı:
    // Sigorta AÇIK ise akım Stop butonuna gelir.
    // Stop butonu NC (Normalde Kapalı). Basılmadığı sürece akım geçer.
    const currentPassesStop = isFuseOn && !isStopPressed;

    // Start butonu NO (Normalde Açık). Basıldığında VEYA Kontaktör (Mühürleme) çekili ise akım geçer.
    const currentPassesStart = currentPassesStop && (isStartPressed || isContactorEnergized);

    // Kontaktör bobini A1'e akım ulaşıyorsa çekilir.
    const newContactorState = currentPassesStart;

    // Kontaktör çekiliyse motor çalışır.
    const newMotorState = newContactorState;

    set({
      isContactorEnergized: newContactorState,
      isMotorRunning: newMotorState,
    });
  },
}));
