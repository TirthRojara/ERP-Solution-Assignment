"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DetailsTab } from "@/features/vendor/components/form/details-tab"
import { TaxTab } from "@/features/vendor/components/form/tax-tab"
import { AddressTab } from "@/features/vendor/components/form/address-tab"
import { AccountingTab } from "@/features/vendor/components/form/accounting-tab"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createVendorSchema, CreateVendorFormValues, defaultVendorValues } from "@/features/vendor/utils/schema"
import { useCreateVendorMutation } from "@/features/vendor/api/hooks"

interface NewSupplierDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}


export function NewSupplierDialog({ open, onOpenChange }: NewSupplierDialogProps = {}) {
  const form = useForm<CreateVendorFormValues>({
    resolver: zodResolver(createVendorSchema),
    defaultValues: defaultVendorValues,
  })

  const submitVendor = useCreateVendorMutation({
    onSuccess: () => onOpenChange?.(false),
  })

  const onSubmit = (data: CreateVendorFormValues) => {
    console.log({ data })
    submitVendor.mutate(data)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open === undefined && (
        <DialogTrigger asChild>
          <Button>New Supplier</Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-4xl p-6 gap-6 max-h-[90vh] flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-lg font-semibold">New Supplier</DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <form id="vendor-form" onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col flex-1 overflow-hidden border border-gray/20 rounded-xl">
            <Tabs defaultValue="details" className="w-full flex flex-col flex-1 overflow-hidden">
              <div className="px-6 pt-4 shrink-0 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                <TabsList className="w-max min-w-full justify-start gap-1 pb-0 bg-transparent h-auto p-0 rounded-none">
                  <TabTriggerWrapper value="details" >Details</TabTriggerWrapper>
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
                <Button variant="outline" type="button" className="px-8" onClick={() => onOpenChange?.(false)}>Cancel</Button>
                <Button type="submit" className="px-8" disabled={submitVendor.isPending}>Save</Button>
              </DialogFooter>
            </Tabs>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}



const TabTriggerWrapper = ({ children, value }: { children: React.ReactNode, value: string }) => {
  return (
    <TabsTrigger
      value={value}
      className="flex-none! px-3 pb-1 border-0! border-b-2! border-transparent! data-[state=active]:border-primary! data-[state=active]:text-primary! data-active:border-primary! data-active:text-primary! hover:text-primary rounded-none! after:hidden! bg-transparent shadow-none data-[state=active]:shadow-none data-[state=active]:bg-transparent"
    >
      {children}
    </TabsTrigger>
  )
}