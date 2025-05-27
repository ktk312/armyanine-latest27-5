export interface DogStats {
  totalDogs: number;
  soldDogs: number;
  deathDogs: number;
  mortalityPercentage: string; // e.g. "12.34%"
}


export interface DogStatsState {
  dogStats: DogStats | null;
  loading: boolean;
  error: string | null;
  fetchDogStats: () => Promise<void>;
}