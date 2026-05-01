import { Card } from "@/components/ui/card"
import { Users, CheckCircle, CreditCard, AlertCircle } from "lucide-react"

export interface VendorStatCard {
  id: string
  label: string
  value: number
  icon: React.ComponentType<{ className?: string }>
  color?: "primary" | "success" | "warning" | "destructive"
}

interface VendorStatsCardsProps {
  stats: VendorStatCard[]
}

export function VendorStatsCards({ stats }: VendorStatsCardsProps) {
  const colorClasses = {
    primary: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
    success: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400",
    warning: "bg-yellow-50 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400",
    destructive:
      "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400",
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        const bgColor = colorClasses[stat.color || "primary"]

        return (
          <Card
            key={stat.id}
            className="flex flex-col items-start justify-between gap-4 p-6"
          >
            <div className="flex w-full items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={`rounded-lg p-2 ${bgColor}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
