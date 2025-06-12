import { Dog } from "./dog";

export interface TrainingRecord {
  id: number;
  trainerName: string;
  trainingStartedOn: string;
  trainingCompleted: string;
  trainingCategory?: string;
  performance?: string;
  intelligence?: string;
  willingness?: string;
  energy?: string;
  sensitivity?: string;
  aggression?: string;
  dogId: number;
  dog: Dog;
  createdAt: string;
  updatedAt: string;
}

export interface TrainingInput {
  trainerName: string;
  trainingStartedOn: string;
  trainingCompleted: string;
  trainingCategory?: string;
  performance?: string;
  intelligence?: string;
  willingness?: string;
  energy?: string;
  sensitivity?: string;
  aggression?: string;
  dogId: number;

}


export interface TrainingState {
  records: TrainingRecord[];
  selected: TrainingRecord | null;
  loading: boolean;
  error: string | null;

  fetchAll: () => Promise<void>;
  fetchOne: (id: number) => Promise<void>;
  create: (data: Partial<TrainingInput>) => Promise<void>;
  update: (id: number, data: Partial<TrainingInput>) => Promise<void>;
  remove: (id: number) => Promise<void>;
  setSelected: (record: TrainingRecord | null) => void;
}