// types/dogs.ts
export interface Cns {
  id: number;
  dogName: string;
  soldTo: string;
  KP: number;
  status: string;
  cnsDate: string; // Assuming this is the date of C&S status
  // Add other fields from your API response
}

export interface CnsApiResponse {
  sires: Cns[];
  dams: Cns[];
  totalCns: number;
}


export interface CnsState {
  sires: Cns[];
  dams: Cns[];
  totalCns: number;
  loading: boolean;
  error: string | null;
  fetchCns: () => Promise<void>;
}