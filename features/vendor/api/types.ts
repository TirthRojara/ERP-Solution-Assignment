
import { CreateVendorFormValues } from "@/features/vendor/utils/schema";

export type VendorListParams = {
    search?: string,
    sort?: string,
}

export type VendorChoiceKey =
    | 'supplier_group'
    | 'price_list'
    | 'currency'
    | 'bank_account'
    | 'tax_category'
    | 'tax_withholding_category'
    | 'vendor_addresses'
    | 'vendor_contact'
    | 'company'
    | 'default_account';

export type VendorChoiceItem = {
    value: string;
    description: string;
    label?: string;
};

export type VendorsListResponse = {
    keys: string[],
    values: Array<Array<string | number | null>>,
    user_info: Record<any, any>,
};

export type VendorListItem = {
    name: string;
    owner: string;
    creation: string;
    modified: string;
    modified_by: string;
    docstatus: number;
    idx: number;
    disabled: 0 | 1;
    naming_series: string;
    supplier_name: string;
    supplier_group: string;
    country: string;
    supplier_type: string;
    is_transporter: 0 | 1;
    default_currency: string;
    default_price_list: string;
    default_bank_account: string | null;
    is_internal_supplier: 0 | 1;
    represents_company: string | null;
    supplier_details: string | null;
    website: string | null;
    language: string | null;
    tax_id: string | null;
    tax_category: string | null;
    tax_withholding_category: string | null;
    supplier_primary_address: string | null;
    supplier_primary_contact: string | null;
    allow_purchase_invoice_creation_without_purchase_order: 0 | 1;
    allow_purchase_invoice_creation_without_purchase_receipt: 0 | 1;
    is_frozen: 0 | 1;
    warn_rfqs: 0 | 1;
    warn_pos: 0 | 1;
    prevent_rfqs: 0 | 1;
    prevent_pos: 0 | 1;
    on_hold: 0 | 1;
    hold_type: string;
};


export type VendorAccountLink = {
    account: string;
    doctype: "Supplier Account";
};

export type VendorCompanyLink = {
    company: string;
    doctype: "Supplier Company";
};

export type VendorMutationDoc = Omit<CreateVendorFormValues, "companies" | "accounts"> & {
    companies: VendorCompanyLink[];
    accounts: VendorAccountLink[];
};

export type CreateVendorRequest = {
    doc: VendorMutationDoc & {
        doctype: "Supplier";
        __unsaved: 1;
    };
    action: "Save";
};

export type UpdateVendorRequest = {
    doc: VendorMutationDoc & {
        doctype: "Supplier";
        name: string;
        modified: string;
        creation: string;
        owner: string;
        modified_by: string;
        docstatus: number;
        idx: number;
        naming_series: string;
        disabled: 0 | 1;
        __unsaved: 0;
    };
    action: "Save";
};

export interface VendorOnloadData {
    addr_list: unknown[];
    contact_list: unknown[];
    dashboard_info: unknown[];
}

export interface VendorDoc {
    name: string;
    owner: string;
    creation: string;
    modified: string;
    modified_by: string;
    docstatus: number;
    idx: number;
    doctype: "Supplier";
    naming_series: string;
    supplier_name: string;
    supplier_group: string;
    supplier_type: string;
    country: string;
    default_currency: string;
    default_price_list: string;
    default_bank_account: string | null;
    is_transporter: 0 | 1;
    is_internal_supplier: 0 | 1;
    represents_company: string;
    supplier_details: string | null;
    website: string | null;
    language: string;
    tax_id: string | null;
    tax_category: string | null;
    tax_withholding_category: string | null;
    supplier_primary_address: string | null;
    primary_address: string | null;
    supplier_primary_contact: string | null;
    mobile_no: string | null;
    email_id: string | null;
    payment_terms: string | null;
    allow_purchase_invoice_creation_without_purchase_order: 0 | 1;
    allow_purchase_invoice_creation_without_purchase_receipt: 0 | 1;
    is_frozen: 0 | 1;
    disabled: 0 | 1;
    warn_rfqs: 0 | 1;
    warn_pos: 0 | 1;
    prevent_rfqs: 0 | 1;
    prevent_pos: 0 | 1;
    on_hold: 0 | 1;
    hold_type: string;
    release_date: string | null;
    accounts: string[];
    companies: string[];
    portal_users: unknown[];
    __onload: VendorOnloadData;
}

export interface VendorDocInfoUser {
    fullname: string;
    image: string | null;
    name: string;
    email: string;
    time_zone: string;
}

export interface VendorDocPermissions {
    select: number;
    read: number;
    write: number;
    create: number;
    delete: number;
    submit: number;
    cancel: number;
    amend: number;
    print: number;
    email: number;
    report: number;
    import: number;
    export: number;
    share: number;
}

export interface VendorDocInfo {
    user_info: Record<string, VendorDocInfoUser>;
    comments: unknown[];
    shared: unknown[];
    assignment_logs: unknown[];
    attachment_logs: unknown[];
    info_logs: unknown[];
    like_logs: unknown[];
    workflow_logs: unknown[];
    doctype: "Supplier";
    name: string;
    attachments: unknown[];
    communications: unknown[];
    automated_messages: unknown[];
    versions: unknown[];
    assignments: unknown[];
    permissions: VendorDocPermissions;
    views: unknown[];
    energy_point_logs: unknown[];
    additional_timeline_content: unknown[];
    milestones: unknown[];
    is_document_followed: boolean | null;
    tags: string;
    document_email: string | null;
}

export interface CreateVendorResponse {
    docs: VendorDoc[];
    docinfo: VendorDocInfo;
    _server_messages: string;
}
