import { create } from 'zustand';

export type ElementType = 'NO' | 'NC' | 'COIL';

export interface LadderElement {
  id: string;
  type: ElementType;
  address: string; // e.g., 'I0.0', 'Q0.0', 'M0.0'
  active: boolean; // Indicates if power is passing through or coil is energized
}

export interface Rung {
  id: string;
  inputs: LadderElement[]; // Elements on the left (contacts)
  output: LadderElement | null; // Element on the right (coil)
  powerReachesOutput: boolean;
}

interface LadderState {
  rungs: Rung[];
  memory: Record<string, boolean>; // I, Q, M states
  isSimulating: boolean;
  addRung: () => void;
  addElementToRung: (rungId: string, type: ElementType, address: string, position: 'input' | 'output') => void;
  removeElement: (rungId: string, elementId: string, position: 'input' | 'output') => void;
  toggleMemoryBit: (address: string) => void;
  setMemoryBit: (address: string, value: boolean) => void;
  toggleSimulation: () => void;
  evaluateLogic: () => void;
}

const initialMemory: Record<string, boolean> = {
  'I0.0': false,
  'I0.1': false,
  'I0.2': false,
  'Q0.0': false,
  'Q0.1': false,
  'M0.0': false,
};

export const useLadderStore = create<LadderState>((set, get) => ({
  rungs: [{ id: 'rung-1', inputs: [], output: null, powerReachesOutput: false }],
  memory: { ...initialMemory },
  isSimulating: false,

  addRung: () => {
    set((state) => ({
      rungs: [...state.rungs, { id: `rung-${Date.now()}`, inputs: [], output: null, powerReachesOutput: false }]
    }));
  },

  addElementToRung: (rungId, type, address, position) => {
    set((state) => {
      const newRungs = state.rungs.map((rung) => {
        if (rung.id !== rungId) return rung;
        
        const newElement: LadderElement = {
          id: `el-${Date.now()}`,
          type,
          address,
          active: false
        };

        if (position === 'output') {
          return { ...rung, output: newElement };
        } else {
          return { ...rung, inputs: [...rung.inputs, newElement] };
        }
      });
      return { rungs: newRungs };
    });
    get().evaluateLogic();
  },

  removeElement: (rungId, elementId, position) => {
    set((state) => {
      const newRungs = state.rungs.map((rung) => {
        if (rung.id !== rungId) return rung;
        if (position === 'output' && rung.output?.id === elementId) {
          return { ...rung, output: null };
        }
        if (position === 'input') {
          return { ...rung, inputs: rung.inputs.filter((el) => el.id !== elementId) };
        }
        return rung;
      });
      return { rungs: newRungs };
    });
    get().evaluateLogic();
  },

  toggleMemoryBit: (address) => {
    set((state) => ({
      memory: { ...state.memory, [address]: !state.memory[address] }
    }));
    if (get().isSimulating) {
      get().evaluateLogic();
    }
  },

  setMemoryBit: (address, value) => {
    set((state) => {
      if (state.memory[address] === value) return state; // Optimisation
      return { memory: { ...state.memory, [address]: value } };
    });
    // Simülasyon döngüsünde (evaluateLogic) kullanıldığı için manuel tetiklemeye gerek yok
  },

  toggleSimulation: () => {
    set((state) => {
      const isNowSimulating = !state.isSimulating;
      return { 
        isSimulating: isNowSimulating,
        // Reset memory if stopping simulation
        memory: isNowSimulating ? state.memory : { ...initialMemory }
      };
    });
    if (get().isSimulating) {
      get().evaluateLogic();
    }
  },

  evaluateLogic: () => {
    if (!get().isSimulating) return;

    set((state) => {
      const newMemory = { ...state.memory };
      const newRungs = state.rungs.map((rung) => {
        let powerReachesOutput = true;
        
        // Series logic: All inputs must pass power
        const evaluatedInputs = rung.inputs.map((input) => {
          const memValue = newMemory[input.address] || false;
          let passes = false;
          
          if (input.type === 'NO') passes = memValue === true;
          if (input.type === 'NC') passes = memValue === false;

          if (!passes) powerReachesOutput = false;

          return { ...input, active: passes };
        });

        // Update output based on power flow
        let evaluatedOutput = rung.output;
        if (rung.output) {
          if (rung.output.type === 'COIL') {
            newMemory[rung.output.address] = powerReachesOutput;
            evaluatedOutput = { ...rung.output, active: powerReachesOutput };
          }
        }

        return {
          ...rung,
          inputs: evaluatedInputs,
          output: evaluatedOutput,
          powerReachesOutput
        };
      });

      return { rungs: newRungs, memory: newMemory };
    });
  }
}));
