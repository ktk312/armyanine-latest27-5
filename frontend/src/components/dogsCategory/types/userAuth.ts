

// // User Interface
// export interface User {
//   id: string;
//   email: string;
//   name: string;
//   // Add more fields as needed
// }

// // AuthState Interface
// export interface AuthState {
//   user: User | null;
//   token: string | null;
//   refreshToken: string | null;
//   tokenExpiry: Date | null;
//   isLoading: boolean;
//   error: string | null;
//   signIn: (email: string, password: string) => Promise<void>;
//   logout: () => void;
//   loadStoredData: () => void;
// }


// User Interface
export interface User {
  id: string;
  email: string;
  name: string;
  // Add more fields as needed
}

// AuthState Interface
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
