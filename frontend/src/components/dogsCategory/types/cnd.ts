// types/dogs.ts
export interface Cnd {
  id: number;
  dogName: string;
  soldTo: string;
  KP: number;
  status: string;
  cndDate: string; // Assuming this is the date of C&D status
  // Add other fields from your API response
}

export interface CndApiResponse {
  sires: Cnd[];
  dams: Cnd[];
  totalCnd: number;
}


export interface CndState {
  sires: Cnd[];
  dams: Cnd[];
  totalCnd: number;
  loading: boolean;
  error: string | null;
  fetchCnd: () => Promise<void>;
}