export interface Breed {
  id: number;
  breed: string;
  name: string;
}

export interface Country {
  id: number;
  countryName: string;
}

export interface City {
  id: number;
  city: string;
}

export interface Category {
  id: string;
  name: string;
}
export interface Microchip {
  id: string;
  chipId: string;
}

export interface Dog {
  id: number;
  message: string;
  showTitle: string | null;
  dogName: string;
  friendlyUrl: string;
  kennel: string;
  breeder: string;
  breedId: number | string | null;
  sireId: number | null;
  damId: number | null;
  dob: string;
  deathDate: string;
  soldDate: string;
  loanDate: string;
  transferDate: string;
  isDeath: boolean;
  isSold: boolean | null;
  isLoan: boolean | null;
  isTransfer: boolean | null;
  sex: string;
  achievements: string | null;
  createdAt: string;
  updatedAt: string;
  status: string;
  countryId: number | string | null;
  cityId: number | string | null;
  categoryId: number | string | null;
  KP: string;
  sire: Dog | null;
  dam: Dog | null;
  microchipId: number | string | null;
  location: string | null;
  HD: string | null;
  ED: string | null;
  hair: string | null;
  color: string | null;
  title: string;
  CDN: Boolean;
  CNS: Boolean;
  cdnDate: string | null;
  cnsDate: string | null;
  chestDepth: string;
  chestCircumference: string;
  weight: string
  breed: Breed; // Added breed relation
  country: Country; // Added country relation
  city: City; // Added city relation
  category: Category; // Added category relation
  virtuesAndFaults: string;
  breedingAdvice: string;
  miscellaneousComments: string;
  progenyTrainability: string;
  microchip: Microchip,
  deathReason?: string; // Optional field for death reason
  soldRemarks?: string; // Optional field for sold remarks
  loanRemarks?: string; // Optional field for loan remarks
  transferRemarks?: string; // Optional field for transfer remarks
  soldTo?: string; // Optional field for sold to
  loanTo?: string; // Optional field for loan to
  transferTo?: string; // Optional field for transfer to

}

export interface DogStore {
  dogs: Dog[];
  selectedDog: Dog | null;
  loading: boolean;
  error: string | null;
  count: number;
  fetchDogs: () => Promise<void>;
  setSelectedDog: (dog: Dog | null) => void;
  // addDog: (dogData: Partial<Dog>) => Promise<Dog | undefined>;
  addDog: (dogData: FormData) => Promise<Dog | undefined>;
  // setDogs: (dogs: Dog[]) => void;
  // deleteDog: (id: number) => Promise<void>; // ✅ Add this line
  editOneDog: (dogData: FormData, id: string) => Promise<Dog>; // ✅ Optional, if using update
  getDogsCount: () => Promise<void>; // ✅ Optional, if using count
  filteredDog: (breedId: string, cityId: string) => Promise<Dog[]>;
  resetSelectedDog: () => void;
}

export interface FetchDogsResponse {
  dogs: Dog[];
  total: number;
  currentPage: number;
  totalPages: number;
}
