"use client"

import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SimpleSelect from "@/components/form/simple-select"

type VendorTableHeaderOption = {
  value: string
  label: string
}

interface VendorTableHeaderProps {
  title: string
  searchValue: string
  onSearchChange: (value: string) => void
  selectValue?: string
  onSelectChange: (value: string) => void
  selectOptions: VendorTableHeaderOption[]
  selectPlaceholder?: string
  onCreateClick?: () => void
  createLabel?: string
}

export function VendorTableHeader({
  title,
  searchValue,
  onSearchChange,
  selectValue,
  onSelectChange,
  selectOptions,
  selectPlaceholder = "All",
  onCreateClick,
  createLabel = "Create Vendor",
}: VendorTableHeaderProps) {
  return (
    <div className="border-0 border-border/60 bg-background p-4 sm:p-5">
      <div className="mb-3">
        <h2 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">{title}</h2>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-190">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search Vendors by name, code, contact..."
            className="h-10 rounded-md border-border/60 bg-white pl-9 text-sm shadow-sm placeholder:text-muted-foreground/70"
          />
        </div>

        <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-3">
          <div className="w-full sm:w-44">
            <SimpleSelect
              value={selectValue}
              onChange={onSelectChange}
              placeholder={selectPlaceholder}
              size="default"
              className="h-10 w-full rounded-md border-border/60 bg-white text-sm shadow-sm"
              itemClassName="h-10 cursor-pointer"
              options={selectOptions}
            />
          </div>

          <Button
            type="button"
            size="sm"
            className="h-9 shrink-0 rounded-md bg-emerald-600 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
            onClick={onCreateClick}
          >
            {createLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
