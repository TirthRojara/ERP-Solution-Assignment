"use client"

import { useMemo, useState } from "react"
import { SearchX } from "lucide-react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { VendorListItem } from "@/features/vendor/api/types"

import { buildVendorColumns, createVendorEditColumn } from "@/components/vendor/vendor-columns"

interface VendorRecordTableProps {
  rows: VendorListItem[],
  onEdit?: (vendor: VendorListItem) => void
}

export function VendorRecordTable({ rows, onEdit }: VendorRecordTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo<ColumnDef<VendorListItem>[]>(() => {
    return [...buildVendorColumns(), onEdit ? createVendorEditColumn(onEdit) : createVendorEditColumn(() => {})]
  }, [onEdit])

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  })

  return (
    <div className="overflow-hidden">
      <Table className="border">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-b border-border/60 bg-muted/30 hover:bg-muted/30">
              {headerGroup.headers.map((header) => {
                const meta = header.column.columnDef.meta as { className?: string } | undefined

                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "h-11 border-r border-border/60 px-4 text-xs font-semibold text-foreground last:border-r-0",
                      meta?.className
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="border-b border-border/60 hover:bg-muted/25">
                {row.getVisibleCells().map((cell) => {
                  const meta = cell.column.columnDef.meta as { className?: string } | undefined

                  return (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "border-r border-border/60 px-4 py-3 text-sm text-foreground last:border-r-0",
                        meta?.className
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-100">
                <div className="sticky left-1/2 flex w-[calc(100vw-3rem)] max-w-[320px] -translate-x-1/2 flex-col items-center justify-center space-y-3 text-center sm:w-max sm:max-w-none">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <SearchX className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-medium text-foreground">No vendors found</p>
                    <p className="text-sm text-muted-foreground">
                      We couldn't find any vendors matching your criteria.
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

