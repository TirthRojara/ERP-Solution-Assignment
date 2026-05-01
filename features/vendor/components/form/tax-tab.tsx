import { Controller, useFormContext } from "react-hook-form"
import { CreateVendorFormValues } from "@/features/vendor/utils/schema"
import { CustomInput } from "@/components/form/custom-input"
import { CustomLabel } from "@/components/form/custom-label"
import { ChoiceSelect } from "../choice-select"

export function TaxTab() {
  const { control } = useFormContext<CreateVendorFormValues>();

  return (
    <div className="space-y-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div className="flex flex-col gap-2">
          <CustomLabel label="Tax ID" />
          <Controller
            control={control}
            name="tax_id"
            render={({ field, fieldState }) => (
              <CustomInput {...field} placeholder="Enter Tax ID" errorMessage={fieldState.error?.message} />
            )}
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <CustomLabel label="Tax Category" />
          <Controller
            control={control}
            name="tax_category"
            render={({ field, fieldState }) => (
              <ChoiceSelect 
                choiceType="tax_category"
                value={field.value} 
                onChange={field.onChange}
                placeholder="Select Tax Category" 
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </div>
        
        <div className="hidden md:block"></div>
        
        <div className="flex flex-col gap-2">
          <CustomLabel label="Tax Withholding Category" />
          <Controller
            control={control}
            name="tax_withholding_category"
            render={({ field, fieldState }) => (
              <ChoiceSelect 
                choiceType="tax_withholding_category"
                value={field.value} 
                onChange={field.onChange}
                placeholder="Select Tax Withholding Category" 
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </div>
      </div>
    </div>
  )
}
