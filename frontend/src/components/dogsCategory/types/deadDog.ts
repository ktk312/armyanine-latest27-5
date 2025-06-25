// types/dogs.ts
export interface DeadDog {
  id: number;
  dogName: string;
  soldTo: string;
  KP: number;
  status: string;
  deathDate: string;
  // Add other fields from your API response
}

export interface DeadDogApiResponse {
  sires: DeadDog[];
  dams: DeadDog[];
  totalDeadDog: number;
}


export interface DeadDogState {
  sires: DeadDog[];
  dams: DeadDog[];
  totalDeadDog: number;
  loading: boolean;
  error: string | null;
  fetchDeadDog: () => Promise<void>;
}