export interface Linebreeding {
    id: number;
    dogName: string;
    KP: string;
    sex: string;
    inbreedingCoefficient: number;
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