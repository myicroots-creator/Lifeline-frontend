"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, MoreHorizontal } from "lucide-react"

const mockInventory = [
  { id: 1, bloodType: "A+", units: 145, expiry: "2025-02-15", status: "safe" },
  { id: 2, bloodType: "A-", units: 32, expiry: "2025-02-10", status: "low" },
  { id: 3, bloodType: "B+", units: 98, expiry: "2025-02-20", status: "safe" },
  { id: 4, bloodType: "B-", units: 18, expiry: "2025-02-08", status: "critical" },
  { id: 5, bloodType: "AB+", units: 67, expiry: "2025-02-18", status: "safe" },
  { id: 6, bloodType: "AB-", units: 12, expiry: "2025-02-05", status: "critical" },
  { id: 7, bloodType: "O+", units: 234, expiry: "2025-02-25", status: "safe" },
  { id: 8, bloodType: "O-", units: 28, expiry: "2025-02-12", status: "low" },
]

export function InventoryTable() {
  const [search, setSearch] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
        return "bg-accent/20 text-accent border-accent/30"
      case "low":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
      case "critical":
        return "bg-primary/20 text-primary border-primary/30"
      default:
        return ""
    }
  }

  const filteredInventory = mockInventory.filter((item) => item.bloodType.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search blood type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Blood Type</TableHead>
              <TableHead>Units Available</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium font-mono">{item.bloodType}</TableCell>
                <TableCell>{item.units}</TableCell>
                <TableCell>{item.expiry}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
