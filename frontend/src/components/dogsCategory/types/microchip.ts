export interface Microchip {
  id: number;
  chipId: string;
}


export interface DeleteMicrochipResponse {
  message: string;
  deleted: Microchip;
}


export interface MicrochipState {
  microchips: Microchip[];
  selectedMicrochip: Microchip | null;
  microchiploading: boolean;
  error: string | null;
  addMicrochip: (chipId: string) => Promise<void>;
  fetchMicrochips: () => Promise<void>;
  fetchUnassignMicrochips: () => Promise<void>;
  deleteMicrochipByChipId: (id: string) => Promise<DeleteMicrochipResponse>;
  editMicrochip: (id: number, microchipData: Partial<Microchip>) => Promise<Microchip | undefined>;
  setSelectedMicrochip: (microchip: Microchip | null) => void;
}
