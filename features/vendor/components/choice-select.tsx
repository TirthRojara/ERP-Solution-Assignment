"use client"

import { useMemo } from "react"
import SimpleSelect from "@/components/form/simple-select"
import { Skeleton } from "@/components/ui/skeleton"
import { useVendorChoice } from "@/features/vendor/api/hooks"
import { VendorChoiceKey } from "@/features/vendor/api/types"
import { cn } from "@/lib/utils"

interface ChoiceSelectProps {
  choiceType: VendorChoiceKey
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  excludeValues?: string[]
  className?: string
  errorMessage?: string
}

export function ChoiceSelect({ choiceType, className, errorMessage, excludeValues, label, value, ...props }: ChoiceSelectProps) {
  const { data: vendorChoices, error: vendorChoiceError, isLoading: vendorChoicesLoading } = useVendorChoice(choiceType)

  const selectOptions = useMemo(() => {
    const availableChoices = vendorChoices ?? []

    return availableChoices
      .map((choice) => ({
        value: choice.value,
        label: choice.description.trim() !== "" ? choice.description : choice.value,
      }))
      .filter((choice) => {
        if (choice.value === value) return true
        return !excludeValues?.includes(choice.value)
      })
  }, [excludeValues, value, vendorChoices])

  if (vendorChoicesLoading) {
    return <Skeleton className="h-10.5 w-full rounded-md" />
  }

  if (vendorChoiceError) {
    return (
      <div className="flex h-10.5 w-full items-center justify-center rounded-md bg-muted px-3 text-sm font-medium text-destructive">
        Unable to fetch {label ?? choiceType}
      </div>
    )
  }

  if (!vendorChoices?.length) {
    return (
      <div className="flex h-10.5 w-full items-center justify-center rounded-md bg-muted px-3 text-sm font-medium text-destructive">
        No {label ?? choiceType} found
      </div>
    )
  }

  return (
    <SimpleSelect
      value={value}
      {...props}
      options={selectOptions}
      errorMessage={errorMessage}
      className={cn(
        "w-full flex h-10.5 min-h-10.5 data-[size=default]:h-10.5 items-center justify-between rounded-md border border-gray/30 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-placeholder:text-muted-foreground/50",
        className
      )}
      itemClassName="h-10 cursor-pointer"
    />
  )
}
