import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type BloodRequest = {
  id: string;
  hospital: string;
  bloodType: string;
  units: number;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Fulfilled' | 'Cancelled';
};

interface RequestBloodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddRequest: (request: Omit<BloodRequest, 'id' | 'status'>) => void;
}

export function RequestBloodDialog({ open, onOpenChange, onAddRequest }: RequestBloodDialogProps) {
  const [hospital, setHospital] = useState('');
  const [bloodType, setBloodType] = useState('O-');
  const [units, setUnits] = useState(1);
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  const handleSubmit = () => {
    if (!hospital || units < 1) {
      alert("Please fill all fields correctly.");
      return;
    }
    onAddRequest({ hospital, bloodType, units, priority });
    onOpenChange(false);
    // Reset form
    setHospital(''); setBloodType('O-'); setUnits(1); setPriority('Medium');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Blood Request</DialogTitle>
          <DialogDescription>Request blood units from other facilities.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hospital" className="text-right">Hospital</Label>
            <Input id="hospital" value={hospital} onChange={(e) => setHospital(e.target.value)} className="col-span-3" placeholder="e.g., St. Jude's Hospital" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bloodType" className="text-right">Blood Type</Label>
            <Select value={bloodType} onValueChange={(value) => setBloodType(value)}>
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
            <Label htmlFor="priority" className="text-right">Priority</Label>
            <Select value={priority} onValueChange={(value: 'High' | 'Medium' | 'Low') => setPriority(value)}>
              <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit Request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}