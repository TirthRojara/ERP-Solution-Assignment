import { Controller, useFormContext } from "react-hook-form"
import { CreateVendorFormValues } from "@/features/vendor/utils/schema"
import { CustomLabel } from "@/components/form/custom-label"
import { ChoiceSelect } from "../choice-select"

export function AddressTab() {
  const { control } = useFormContext<CreateVendorFormValues>();

  return (
    <div className="space-y-6 mt-6">
      <h3 className="font-semibold text-base text-foreground">Primary Address and Contact</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div className="flex flex-col gap-2">
          <CustomLabel label="Supplier Primary Address" />
          <Controller
            control={control}
            name="supplier_primary_address"
            render={({ field, fieldState }) => (
              <ChoiceSelect
                choiceType="vendor_addresses"
                value={field.value}
                onChange={field.onChange}
                placeholder="Select Primary Address"
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <span className="text-[13px] text-muted-foreground mt-1">
            Reselect if the chosen address is edited after save
          </span>
        </div>
        
        <div className="flex flex-col gap-2">
          <CustomLabel label="Supplier Primary Contact" />
          <Controller
            control={control}
            name="supplier_primary_contact"
            render={({ field, fieldState }) => (
              <ChoiceSelect
                choiceType="vendor_contact"
                value={field.value}
                onChange={field.onChange}
                placeholder="Select Primary Contact"
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <span className="text-[13px] text-muted-foreground mt-1">
            Reselect if the chosen contact is edited after save
          </span>
        </div>
      </div>
    </div>
  )
}
