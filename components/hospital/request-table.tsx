import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { type BloodRequest } from "./request-blood-dialog"

export function RequestTable({ requests }: { requests: BloodRequest[] }) {
  const getPriorityVariant = (priority: BloodRequest['priority']): "destructive" | "default" | "secondary" => {
    if (priority === 'High') return 'destructive';
    if (priority === 'Medium') return 'default';
    return 'secondary';
  }

  const getStatusVariant = (status: BloodRequest['status']): "default" | "secondary" | "outline" => {
    if (status === 'Fulfilled') return 'default';
    if (status === 'Pending') return 'secondary';
    return 'outline';
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Request ID</TableHead>
          <TableHead>Requesting Hospital</TableHead>
          <TableHead>Blood Type</TableHead>
          <TableHead>Units</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((req) => (
          <TableRow key={req.id}>
            <TableCell className="font-medium">{req.id}</TableCell>
            <TableCell>{req.hospital}</TableCell>
            <TableCell>{req.bloodType}</TableCell>
            <TableCell>{req.units}</TableCell>
            <TableCell>
              <Badge variant={getPriorityVariant(req.priority)}>{req.priority}</Badge>
            </TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(req.status)}>{req.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}