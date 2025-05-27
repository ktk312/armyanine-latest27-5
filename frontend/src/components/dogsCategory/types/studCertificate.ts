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
  friendlyUrl: string;
  status: string;
}
export interface VirtualBreed {
  sireId: number,
  damId: number,
  message?: string;
  reasons?: string[];
}

export interface StudCertificate {
  message: string;
  reasons: string[];
  id: number;
  sireId: number;
  damId: number;
  breedId: number;
  matingDate: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  isDeleted: boolean;

  // relations
  sire: Dog;
  dam: Dog;
  breed: Breed;
}

export interface MatingNotAllowedResponse {
  message: string;
  reasons: string[];
}

export type CreateStudCertificateResponse = StudCertificate | MatingNotAllowedResponse;
export type CheckBreeding = VirtualBreed | MatingNotAllowedResponse;
export interface StudCertificateStore {
  studCertificate: StudCertificate[];
  selectedStufCert: StudCertificate | null;
  loading: boolean;
  error: string | null;
  fetchStudCertificate: () => Promise<void>;
  setSelectedStudCertificate: (dog: StudCertificate | null) => void;
  addStudCertificate: (dogData: Partial<StudCertificate>) => Promise<CreateStudCertificateResponse>;
  editStudCertification: (id: number, studCertData: Partial<StudCertificate>) => Promise<StudCertificate | undefined>;
  fetchSelectedStudById: (id: number) => Promise<void>;
  checkVirtualBreed: (dogData: VirtualBreed) => Promise<CheckBreeding>;
  deleteStudeCertification: (id: number) => Promise<void>; // ✅ Add this line


}
export interface FetchStudCertificateResponse {
  studCertificate: StudCertificate[];
  total: number;
  currentPage: number;
  totalPages: number;
}