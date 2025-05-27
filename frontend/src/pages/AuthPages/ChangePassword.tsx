import React, { useState } from "react";
import AuthLayout from "./AuthPageLayout";
import { useAuthStore } from "../../store/useAuthStore";
import { useChangePassword } from "../../components/dogsCategory/hooks/useChangePassword";

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    // const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    //   const [error, setError] = useState("");
    const [formError, setFormError] = useState("");

const { user, token } = useAuthStore();
    const { mutate, isPending, isSuccess, isError, error } = useChangePassword();

   const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormError("");

        if (!user?.id || !token) {
            setFormError("User not logged in");
            return;
        }

        if (newPassword !== confirmPassword) {
            setFormError("Passwords do not match");
            return;
        }

      mutate({
      userId: user.id,
      oldPassword,
      newPassword
    });
    };
    return (
        <AuthLayout>
            <div className="flex items-center justify-center w-full h-full lg:w-1/2">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md px-6 py-8 mx-auto bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
                >
                    <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800 dark:text-white">
                        Change Password
                    </h2>

                    {formError && <p className="mb-4 text-sm text-red-500">{formError}</p>}
                    {isSuccess && <p className="mb-4 text-sm text-green-500">Password changed successfully!</p>}
                    {isError && <p className="mb-4 text-sm text-red-500">{(error as any)?.response?.data?.message || "Something went wrong"}</p>}


                    <div className="mb-4">
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                            Current Password
                        </label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                        {isPending ? "Updating..." : "Update Password"}
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
}
