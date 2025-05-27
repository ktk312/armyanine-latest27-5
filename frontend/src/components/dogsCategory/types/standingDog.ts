// types/dogs.ts
export interface StandingDog{
    id: number;
    dogName: string;
    soldTo: string;
    KP: number;
    status: string;
    // Add other fields from your API response
  }
  
  export interface StandingDogApiResponse {
    sires: StandingDog[];
    dams: StandingDog[];
    totalStandingDog: number;
  }
  
  
  export interface StandingDogState {
    sires: StandingDog[];
    dams: StandingDog[];
    totalStandingDog: number;
    loading: boolean;
    error: string | null;
    fetchStandingDog: () => Promise<void>;
  }