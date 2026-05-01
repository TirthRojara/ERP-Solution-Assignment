import { z } from "zod";
import { VendorListItem } from "@/features/vendor/api/types";

export const SUPPLIER_TYPES = ["Company", "Individual", "Partnership"] as const;

export const createVendorSchema = z.object({
  // Details
  supplier_name: z.string().trim().min(1, "Supplier name is required").max(30, "Supplier name cannot exceed 30 characters"),
  supplier_group: z.string().min(1, "Supplier group is required"),
  country: z.string().trim().min(1, "Country is required").max(30, "Country cannot exceed 30 characters"),
  supplier_type: z.enum(SUPPLIER_TYPES, "Invalid supplier type"),
  is_transporter: z.number().min(0).max(1),
  default_currency: z.string().min(1, "Billing currency is required"),
  is_internal_supplier: z.number().min(0).max(1),
  default_price_list: z.string().min(1, "Price list is required"),
  default_bank_account: z.string().min(1, "Default company bank account is required"),

  // Tax
  tax_id: z.string().min(4, "Tax id cannot be less than 4 digits").max(12, "Tax id cannot exceed 12 digits"),
  tax_category: z.string().min(1, "Tax category is required"),
  tax_withholding_category: z.string().min(1, "Tax withholding category is required"),
  
  // Address
  supplier_primary_address: z.string().min(1, "Primary address is required"),
  supplier_primary_contact: z.string().min(1, "Primary contact is required"),
  
  // Accounting
  companies: z.array(z.string().min(1, "Invalid company detail")),
  accounts: z.array(z.string().min(1, "Invalid account detail")),
});

export type CreateVendorFormValues = z.infer<typeof createVendorSchema>;

export const defaultVendorValues: Partial<CreateVendorFormValues> = {
  supplier_name: "",
  supplier_group: "",
  country: "",
  supplier_type: "Company",
  is_transporter: 0,
  default_currency: "",
  is_internal_supplier: 0,
  default_price_list: "",
  default_bank_account: "",
  tax_id: "",
  tax_category: "",
  tax_withholding_category: "",
  supplier_primary_address: "",
  supplier_primary_contact: "",
  companies: [],
  accounts: []
};

// Update Schema
export const updateVendorSchema = z.object({
  // Details
  supplier_name: z.string().trim().min(1, "Supplier name is required").max(30, "Supplier name cannot exceed 30 characters"),
  supplier_group: z.string().min(1, "Supplier group is required"),
  country: z.string().trim().min(1, "Country is required").max(30, "Country cannot exceed 30 characters"),
  supplier_type: z.enum(SUPPLIER_TYPES, "Invalid supplier type"),
  is_transporter: z.number().min(0).max(1),
  default_currency: z.string().min(1, "Billing currency is required"),
  is_internal_supplier: z.number().min(0).max(1),
  default_price_list: z.string(),
  default_bank_account: z.string(),

  // Tax
  tax_id: z.string().min(4, "Tax id cannot be less than 4 digits").max(12, "Tax id cannot exceed 12 digits"),
  tax_category: z.string(),
  tax_withholding_category: z.string(),
  
  // Address
  supplier_primary_address: z.string(),
  supplier_primary_contact: z.string(),
  
  // Accounting
  companies: z.array(z.string().min(1, "Invalid company detail")),
  accounts: z.array(z.string().min(1, "Invalid account detail")),
});

export type UpdateVendorFormValues = z.infer<typeof updateVendorSchema>;

// Helper to convert list data to form data
const coerceToStr = (v: string | null | undefined): string => v ?? "";

export const convertVendorListToFormValues = (vendor: VendorListItem): UpdateVendorFormValues => ({
  supplier_name: coerceToStr(vendor.supplier_name),
  supplier_group: coerceToStr(vendor.supplier_group),
  country: coerceToStr(vendor.country),
  supplier_type: vendor.supplier_type as UpdateVendorFormValues["supplier_type"],
  is_transporter: vendor.is_transporter ?? 0,
  default_currency: coerceToStr(vendor.default_currency),
  default_price_list: coerceToStr(vendor.default_price_list),
  default_bank_account: coerceToStr(vendor.default_bank_account),
  is_internal_supplier: vendor.is_internal_supplier ?? 0,
  tax_id: coerceToStr(vendor.tax_id),
  tax_category: coerceToStr(vendor.tax_category),
  tax_withholding_category: coerceToStr(vendor.tax_withholding_category),
  supplier_primary_address: coerceToStr(vendor.supplier_primary_address),
  supplier_primary_contact: coerceToStr(vendor.supplier_primary_contact),
  companies: [],
  accounts: [],
});
