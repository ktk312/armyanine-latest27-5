import { Dog } from "./dog";

export interface VaccinationRecord {
    id: number;
    age: string | Number;
    vaccine: string;
    dueDate: string; // ISO string
    givenDate: string;
    batchNo: string | Number;
    vetSign: string;
    dogId: string;
    dog?: Dog
    createdAt: string;
    updatedAt: string;
}

export interface VaccinationInput {
    age: string;
    vaccine?: string;
    dueDate?: string;
    givenDate?: string;
    batchNo?: string;
    vetSign?: string;
    dogId: string;
}

export interface VaccinationState {
    records: VaccinationRecord[];
    selected: VaccinationRecord | null;
    loading: boolean;
    error: string | null;

    fetchAll: () => Promise<void>;
    create: (data: Partial<VaccinationInput>) => Promise<void>;
    update: (id: string, data: Partial<VaccinationInput>) => Promise<void>;
    remove: (id: string) => Promise<void>;
    setSelected: (record: VaccinationRecord | null) => void;
}