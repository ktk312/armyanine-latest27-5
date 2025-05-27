export interface Breed {
    id: number;
    groupId: number | null;
    breed: string | null;
    friendlyUrl: string | null;
    description: string | null;
    image: string | null;
    breedStandard: string | null;
    redirect: string | null;
    status: string | null;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
  }

  export interface BreedState {
    breeds: Breed[];
    selectedBreed: Breed | null;
    loading: boolean;
    error: string | null;
    getAllBreeds: () => Promise<Breed[]>;
    getBreedById: (id: number) => Promise<void>;
    setSelectedBreed: (dog: Breed | null) => void;
    addBreed: (breedData: Partial<Breed>) => Promise<void>;
    editBreed: (id: number, breedData: Partial<Breed>) => Promise<void>;
    removeBreed: (id: number) => Promise<void>;
  }