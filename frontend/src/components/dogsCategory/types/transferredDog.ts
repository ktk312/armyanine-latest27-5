// types/dogs.ts
export interface TransferredDog {
  id: number;
  dogName: string;
  soldTo: string;
  KP: number;
  status: string;
  transferDate: string;
  transferRemarks: string;
  transferTo: string;
  // Add other fields from your API response
}

export interface TransferredDogApiResponse {
  sires: TransferredDog[];
  dams: TransferredDog[];
  totalTransferredDog: number;
}


export interface TransferredDogState {
  sires: TransferredDog[];
  dams: TransferredDog[];
  totalTransferredDog: number;
  loading: boolean;
  error: string | null;
  fetchTransferredDog: () => Promise<void>;
}