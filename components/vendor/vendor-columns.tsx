"use client"

import type { Column, ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { VendorListItem } from "@/features/vendor/api/types"

const showOrDash = (value: unknown) => {
  if (value === null || value === undefined || value === "") {
    return "—"
  }

  return String(value)
}

const renderChip = (
  value: unknown,
  activeLabel: string,
  inactiveLabel: string,
  activeClassName: string,
  inactiveClassName: string
) => {
  const isActive = Boolean(Number(value))

  return (
    <span
      className={[
        "inline-flex min-w-20 items-center justify-center rounded-full px-2.5 py-1 text-xs font-medium",
        isActive ? activeClassName : inactiveClassName,
      ].join(" ")}
    >
      {isActive ? activeLabel : inactiveLabel}
    </span>
  )
}

const SortLabel = ({ column, title }: { column: Column<VendorListItem, unknown>; title: string }) => (
  <button
    type="button"
    className="flex w-full items-center justify-between gap-2 text-left"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    <span>{title}</span>
    <ArrowUpDown className="size-3.5 shrink-0 text-muted-foreground/60" />
  </button>
)

export const buildVendorColumns = (): ColumnDef<VendorListItem>[] => [
  {
    id: "row_index",
    header: "#",
    enableSorting: false,
    meta: { className: "w-16 min-w-[64px]" },
    cell: ({ row }) => <span className="font-medium text-muted-foreground">{row.index + 1}</span>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortLabel column={column} title="Supplier Code" />,
    meta: { className: "min-w-[140px]" },
  },
  {
    accessorKey: "supplier_name",
    header: ({ column }) => <SortLabel column={column} title="Supplier Name" />,
    meta: { className: "min-w-[220px]" },
  },
  {
    accessorKey: "supplier_group",
    header: ({ column }) => <SortLabel column={column} title="Supplier Group" />,
    meta: { className: "min-w-[170px]" },
  },
  {
    accessorKey: "supplier_type",
    header: ({ column }) => <SortLabel column={column} title="Supplier Type" />,
    meta: { className: "min-w-[150px]" },
  },
  {
    accessorKey: "country",
    header: ({ column }) => <SortLabel column={column} title="Country" />,
    meta: { className: "min-w-[130px]" },
  },
  {
    accessorKey: "default_currency",
    header: ({ column }) => <SortLabel column={column} title="Currency" />,
    meta: { className: "min-w-[120px]" },
  },
  {
    accessorKey: "default_price_list",
    header: ({ column }) => <SortLabel column={column} title="Price List" />,
    meta: { className: "min-w-[160px]" },
    cell: ({ row }) => showOrDash(row.getValue("default_price_list")),
  },
  {
    accessorKey: "default_bank_account",
    header: ({ column }) => <SortLabel column={column} title="Bank Account" />,
    meta: { className: "min-w-[180px]" },
    cell: ({ row }) => showOrDash(row.getValue("default_bank_account")),
  },
  {
    accessorKey: "supplier_primary_contact",
    header: ({ column }) => <SortLabel column={column} title="Primary Contact" />,
    meta: { className: "min-w-[180px]" },
    cell: ({ row }) => showOrDash(row.getValue("supplier_primary_contact")),
  },
  {
    accessorKey: "tax_category",
    header: ({ column }) => <SortLabel column={column} title="Tax Category" />,
    meta: { className: "min-w-[160px]" },
    cell: ({ row }) => showOrDash(row.getValue("tax_category")),
  },
  {
    accessorKey: "tax_withholding_category",
    header: ({ column }) => <SortLabel column={column} title="Withholding" />,
    meta: { className: "min-w-[150px]" },
    cell: ({ row }) => showOrDash(row.getValue("tax_withholding_category")),
  },
  {
    accessorKey: "is_internal_supplier",
    header: "Internal",
    enableSorting: false,
    meta: { className: "min-w-[120px]" },
    cell: ({ row }) =>
      renderChip(
        row.getValue<0 | 1>("is_internal_supplier"),
        "Internal",
        "External",
        "bg-sky-500/10 text-sky-700 dark:text-sky-300",
        "bg-muted text-muted-foreground"
      ),
  },
  {
    accessorKey: "disabled",
    header: "Status",
    enableSorting: false,
    meta: { className: "min-w-[120px]" },
    cell: ({ row }) =>
      renderChip(
        row.getValue<0 | 1>("disabled"),
        "Disabled",
        "Active",
        "bg-rose-500/10 text-rose-700 dark:text-rose-300",
        "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
      ),
  },
]

export const createVendorEditColumn = (onEdit: (vendor: VendorListItem) => void): ColumnDef<VendorListItem> => ({
  id: "edit",
  header: "Edit",
  enableSorting: false,
  meta: { className: "w-24 min-w-[96px]" },
  cell: ({ row }) => (
    <Button variant="outline" size="sm" className="h-8 gap-1.5" onClick={() => onEdit(row.original)}>
      Edit
    </Button>
  ),
})




