

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState } from "../components/dogsCategory/types/userAuth";
import { userLogin, changePassword } from "../components/dogsCategory/api/dogsApi";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      signIn: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          set({
            user: null,
            token: null,
          });
          const { user, token } = await userLogin(email, password);
          set({ user, token, isLoading: false, error: null });
        } catch (err: any) {
          set({
            error: err?.response?.data?.message || "Login failed",
            isLoading: false,
          });
          // localStorage.removeItem("auth-storage");
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
        });
        localStorage.removeItem("auth-storage");
      },

      changePassword: async (oldPassword: string, newPassword: string) => {
        set({ isLoading: true, error: null });
        const { user, token } = get();
        if (!user?.id || !token) throw new Error("User not authenticated");
        try {
          const user = get().user;
          if (!user?.id) throw new Error("User not authenticated");

          await changePassword({
            oldPassword,
            newPassword,
            userId: user.id,
          }, token);

          set({ isLoading: false });
          // Optional: Logout after password change
          get().logout();
        } catch (err: any) {
          set({
            error: err?.response?.data?.message || "Password change failed",
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);
