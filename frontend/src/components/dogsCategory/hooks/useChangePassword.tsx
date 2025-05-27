import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../api/dogsApi";
import { useAuthStore } from "../../../store/useAuthStore";

export const useChangePassword = () => {
  const token = useAuthStore((state) => state.token); // get token once here

  return useMutation({
    mutationFn: (data: { oldPassword: string; newPassword: string; userId: string }) =>
      changePassword(data, token || ""), // pass token from closure
  });
};