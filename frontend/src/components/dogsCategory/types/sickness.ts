export interface SicknessRecord {
  id: number;
  date: string;
  diseases: string;
  treatment: string;
  dogId: number;
  createdAt: string;
  updatedAt: string;
}

export interface SicknessInput {
  date: string;
  diseases: string;
  treatment: string;
  dogId: number;
}

export interface SicknessState {
  records: SicknessRecord[];
  selected: SicknessRecord | null;
  loading: boolean;
  error: string | null;

  fetchAll: () => Promise<void>;
  fetchOne: (id: number) => Promise<void>;
  create: (data: Partial<SicknessInput>) => Promise<void>;
  update: (id: number, data: Partial<SicknessInput>) => Promise<void>;
  remove: (id: number) => Promise<void>;
  setSelected: (record: SicknessRecord | null) => void;
}