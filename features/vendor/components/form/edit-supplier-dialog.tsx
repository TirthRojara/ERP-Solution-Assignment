"use client";

import { type ReactNode, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUpdateVendorMutation } from "@/features/vendor/api/hooks";
import {
    updateVendorSchema,
    convertVendorListToFormValues,
    UpdateVendorFormValues,
} from "@/features/vendor/utils/schema";
import { VendorListItem } from "@/features/vendor/api/types";
import { DetailsTab } from "./details-tab";
import { TaxTab } from "./tax-tab";
import { AddressTab } from "./address-tab";
import { AccountingTab } from "./accounting-tab";

interface EditSupplierDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    vendor: VendorListItem | null;
}

export function EditSupplierDialog({ open, onOpenChange, vendor }: EditSupplierDialogProps) {
    const [isHydrated, setIsHydrated] = useState(false);
    const form = useForm<UpdateVendorFormValues>({
        resolver: zodResolver(updateVendorSchema),
        defaultValues: {
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
            accounts: [],
        },
    });

    const updateVendor = useUpdateVendorMutation(
        vendor,
        {
            onSuccess: () => {
                onOpenChange(false);
                form.reset();
            },
        }
    );

    // Hydrate form with vendor data
    useEffect(() => {
        if (open && vendor && !isHydrated) {
            const values = convertVendorListToFormValues(vendor);
            form.reset(values);
            setIsHydrated(true);
        }
    }, [open, vendor, isHydrated, form]);

    // Reset hydrated state when dialog closes or vendor changes
    useEffect(() => {
        if (!open) {
            setIsHydrated(false);
        }
    }, [open]);

    const onSubmit = async (data: UpdateVendorFormValues) => {
        if (!vendor) return;
        updateVendor.mutate(data);
    };

    if (!vendor) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl p-6 gap-6 max-h-[90vh] flex flex-col">
                <DialogHeader className="shrink-0">
                    <DialogTitle className="text-lg font-semibold">Edit Supplier</DialogTitle>
                </DialogHeader>

                {isHydrated && (
                    <FormProvider {...form}>
                        <form
                            id="vendor-edit-form"
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full flex flex-col flex-1 overflow-hidden border border-gray/20 rounded-xl"
                        >
                            <Tabs defaultValue="details" className="w-full flex flex-col flex-1 overflow-hidden">
                                <div className="px-6 pt-4 shrink-0 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                                    <TabsList className="w-max min-w-full justify-start gap-1 pb-0 bg-transparent h-auto p-0 rounded-none">
                                        <TabTriggerWrapper value="details">Details</TabTriggerWrapper>
                                        <TabTriggerWrapper value="tax">Tax</TabTriggerWrapper>
                                        <TabTriggerWrapper value="address">Address & Contact</TabTriggerWrapper>
                                        <TabTriggerWrapper value="accounting">Accounting</TabTriggerWrapper>
                                    </TabsList>
                                </div>

                                <div className="flex-1 overflow-y-auto px-6 pt-6 pb-6">
                                    <TabsContent value="details" className="mt-0">
                                        <DetailsTab />
                                    </TabsContent>

                                    <TabsContent value="tax" className="mt-0">
                                        <TaxTab />
                                    </TabsContent>

                                    <TabsContent value="address" className="mt-0">
                                        <AddressTab />
                                    </TabsContent>

                                    <TabsContent value="accounting" className="mt-0">
                                        <AccountingTab />
                                    </TabsContent>
                                </div>

                                <DialogFooter className="m-0! p-4 border-0 border-gray/20 bg-background shrink-0 rounded-b-xl">
                                    <Button
                                        variant="outline"
                                        type="button"
                                        className="px-8"
                                        onClick={() => onOpenChange(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="px-8" disabled={updateVendor.isPending}>
                                        {updateVendor.isPending ? "Saving..." : "Save Changes"}
                                    </Button>
                                </DialogFooter>
                            </Tabs>
                        </form>
                    </FormProvider>
                )}
            </DialogContent>
        </Dialog>
    );
}

const TabTriggerWrapper = ({ children, value }: { children: ReactNode; value: string }) => {
    return (
        <TabsTrigger
            value={value}
            className="flex-none! px-3 pb-1 border-0! border-b-2! border-transparent! data-[state=active]:border-primary! data-[state=active]:text-primary! data-active:border-primary! data-active:text-primary! hover:text-primary rounded-none! after:hidden! bg-transparent shadow-none data-[state=active]:shadow-none data-[state=active]:bg-transparent"
        >
            {children}
        </TabsTrigger>
    );
};
