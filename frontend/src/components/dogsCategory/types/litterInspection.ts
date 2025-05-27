export interface Dog {
  id: number;
  dogName: string;
  kennel: string;
  sex: string;
  countryId: number;
  cityId: number;
  breedId: number;
  KP: string;
  dob: string;
}

export interface Breed {
  id: number;
  breed: string;
}

export interface City {
  id: number;
  cityName: string;
}

export interface LitterDetail {
  id: number;
  litterId: number;
  puppyName: string;
  sex: string;
  status: string;
}

export interface LitterInspection {
  studCertId: Number,
  message: string;
  id: number;
  ownerId?: number;
  kennelId?: number;
  breedId: number;
  location: string;
  dob: string;
  matingDate: string;
  registeredDogs?: number;
  noOfPuppies: number;
  sireId: number;
  damId: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  cityId?: number;
  noOfFemale?: number;
  noOfMale?: number;
  noOfExpired?: number;
  conditionOfDam?: String;
  conditionOfPuppies?: String;
  uniformFeature?: String;
  Remarks?: String;

  // Relations
  sire: Dog;
  dam: Dog;
  breed: Breed;
  // city?: City;
  LitterDetail: LitterDetail[];
}

export interface FetchLitterResponse {
  litter: LitterInspection[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export interface LitterStore {
  litter: LitterInspection[];
  selectedLitter: LitterInspection | null;
  loading: boolean;
  error: string | null;

  fetchLitter: () => Promise<void>;
  setSelectedLitter: (litter: LitterInspection | null) => void;
  addLitter: (litterData: Partial<LitterInspection>) => Promise<LitterInspection>;
  editLitter: (id: number, litterData: Partial<LitterInspection>) => Promise<LitterInspection | undefined>;
  fetchLitterById: (id: number) => Promise<void>;
}