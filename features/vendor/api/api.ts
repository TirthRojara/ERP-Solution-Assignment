import api from "@/lib/axios/client";
import qs from "qs";
import { ApiResponse } from "@/types/api";
import { CreateVendorFormValues, UpdateVendorFormValues } from "@/features/vendor/utils/schema";
import {
    CreateVendorRequest,
    CreateVendorResponse,
    UpdateVendorRequest,
    VendorChoiceItem,
    VendorChoiceKey,
    VendorListItem,
    VendorListParams,
    VendorMutationDoc,
    VendorsListResponse,
} from "./types";


const buildVendorChoicePayload = (choiceType: VendorChoiceKey) => {
    const base = {
        txt: "",
        page_length: 10,
        reference_doctype: "Supplier",
    };

    switch (choiceType) {
        case "supplier_group":
            return {
                ...base,
                doctype: "Supplier Group",
                ignore_user_permissions: 0,
                filters: JSON.stringify({
                    is_group: ["=", 0],
                }),
            };
        case "price_list":
            return {
                ...base,
                doctype: "Price List",
                ignore_user_permissions: 1,
                filters: JSON.stringify({
                    buying: 1,
                }),
            };
        case "currency":
            return {
                ...base,
                doctype: "Currency",
                ignore_user_permissions: 1,
            };
        case "bank_account":
            return {
                ...base,
                doctype: "Bank Account",
                ignore_user_permissions: 0,
                filters: JSON.stringify({
                    is_company_account: 1,
                }),
            };
        case "tax_category":
            return {
                ...base,
                doctype: "Tax Category",
                ignore_user_permissions: 0,
            };
        case "tax_withholding_category":
            return {
                ...base,
                doctype: "Tax Withholding Category",
                ignore_user_permissions: 0,
            };
        case "vendor_addresses":
            return {
                ...base,
                doctype: "Address",
                ignore_user_permissions: 0,
                query: "erpnext.buying.doctype.supplier.supplier.get_supplier_primary",
                filters: JSON.stringify({
                    supplier: "Test Supplier",
                    type: "Address",
                }),
            };
        case "vendor_contact":
            return {
                ...base,
                doctype: "Contact",
                ignore_user_permissions: 0,
                query: "erpnext.buying.doctype.supplier.supplier.get_supplier_primary",
                filters: JSON.stringify({
                    supplier: "Test Supplier",
                    type: "Contact",
                }),
            };
        case "company":
            return {
                ...base,
                doctype: "Company",
                ignore_user_permissions: 1,
                reference_doctype: "Party Account",
            };
        case "default_account":
            return {
                ...base,
                doctype: "Account",
                ignore_user_permissions: 0,
                reference_doctype: "Party Account",
                filters: JSON.stringify({
                    account_type: "Payable",
                    root_type: "Liability",
                    company: "Fortwall International Contracting Company",
                    is_group: 0,
                }),
            };
    }
};


export const getVendorList = async (query: VendorListParams): Promise<VendorListItem[]> => {
    const filters: any[] = [];

    if (query.search) {
        filters.push(
            ["Supplier", "supplier_name", "like", `%${query.search}%`]
        );
    }

    const fields = [
        "name",
        "owner",
        "creation",
        "modified",
        "modified_by",
        "docstatus",
        "idx",
        "disabled",
        "naming_series",
        "supplier_name",
        "supplier_group",
        "country",
        "supplier_type",
        "is_transporter",
        "default_currency",
        "default_price_list",
        "default_bank_account",
        "is_internal_supplier",
        "represents_company",
        "supplier_details",
        "website",
        "language",
        "tax_id",
        "tax_category",
        "tax_withholding_category",
        "supplier_primary_address",
        "supplier_primary_contact",
        "allow_purchase_invoice_creation_without_purchase_order",
        "allow_purchase_invoice_creation_without_purchase_receipt",
        "is_frozen",
        "warn_rfqs",
        "warn_pos",
        "prevent_rfqs",
        "prevent_pos",
        "on_hold",
        "hold_type",
        "default_bank_account",
    ];

    const payload = qs.stringify({
        doctype: "Supplier",
        fields: JSON.stringify(fields),
        filters: JSON.stringify(filters),
        order_by: query.sort || "modified desc",
        start: 0,
        page_length: 20,
    });

    const res = await api.post<ApiResponse<VendorsListResponse | []>>("/api/method/frappe.desk.reportview.get", payload);

    const message = res.data.message;

    if (!message || Array.isArray(message)) {
        return [];
    }

    const { keys, values } = message;

    if (!Array.isArray(keys) || !Array.isArray(values)) {
        throw new Error("Invalid response format");
    }

    const vendors = values.reduce((accumulator: VendorListItem[], row: any[]) => {
        const item = keys.reduce((record: Record<string, any>, key: string, index: number) => {
            record[key] = row[index];
            return record;
        }, {});

        accumulator.push(item as VendorListItem);
        return accumulator;
    }, []);

    return vendors;
}

export const getVendorChoice = async (choiceType: VendorChoiceKey): Promise<VendorChoiceItem[]> => {
    const requestPayload = qs.stringify(buildVendorChoicePayload(choiceType));

    const res = await api.post<ApiResponse<VendorChoiceItem[]>>(
        "/api/method/frappe.desk.search.search_link",
        requestPayload
    );

    return res.data.message ?? [];
};

const composeVendorDoc = (values: CreateVendorFormValues): VendorMutationDoc => {
    const { companies, accounts, ...supplierValues } = values;

    return {
        ...supplierValues,
        companies: companies.map((company) => ({
            company,
            doctype: "Supplier Company" as const,
        })),
        accounts: accounts.map((account) => ({
            account,
            doctype: "Supplier Account" as const,
        })),
    };
};

export const createVendor = async (values: CreateVendorFormValues): Promise<CreateVendorResponse> => {
    const requestBody: CreateVendorRequest = {
        doc: {
            ...composeVendorDoc(values),
            doctype: "Supplier",
            __unsaved: 1,
        },
        action: "Save",
    };

    const payload = qs.stringify({
        doc: JSON.stringify(requestBody.doc),
        action: requestBody.action,
    });

    const res = await api.post<CreateVendorResponse>(
        "/api/method/frappe.desk.form.save.savedocs",
        payload
    );

    return res.data;
};

export const updateVendor = async (values: UpdateVendorFormValues, vendor: VendorListItem): Promise<CreateVendorResponse> => {
    const requestBody: UpdateVendorRequest = {
        doc: {
            ...composeVendorDoc(values as any),
            doctype: "Supplier",
            name: vendor.name,
            modified: vendor.modified,
            creation: vendor.creation,
            owner: vendor.owner,
            modified_by: vendor.modified_by,
            docstatus: vendor.docstatus,
            idx: vendor.idx,
            naming_series: vendor.naming_series,
            disabled: vendor.disabled,
            __unsaved: 0,
        },
        action: "Save",
    };

    const payload = qs.stringify({
        doc: JSON.stringify(requestBody.doc),
        action: requestBody.action,
    });

    const res = await api.post<CreateVendorResponse>(
        "/api/method/frappe.desk.form.save.savedocs",
        payload
    );

    return res.data;
};