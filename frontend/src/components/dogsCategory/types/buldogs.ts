// types/dogs.ts
export interface Bulldog {
    id: number;
    dogName: string;
    soldTo: string;
    KP: number;
    status: string;
    // Add other fields from your API response
  }
  
  export interface BulldogApiResponse {
    sires: Bulldog[];
    dams: Bulldog[];
    totalBulldog: number;
  }
  
  
  export interface BulldogState {
    sires: Bulldog[];
    dams: Bulldog[];
    totalBulldog: number;
    loading: boolean;
    error: string | null;
    fetchBulldog: () => Promise<void>;
  }