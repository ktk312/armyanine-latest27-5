export interface DogStats {
  totalDogs: number;
  cnd: number;
  cns: number;
  deadDogs: number;
  mortalityPercentage: string; // e.g. "12.34%"
}


export interface DogStatsState {
  dogStats: DogStats | null;
  loading: boolean;
  error: string | null;
  fetchDogStats: () => Promise<void>;
}