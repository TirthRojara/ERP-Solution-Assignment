import { MutationOptions, QueryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createVendor, getVendorChoice, getVendorList, updateVendor } from "./api";
import { CreateVendorResponse, VendorChoiceItem, VendorChoiceKey, VendorListItem, VendorListParams } from "./types";
import { MUTATION, QUERY } from "@/constants/tanstank.constants";
import { ApiError } from "@/types/api";
import { CreateVendorFormValues, UpdateVendorFormValues } from "@/features/vendor/utils/schema";


export const useVendorList = (
    params: VendorListParams,
    options?: QueryOptions<VendorListItem[], ApiError>
) => {
    return useQuery({
        queryKey: [QUERY.VENDOR.list, params],
        queryFn: () => getVendorList(params),
        retry: false,
        ...options,
    });
};

export const useVendorChoice = (
    choiceType: VendorChoiceKey,
    options?: QueryOptions<VendorChoiceItem[], ApiError>
) => {
    return useQuery({
        queryKey: [QUERY.VENDOR.choices, choiceType],
        queryFn: () => getVendorChoice(choiceType),
        retry: false,
        ...options,
    });
};

export const useCreateVendorMutation = (
    options?: MutationOptions<CreateVendorResponse, ApiError, CreateVendorFormValues>
) => {
    const queryClient = useQueryClient();
    const { onSuccess: externalSuccess, onError: externalError, ...restOptions } = options ?? {};

    return useMutation({
        mutationKey: [MUTATION.VENDOR.submit],
        mutationFn: (payload) => createVendor(payload),
        meta: {
            successMessage: "Vendor created successfully",
            errorMessage: "Vendor creation failed",
        },
        onSuccess: async (response, payload, onMutateResult, mutationContext) => {
            await queryClient.invalidateQueries({ queryKey: [QUERY.VENDOR.list] });
            toast.success("Vendor created successfully!");
            await externalSuccess?.(response, payload, onMutateResult, mutationContext);
        },
        onError: async (error, payload, onMutateResult, mutationContext) => {
            toast.error(error?.message || "Something went wrong. Please try again later.");
            await externalError?.(error, payload, onMutateResult, mutationContext);
        },
        ...restOptions,
    });
};

export const useUpdateVendorMutation = (
    vendor: VendorListItem | null,
    options?: MutationOptions<CreateVendorResponse, ApiError, UpdateVendorFormValues>
) => {
    const queryClient = useQueryClient();
    const { onSuccess: externalSuccess, onError: externalError, ...restOptions } = options ?? {};

    return useMutation({
        mutationKey: [MUTATION.VENDOR.submit, vendor?.name ?? "pending_vendor"],
        mutationFn: (payload) => {
            if (!vendor) {
                throw new Error("Vendor is not selected.");
            }
            return updateVendor(payload, vendor);
        },
        meta: {
            successMessage: "Vendor updated successfully",
            errorMessage: "Vendor update failed",
        },
        onSuccess: async (response, payload, onMutateResult, mutationContext) => {
            await queryClient.invalidateQueries({ queryKey: [QUERY.VENDOR.list] });
            toast.success("Vendor updated successfully!");
            await externalSuccess?.(response, payload, onMutateResult, mutationContext);
        },
        onError: async (error, payload, onMutateResult, mutationContext) => {
            toast.error(error?.message || "Something went wrong. Please try again later.");
            await externalError?.(error, payload, onMutateResult, mutationContext);
        },
        ...restOptions,
    });
};