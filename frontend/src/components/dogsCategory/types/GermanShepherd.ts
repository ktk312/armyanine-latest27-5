// types/dogs.ts
export interface GermanShepherd {
  id: number;
  dogName: string;
  soldTo: string;
  KP: number;
  soldDate: string;
  status: string;
  // Add other fields from your API response
}

export interface GermanShepherdApiResponse {
  sires: GermanShepherd[];
  dams: GermanShepherd[];
  totalGermanShepherd: number;
}


export interface GermanShepherdState {
  sires: GermanShepherd[];
  dams: GermanShepherd[];
  total: number;
  loading: boolean;
  error: string | null;
  fetchGermanShepherds: () => Promise<void>;
}