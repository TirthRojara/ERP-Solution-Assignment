"use client"

import { useMemo, useState } from "react"
import { Check, CreditCard, Ban, Users, AlertCircle } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useDebounce } from "@/hooks/use-debounce"
import { useVendorList } from "@/features/vendor/api/hooks"
import type { VendorListItem } from "@/features/vendor/api/types"

import { VendorSummaryCards } from "@/features/vendor/components/vendor-summary-cards"
import { VendorRecordTable } from "@/features/vendor/components/vendor-record-table"
import { VendorTableHeader } from "@/features/vendor/components/vendor-table-header"
import { NewSupplierDialog } from "@/features/vendor/components/form/new-supplier-dialog"
import { EditSupplierDialog } from "@/features/vendor/components/form/edit-supplier-dialog"

const countBy = (
    rows: VendorListItem[] | undefined,
    predicate: (row: VendorListItem) => boolean
) => {
    if (!rows) return 0
    return rows.reduce((total, row) => total + (predicate(row) ? 1 : 0), 0)
}

export type VendorSort = "modified desc" | "modified asc" | "supplier_name asc" | "supplier_name desc"

export default function VendorPage() {
    const [searchText, setSearchText] = useState("")
    const [sortValue, setSortValue] = useState<VendorSort | undefined>(undefined)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [selectedVendor, setSelectedVendor] = useState<VendorListItem | null>(null)

    const debouncedSearchText = useDebounce(searchText, 450)

    const requestParams = useMemo(
        () => ({
            search: debouncedSearchText.trim() || undefined,
            sort: sortValue || undefined,
        }),
        [debouncedSearchText, sortValue]
    )

    const { data, error, isLoading } = useVendorList(requestParams)

    const cards = useMemo(() => {
        return [
            {
                key: "total-vendors",
                label: "Total Vendors",
                value: 5,
                icon: Users,
            },
            {
                key: "active-vendors",
                label: "Active Vendors",
                value: 5,
                icon: Check,
            },
            {
                key: "credit-vendors",
                label: "Credit Vendors",
                value: 3,
                icon: CreditCard,
            },
            {
                key: "inactive-vendors",
                label: "Inactive Vendors",
                value: 0,
                icon: Ban,
            },
        ]
    }, [])


    return (
        <div className="px-6 py-6 space-y-8">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">Vendor</h1>
                <p className="text-muted-foreground/50 text-sm">Manage and control all vendor operations</p>
            </div>

            <VendorSummaryCards items={cards} />

            <Card className="overflow-hidden border-border/60 shadow-sm">
                <VendorTableHeader
                    title="Vendor"
                    searchValue={searchText}
                    onSearchChange={setSearchText}
                    selectValue={sortValue}
                    onSelectChange={(value) => setSortValue(value ? (value as VendorSort) : undefined)}
                    selectPlaceholder="All"
                    selectOptions={[
                        { value: "modified desc", label: "Modified (newest)" },
                        { value: "modified asc", label: "Modified (oldest)" },
                        { value: "supplier_name asc", label: "Supplier Name (A → Z)" },
                        { value: "supplier_name desc", label: "Supplier Name (Z → A)" },
                    ]}
                    onCreateClick={() => setIsDialogOpen(true)}
                />

                <CardContent className="p-0">
                    {isLoading ? (
                        <div className="space-y-3 p-4 sm:p-5">
                            <Skeleton className="h-11 w-full" />
                            <Skeleton className="h-14 w-full" />
                            <Skeleton className="h-14 w-full" />
                            <Skeleton className="h-14 w-full" />
                            <Skeleton className="h-14 w-full" />
                            <Skeleton className="h-14 w-full" />
                        </div>
                    ) : error ? (
                        <div className="flex h-100 flex-col items-center justify-center space-y-3 p-4 text-center sm:p-5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                                <AlertCircle className="h-6 w-6 text-destructive" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-base font-medium text-foreground">Failed to load vendors</p>
                                <p className="text-sm text-muted-foreground">
                                    An error occurred while fetching the vendor list. Please try again.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="overflow-hidden p-4">
                            <VendorRecordTable rows={data ?? []} onEdit={(vendor) => { setSelectedVendor(vendor); setIsEditDialogOpen(true) }} />
                        </div>
                    )}
                </CardContent>
            </Card>

            <NewSupplierDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
            <EditSupplierDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} vendor={selectedVendor} />
        </div>
    )
}

