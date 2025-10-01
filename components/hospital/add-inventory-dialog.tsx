import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InventoryItem } from "./inventory-table"

interface AddInventoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddInventory: (item: Omit<InventoryItem, 'id'>) => void;
}

export function AddInventoryDialog({ open, onOpenChange, onAddInventory }: AddInventoryDialogProps) {
  const [bloodType, setBloodType] = useState('A+');
  const [units, setUnits] = useState(1);
  const [donorId, setDonorId] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleSubmit = () => {
    if (!donorId || !expiryDate || units < 1) {
      alert("Please fill all fields correctly.");
      return;
    }
    onAddInventory({ bloodType, units, donorId, expiryDate });
    onOpenChange(false); // Close dialog
    // Reset form
    setBloodType('A+'); setUnits(1); setDonorId(''); setExpiryDate('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Inventory</DialogTitle>
          <DialogDescription>Enter details for the new blood unit.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bloodType" className="text-right">Blood Type</Label>
            <Select value={bloodType} onValueChange={setBloodType}>
              <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
              <SelectContent>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => 
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="units" className="text-right">Units</Label>
            <Input id="units" type="number" value={units} onChange={e => setUnits(Math.max(1, parseInt(e.target.value) || 1))} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="donorId" className="text-right">Donor ID</Label>
            <Input id="donorId" value={donorId} onChange={e => setDonorId(e.target.value)} className="col-span-3" placeholder="e.g., D-106" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expiryDate" className="text-right">Expiry Date</Label>
            <Input id="expiryDate" type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Unit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}