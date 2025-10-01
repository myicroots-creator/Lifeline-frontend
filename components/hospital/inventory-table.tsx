import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export type InventoryItem = {
  id: string;
  bloodType: string;
  units: number;
  donorId: string;
  expiryDate: string;
};

// Helper to get status based on expiry date
const getExpiryStatus = (expiryDate: string): { text: string; variant: "default" | "destructive" | "secondary" | "outline" } => {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return { text: 'Expired', variant: 'destructive' };
  if (diffDays <= 7) return { text: 'Expiring Soon', variant: 'secondary' };
  return { text: 'Good', variant: 'outline' };
};

export function InventoryTable({ inventory }: { inventory: InventoryItem[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Unit ID</TableHead>
          <TableHead>Blood Type</TableHead>
          <TableHead>Units</TableHead>
          <TableHead>Donor ID</TableHead>
          <TableHead>Expiry Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inventory.map((item) => {
          const status = getExpiryStatus(item.expiryDate);
          return (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.bloodType}</TableCell>
              <TableCell>{item.units}</TableCell>
              <TableCell>{item.donorId}</TableCell>
              <TableCell>{item.expiryDate}</TableCell>
              <TableCell>
                <Badge variant={status.variant}>{status.text}</Badge>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}