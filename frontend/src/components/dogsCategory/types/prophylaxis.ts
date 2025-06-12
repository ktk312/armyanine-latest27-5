import { Dog } from "./dog";

export interface ProphylaxisRecord {
  id: number;
  date: string;
  prophylacticDrug: string;
  remarks: string;
  dogId: number;
  dog: Dog;
  createdAt: string;
  updatedAt: string;
}

export type ProphylaxisInput = Omit<ProphylaxisRecord, "id" | "createdAt" | "updatedAt">;

export interface ProphylaxisState {
  records: ProphylaxisRecord[];
  selected: ProphylaxisRecord | null;
  loading: boolean;
  error: string | null;

  fetchAll: () => Promise<void>;
  create: (data: Partial<ProphylaxisInput>) => Promise<void>;
  update: (id: number, data: Partial<ProphylaxisInput>) => Promise<void>;
  remove: (id: number) => Promise<void>;
  setSelected: (record: ProphylaxisRecord | null) => void;
}