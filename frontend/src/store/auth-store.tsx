// // @src/store/auth-store.ts

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface User {
//   id: number;
//   email: string;
//   password: string;
//   otp: string;
//   resetToken: string;
//   resetTokenExpires: string | number;
//   emailVerified: boolean;
//   createdAt: string;
//   updatedAt: string;
// }
// interface AuthState {
//   token: string | null;
//   refreshToken: string | null;
//   tokenExpiry: number | null;
//   user: User | null;
//   login: (token: string | null, refreshToken: string | null, expiry: number | null, user: User | null) => void;
//   logout: () => void;
// }

// const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       token: null,
//       refreshToken: null,
//       tokenExpiry: null,
//       user: null,
//       login: (token, refreshToken, expiry, user) => set({ token, refreshToken, tokenExpiry: expiry, user }),
//       logout: () => set({ token: null, refreshToken: null, tokenExpiry: null, user: null }), 
//     }),
//     {
//       name: "auth-storage",
//     }
//   )
// );

// export default useAuthStore;
