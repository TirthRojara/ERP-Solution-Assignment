import { Controller, useFormContext } from "react-hook-form"
import { CreateVendorFormValues } from "../../utils/schema"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Settings, Plus, Trash2 } from "lucide-react"
import { ChoiceSelect } from "../choice-select"

export function AccountingTab() {
  const { control, watch, setValue } = useFormContext<CreateVendorFormValues>();
  
  const companies = watch("companies") || [];
  const accounts = watch("accounts") || [];
  
  const rowCount = Math.max(companies.length, accounts.length);
  const rows = Array.from({ length: rowCount });

  const onAddRow = () => {
    setValue("companies", [...companies, ""]);
    setValue("accounts", [...accounts, ""]);
  };

  const onRemoveRow = (index: number) => {
    setValue("companies", companies.filter((_, i) => i !== index));
    setValue("accounts", accounts.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 mt-6">
      <div>
        <h3 className="font-semibold text-base text-foreground">Default Accounts</h3>
      </div>

      <div className="space-y-4">
        <div>
          {/* <h4 className="font-medium text-sm text-foreground">Accounts</h4> */}
          <p className="text-[13px] text-muted-foreground mt-1">
            Mention if non-standars payable account
          </p>
        </div>

        <div className="border border-gray/20 rounded-xl overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[600px] sm:min-w-full">
            <thead className="border-b border-gray/20 bg-transparent">
              <tr className="divide-x divide-gray/10">
                <th className="px-4 py-3 w-12 font-medium"><Checkbox className="border-gray/30 rounded-sm" /></th>
                <th className="px-4 py-3 font-medium w-16">No.</th>
                <th className="px-4 py-3 font-medium min-w-50">Company</th>
                <th className="px-4 py-3 font-medium min-w-50">Default Account</th>
                <th className="px-4 py-3 w-12 text-center"><Settings className="w-4 h-4 inline-block text-foreground" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray/10">
              {rows.length > 0 ? (
                rows.map((_, index) => (
                  <tr key={index} className="hover:bg-gray/5 transition-colors divide-x divide-gray/10">
                    <td className="px-4 py-3"><Checkbox className="border-gray/30 rounded-sm" /></td>
                    <td className="px-4 py-3 text-muted-foreground">{index + 1}</td>
                    <td className="px-4 py-3">
                      <Controller 
                        control={control}
                        name={`companies.${index}`}
                        render={({ field, fieldState }) => (
                          <ChoiceSelect 
                            choiceType="company"
                            value={field.value} 
                            onChange={field.onChange}
                            placeholder="Select Company" 
                            className="bg-transparent border-none! shadow-none!"
                            errorMessage={fieldState.error?.message}
                          />
                        )}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Controller 
                        control={control}
                        name={`accounts.${index}`}
                        render={({ field, fieldState }) => (
                          <ChoiceSelect 
                            choiceType="default_account"
                            value={field.value} 
                            onChange={field.onChange}
                            placeholder="Select Account" 
                            className="bg-transparent border-none! shadow-none!"
                            errorMessage={fieldState.error?.message}
                          />
                        )}
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => onRemoveRow(index)}>
                        <Trash2 className="w-4 h-4 cursor-pointer" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="hover:bg-gray/5 transition-colors divide-x divide-gray/10">
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    No items added
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Button type="button" variant="outline" size="sm" className="h-9 px-4 text-xs" onClick={onAddRow}>
          Add Row <Plus className="w-3 h-3 ml-2" />
        </Button>
      </div>
    </div>
  )
}
