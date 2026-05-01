import type { LucideIcon } from "lucide-react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type VendorSummaryCardItem = {
  key: string
  label: string
  value: number
  icon: LucideIcon
}

interface VendorSummaryCardsProps {
  items: VendorSummaryCardItem[]
}

export function VendorSummaryCards({ items }: VendorSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item, index) => {
        const Icon = item.icon
        const isSpecial = index === 3

        return (
          <Card
            key={item.key}
            className={cn(
              "border-none shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] rounded-[20px]",
              isSpecial ? "bg-[#0b945c]" : "bg-white"
            )}
          >
            <div className="flex items-center justify-between gap-4 p-5 sm:px-6 sm:py-4">
              <div className="space-y-1">
                <p className={cn(
                  "text-sm font-medium",
                  isSpecial ? "text-emerald-50/90" : "text-[#8794A1]"
                )}>
                  {item.label}
                </p>
                <p className={cn(
                  "text-2xl font-bold tracking-tight sm:text-3xl",
                  isSpecial ? "text-white" : "text-[#111827]"
                )}>
                  {item.value}
                </p>
              </div>
              <div className={cn(
                "flex h-11 w-11 sm:h-11.5 sm:w-11.5 items-center justify-center rounded-[14px]",
                isSpecial ? "bg-white/10 text-white" : "bg-[#F0F9F5] text-[#0b945c]"
              )}>
                <Icon className="size-5 sm:size-5.5" strokeWidth={2} />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
