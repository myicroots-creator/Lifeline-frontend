"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2, XCircle, Eye } from "lucide-react"

const mockApprovals = [
  {
    id: 1,
    hospitalName: "Riverside Medical Center",
    location: "Portland, OR",
    contactPerson: "Dr. Sarah Johnson",
    email: "sarah.j@riverside.med",
    submittedDate: "2025-01-28",
    status: "pending",
  },
  {
    id: 2,
    hospitalName: "Lakeside Community Hospital",
    location: "Seattle, WA",
    contactPerson: "Dr. Michael Chen",
    email: "m.chen@lakeside.org",
    submittedDate: "2025-01-27",
    status: "pending",
  },
  {
    id: 3,
    hospitalName: "Valley Health Center",
    location: "San Jose, CA",
    contactPerson: "Dr. Emily Rodriguez",
    email: "e.rodriguez@valley.health",
    submittedDate: "2025-01-26",
    status: "pending",
  },
  {
    id: 4,
    hospitalName: "Mountain View Hospital",
    location: "Denver, CO",
    contactPerson: "Dr. James Wilson",
    email: "j.wilson@mountainview.med",
    submittedDate: "2025-01-25",
    status: "pending",
  },
  {
    id: 5,
    hospitalName: "Coastal Regional Medical",
    location: "Miami, FL",
    contactPerson: "Dr. Lisa Martinez",
    email: "l.martinez@coastal.med",
    submittedDate: "2025-01-24",
    status: "pending",
  },
]

export function HospitalApprovalTable() {
  const [approvals, setApprovals] = useState(mockApprovals)

  const handleApprove = (id: number) => {
    setApprovals(approvals.filter((a) => a.id !== id))
  }

  const handleReject = (id: number) => {
    setApprovals(approvals.filter((a) => a.id !== id))
  }

  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hospital Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {approvals.map((approval) => (
            <TableRow key={approval.id}>
              <TableCell className="font-medium">{approval.hospitalName}</TableCell>
              <TableCell>{approval.location}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{approval.contactPerson}</div>
                  <div className="text-xs text-muted-foreground">{approval.email}</div>
                </div>
              </TableCell>
              <TableCell>{approval.submittedDate}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
                  Pending
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleApprove(approval.id)}>
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleReject(approval.id)}>
                    <XCircle className="h-4 w-4 text-primary" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
