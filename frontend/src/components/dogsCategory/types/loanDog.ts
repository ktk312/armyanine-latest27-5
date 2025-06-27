// types/dogs.ts
export interface LoanDog {
  id: number;
  dogName: string;
  soldTo: string;
  KP: number;
  loanDate: string;
  status: string;
  loanRemarks: string;
  loanTo: string;
  // Add other fields from your API response
}

export interface LoanDogApiResponse {
  sires: LoanDog[];
  dams: LoanDog[];
  totalLoanDog: number;
}


export interface LoanDogState {
  sires: LoanDog[];
  dams: LoanDog[];
  totalLoanDog: number;
  loading: boolean;
  error: string | null;
  fetchLoanDog: () => Promise<void>;
}