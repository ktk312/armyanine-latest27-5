
export interface Sire {
    id: number;
    showTitle: string;
    dogName: string;

}

export interface Dam {
    id: number;
    showTitle: string;
    dogName: string;
}


export interface Breed {
    id: number;
    breed: string;
}


export interface Litter {
    id: number;
    litterId: number;
    sireId: string;
    damId: string;
    matingDate: string;
    dob: string;
    litterName: string; // Assuming this field represents the name of the litter
    createdAt: string;
    updatedAt: string;
    LitterDetail: LitterRegistration[];
    sire: Sire;
    dam: Dam;
    breed: Breed;
    KP?: string; // Assuming this is a unique identifier for the litter

}

export interface LitterRegistration {
    id: number;
    message: string;
    litterId: number;
    name: string;
    location?: string;
    sex: string;
    color?: string;
    dob?: string;
    matingDate?: string;
    hair?: string;
    dnaTaken: boolean;
    microchip?: string;
    createdAt: string;
    updatedAt: string;
    status: string;
    KP?: string; // Assuming it's unique, you can use it as an optional field
    litter: Litter; // This defines the relation with Litter
    // puppies: { name: string; gender: string; color: string }[];

}


export interface FetchLitterRegistrationResponse {
    litterRegistration: LitterRegistration[];
    total: number;
    currentPage: number;
    totalPages: number;
}

export interface LitterRegistrationStore {
    litterRegistration: LitterRegistration[];
    selectedLitterRegistration: LitterRegistration | null;
    loading: boolean;
    error: string | null;

    fetchAllLitterRegistration: () => Promise<void>;
    setSelectedLitterRegistration: (litter: LitterRegistration | null) => void;
    addLitterRegistration: (litterData: Partial<LitterRegistration>) => Promise<LitterRegistration>;
    editLitterRegistration: (id: number, litterData: Partial<LitterRegistration>) => Promise<LitterRegistration | undefined>;
    // fetchLitterRegById: (id: number) => Promise<void>;
}