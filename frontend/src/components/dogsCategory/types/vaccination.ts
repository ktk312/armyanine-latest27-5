export interface VaccinationRecord {
    id: number;
    age: string | Number | undefined;
    vaccine: string;
    dueDate: string; // ISO string
    batchNo: string | Number;
    vetSign: string;
    dogId: number;
    createdAt: string;
    updatedAt: string;
}

export interface VaccinationInput {
    age: string;
    vaccine: string;
    dueDate: string;
    batchNo: string;
    vetSign: string;
    dogId: number;
}

export interface VaccinationState {
    records: VaccinationRecord[];
    selected: VaccinationRecord | null;
    loading: boolean;
    error: string | null;

    fetchAll: () => Promise<void>;
create: (data: Partial<VaccinationInput>) => Promise<void>;
    update: (id: number, data: Partial<VaccinationInput>) => Promise<void>;
    remove: (id: number) => Promise<void>;
    setSelected: (record: VaccinationRecord | null) => void;
}