import { ApiError, ApiResponse } from "@/types/api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { LoginFormPayload, LoginResponse } from "./types";
import { MUTATION } from "@/constants/tanstank.constants";
import { login, logout } from "./api";
import { toast } from "sonner";

export const useLogin = (options?: UseMutationOptions<LoginResponse, ApiError, LoginFormPayload>) => {
    return useMutation({
        mutationKey: [MUTATION.AUTH.signin],
        mutationFn: (payload) => login(payload),
        onSuccess: (data: LoginResponse) => {
            toast.success(data.message || "Login successful!");
        },
        onError: (error: ApiError) => {
            toast.error(error?.message || "Something went wrong. Please try again later.");
        },
        ...options,
    });
};  

export const useLogout = (options?: UseMutationOptions<void, ApiError>) => {
    return useMutation({
        mutationKey: [MUTATION.AUTH.logout],
        mutationFn: () => logout(),
        onSuccess: () => {
            toast.success("Logout successful!");
        },
        onError: (error: ApiError) => {
            toast.error(error?.message || "Something went wrong. Please try again later.");
        },
        ...options,
    });
};  
