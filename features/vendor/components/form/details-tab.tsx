import { Controller, useFormContext } from "react-hook-form"
import { CreateVendorFormValues, SUPPLIER_TYPES } from "@/features/vendor/utils/schema"
import { CustomInput } from "@/components/form/custom-input"
import { CustomLabel } from "@/components/form/custom-label"
import { CustomCheckbox } from "@/components/form/custom-checkbox"
import SimpleSelect from "@/components/form/simple-select"
import { ChoiceSelect } from "../choice-select"

export function DetailsTab() {
  const { control } = useFormContext<CreateVendorFormValues>();

  return (
    <div className="space-y-8 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div className="flex flex-col gap-2">
          <CustomLabel label="Supplier Name" />
          <Controller
            control={control}
            name="supplier_name"
            render={({ field, fieldState }) => (
              <CustomInput {...field} placeholder="Enter Supplier Name" errorMessage={fieldState.error?.message} />
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <CustomLabel label="Supplier Group" />
          <Controller
            control={control}
            name="supplier_group"
            render={({ field, fieldState }) => (
              <ChoiceSelect 
                choiceType="supplier_group"
                value={field.value} 
                onChange={field.onChange}
                placeholder="Select Supplier Group" 
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <CustomLabel label="Country" />
          <Controller
            control={control}
            name="country"
            render={({ field, fieldState }) => (
              <CustomInput {...field} placeholder="Enter Country" errorMessage={fieldState.error?.message} />
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <CustomLabel label="Supplier Type" />
          <Controller
            control={control}
            name="supplier_type"
            render={({ field, fieldState }) => (
              <SimpleSelect
                value={field.value}
                onChange={field.onChange}
                options={SUPPLIER_TYPES.map((supplierType) => ({
                  value: supplierType,
                  label: supplierType,
                }))}
                placeholder="Select Supplier Type" 
                className="w-full flex h-10.5 min-h-10.5 data-[size=default]:h-10.5 items-center justify-between rounded-md border border-gray/30 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-placeholder:text-muted-foreground/50"
                itemClassName="h-10 cursor-pointer"
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <div className="mt-2">
            <Controller
              control={control}
              name="is_transporter"
              render={({ field, fieldState }) => (
                <CustomCheckbox 
                  variant="withLabel" 
                  label="Is Transporter?" 
                  checked={field.value === 1}
                  onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="font-semibold text-base text-foreground">Defaults</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="flex flex-col gap-2">
            <CustomLabel label="Billing Currency" />
            <Controller
              control={control}
              name="default_currency"
              render={({ field, fieldState }) => (
                <ChoiceSelect 
                  choiceType="currency"
                  value={field.value} 
                  onChange={field.onChange}
                  placeholder="Select Billing Currency" 
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <CustomLabel label="Price List" />
            <Controller
              control={control}
              name="default_price_list"
              render={({ field, fieldState }) => (
                <ChoiceSelect 
                  choiceType="price_list"
                  value={field.value} 
                  onChange={field.onChange}
                  placeholder="Select Price List" 
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <CustomLabel label="Default Company Bank Account" />
            <Controller
              control={control}
              name="default_bank_account"
              render={({ field, fieldState }) => (
                <ChoiceSelect 
                  choiceType="bank_account"
                  value={field.value} 
                  onChange={field.onChange}
                  placeholder="Select Company Bank Account" 
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Controller
          control={control}
          name="is_internal_supplier"
          render={({ field, fieldState }) => (
            <CustomCheckbox 
              variant="withLabel" 
              label="Internal Supplier" 
              id="internal-supplier"
              checked={field.value === 1}
              onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
      </div>
    </div>
  )
}
