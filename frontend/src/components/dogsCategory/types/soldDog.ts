// types/dogs.ts
export interface SoldDog{
    id: number;
    dogName: string;
    soldTo: string;
    KP: number;
    soldDate: string;
    status: string;
    // Add other fields from your API response
  }
  
  export interface SoldDogApiResponse {
    sires: SoldDog[];
    dams: SoldDog[];
    totalSoldDog: number;
  }
  
  
  export interface SoldDogState {
    sires: SoldDog[];
    dams: SoldDog[];
    totalSoldDog: number;
    loading: boolean;
    error: string | null;
    fetchSoldDog: () => Promise<void>;
  }