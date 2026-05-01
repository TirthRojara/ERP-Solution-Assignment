import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Search } from "lucide-react"

export interface VendorTableRow {
  vendorCode: string
  vendorName: string
  paymentType: string
  contactName: string
  vendorType: string
  country: string
  currency: string
}

interface VendorTableProps {
  vendors: VendorTableRow[]
  onSearch?: (value: string) => void
  onCreateVendor?: () => void
  searchValue?: string
}

export function VendorTable({
  vendors,
  onSearch,
  onCreateVendor,
  searchValue = "",
}: VendorTableProps) {
  return (
    <div className="space-y-4">
      {/* Search and Create Button */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search vendors by name, code, contact..."
            className="pl-10"
            value={searchValue}
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
        <Button onClick={onCreateVendor} className="gap-2 bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4" />
          Create Vendor
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor Code</TableHead>
              <TableHead>Vendor Name</TableHead>
              <TableHead>Payment Type</TableHead>
              <TableHead>Contact Name</TableHead>
              <TableHead>Vendor Type</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Currency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.length > 0 ? (
              vendors.map((vendor, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{vendor.vendorCode}</TableCell>
                  <TableCell>{vendor.vendorName}</TableCell>
                  <TableCell>{vendor.paymentType}</TableCell>
                  <TableCell>{vendor.contactName}</TableCell>
                  <TableCell>{vendor.vendorType}</TableCell>
                  <TableCell>{vendor.country}</TableCell>
                  <TableCell>{vendor.currency}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  No vendors found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
