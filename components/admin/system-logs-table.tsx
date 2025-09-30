"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const mockLogs = [
  {
    id: 1,
    timestamp: "2025-01-30 14:32:15",
    event: "Hospital Login",
    user: "City General Hospital",
    type: "auth",
    status: "success",
  },
  {
    id: 2,
    timestamp: "2025-01-30 14:28:42",
    event: "Blood Request Created",
    user: "Memorial Medical Center",
    type: "request",
    status: "success",
  },
  {
    id: 3,
    timestamp: "2025-01-30 14:15:33",
    event: "Inventory Updated",
    user: "St. Mary's Hospital",
    type: "inventory",
    status: "success",
  },
  {
    id: 4,
    timestamp: "2025-01-30 14:02:18",
    event: "Failed Login Attempt",
    user: "unknown@example.com",
    type: "auth",
    status: "error",
  },
  {
    id: 5,
    timestamp: "2025-01-30 13:45:27",
    event: "Donor Registration",
    user: "john.doe@email.com",
    type: "registration",
    status: "success",
  },
  {
    id: 6,
    timestamp: "2025-01-30 13:30:11",
    event: "File Upload",
    user: "City General Hospital",
    type: "upload",
    status: "success",
  },
  {
    id: 7,
    timestamp: "2025-01-30 13:12:05",
    event: "Blood Transfer Approved",
    user: "Memorial Medical Center",
    type: "transfer",
    status: "success",
  },
  {
    id: 8,
    timestamp: "2025-01-30 12:58:44",
    event: "System Alert Triggered",
    user: "System",
    type: "alert",
    status: "warning",
  },
]

export function SystemLogsTable() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-accent/20 text-accent border-accent/30"
      case "error":
        return "bg-primary/20 text-primary border-primary/30"
      case "warning":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
      default:
        return ""
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "auth":
        return "bg-blue-500/20 text-blue-500 border-blue-500/30"
      case "request":
        return "bg-purple-500/20 text-purple-500 border-purple-500/30"
      case "inventory":
        return "bg-green-500/20 text-green-500 border-green-500/30"
      case "transfer":
        return "bg-orange-500/20 text-orange-500 border-orange-500/30"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
              <TableCell className="font-medium">{log.event}</TableCell>
              <TableCell className="text-muted-foreground">{log.user}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getTypeColor(log.type)}>
                  {log.type}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(log.status)}>
                  {log.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
