export interface Linebreeding {
    id: number;
    dogName: string;
    KP: string;
    sex: string;
    inbreedingCoefficient: number;
    // raw computed percentage (may be different from Wright-mapped value)
    rawInbreedingCoefficient?: number;
  }
  export interface LinebreedingResponse {
    damId: number;
    availableSires: Linebreeding[];
  }

  export interface LinebreedingState {
    availableSires: Linebreeding[];
    loading: boolean;
    error: string | null;
    fetchAvailableSires: (id: string) => Promise<Linebreeding[]>;
    reset: () => void;
  }