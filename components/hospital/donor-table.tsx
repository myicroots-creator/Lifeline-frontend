"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, MoreHorizontal } from "lucide-react"

const mockDonors = [
  { id: 1, name: "John Smith", bloodType: "A+", lastDonation: "2024-11-15", eligible: true, phone: "+1 555-0101" },
  { id: 2, name: "Sarah Johnson", bloodType: "O-", lastDonation: "2024-12-20", eligible: false, phone: "+1 555-0102" },
  { id: 3, name: "Michael Brown", bloodType: "B+", lastDonation: "2024-10-05", eligible: true, phone: "+1 555-0103" },
  { id: 4, name: "Emily Davis", bloodType: "AB+", lastDonation: "2024-11-28", eligible: true, phone: "+1 555-0104" },
  { id: 5, name: "David Wilson", bloodType: "A-", lastDonation: "2025-01-10", eligible: false, phone: "+1 555-0105" },
  { id: 6, name: "Lisa Anderson", bloodType: "O+", lastDonation: "2024-09-22", eligible: true, phone: "+1 555-0106" },
]

export function DonorTable() {
  const [search, setSearch] = useState("")

  const filteredDonors = mockDonors.filter(
    (donor) =>
      donor.name.toLowerCase().includes(search.toLowerCase()) ||
      donor.bloodType.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search donors..."
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
              <TableHead>Name</TableHead>
              <TableHead>Blood Type</TableHead>
              <TableHead>Last Donation</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDonors.map((donor) => (
              <TableRow key={donor.id}>
                <TableCell className="font-medium">{donor.name}</TableCell>
                <TableCell className="font-mono">{donor.bloodType}</TableCell>
                <TableCell>{donor.lastDonation}</TableCell>
                <TableCell className="text-muted-foreground">{donor.phone}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      donor.eligible
                        ? "bg-accent/20 text-accent border-accent/30"
                        : "bg-muted text-muted-foreground border-border"
                    }
                  >
                    {donor.eligible ? "Eligible" : "Not Eligible"}
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
