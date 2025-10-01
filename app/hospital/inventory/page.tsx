"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HospitalLayout } from "@/components/hospital/hospital-layout"
import { InventoryTable } from "@/components/hospital/inventory-table"
import { AddInventoryDialog } from "@/components/hospital/add-inventory-dialog"
import { Plus, Download, Upload } from "lucide-react"

export default function HospitalInventory() {
  const [showAddDialog, setShowAddDialog] = useState(false)

  const handleImport = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".csv,.xlsx,.xls"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        console.log("[v0] Importing file:", file.name)
        // File import logic would go here
      }
    }
    input.click()
  }

  const handleExport = () => {
    console.log("[v0] Exporting inventory data")
    // Export logic would go here - for now just show it's working
    alert("Exporting inventory data as CSV...")
  }
  
  const initialInventoryData: InventoryItem[] = [
	  { id: 'UNIT-001', bloodType: 'A+', units: 10, donorId: 'D-101', expiryDate: '2024-09-15' },
	  { id: 'UNIT-002', bloodType: 'O-', units: 5, donorId: 'D-102', expiryDate: '2024-08-30' },
	  { id: 'UNIT-003', bloodType: 'B+', units: 8, donorId: 'D-103', expiryDate: '2024-08-25' },
	];	
  return (
    <HospitalLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Blood Inventory</h1>
            <p className="text-muted-foreground">Manage your blood stock and expiry dates</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleImport}>
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Units
            </Button>
          </div>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Current Stock</CardTitle>
            <CardDescription>Real-time blood inventory across all types</CardDescription>
          </CardHeader>
          <CardContent>
            <InventoryTable inventory={ initialInventoryData } />
          </CardContent>
        </Card>
      </div>

      <AddInventoryDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </HospitalLayout>
  )
}
