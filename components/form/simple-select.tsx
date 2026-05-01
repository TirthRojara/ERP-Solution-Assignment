"use client"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

import { FieldDescription } from "@/components/ui/field"

type Option = { value: string; label: string }

interface SimpleSelectProps {
  value?: string
  onChange?: (value: string) => void
  options: Option[]
  placeholder?: string
  size?: "sm" | "default"
  className?: string
  itemClassName?: string
  errorMessage?: string
}

export default function SimpleSelect({
  value,
  onChange,
  options,
  placeholder = "Select",
  size = "default",
  className,
  itemClassName,
  errorMessage,
}: SimpleSelectProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <Select value={value ?? ""} onValueChange={(v) => onChange?.(v)}>
        <SelectTrigger size={size} className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options
            .filter((opt) => opt.value !== "")
            .map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className={itemClassName}>
                {opt.label}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      {errorMessage && (
        <FieldDescription className="text-destructive">
          {errorMessage}
        </FieldDescription>
      )}
    </div>
  )
}
