// types/dogs.ts
export interface BelgianMalinois{
    id: number;
    dogName: string;
    soldTo: string;
    KP: number;
    status: string;
    // Add other fields from your API response
  }
  
  export interface BelgianMalinoisApiResponse {
    sires: BelgianMalinois[];
    dams: BelgianMalinois[];
    totalBelgianMalinois: number;
  }
  
  
  export interface BelgianMalinoisState {
    sires: BelgianMalinois[];
    dams: BelgianMalinois[];
    totalBelgianMalinois: number;
    loading: boolean;
    error: string | null;
    fetchBelgianMalinois: () => Promise<void>;
  }