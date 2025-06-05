export interface DewormingRecord {
  id: number;
  date: string;
  drug: string;
  sign: string;
  dogId: number;
  createdAt: string;
  updatedAt: string;
}

export interface DewormingInput {
  date: string;
  drug: string;
  sign: string;
  dogId: number;
}

export interface DewormingState {
  records: DewormingRecord[];
  selected: DewormingRecord | null;
  loading: boolean;
  error: string | null;

  fetchAll: () => Promise<void>;
  fetchOne: (id: number) => Promise<void>;
  create: (data: Partial<DewormingInput>) => Promise<void>;
  update: (id: number, data: Partial<DewormingInput>) => Promise<void>;
  remove: (id: number) => Promise<void>;
  setSelected: (record: DewormingRecord | null) => void;
}