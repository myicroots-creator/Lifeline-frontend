"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropletIcon, AlertTriangle, Users, FileUp, Plus, Download, Activity, Calendar } from "lucide-react"

// Assuming these components are in your project structure as before
import { InventoryTable, type InventoryItem } from "@/components/hospital/inventory-table" 
import { DonorTable, type Donor } from "@/components/hospital/donor-table"
import { PredictionsCard } from "@/components/hospital/predictions-card"
import { AlertsCard } from "@/components/hospital/alerts-card"
import { FileUploadDialog } from "@/components/hospital/file-upload-dialog"
import { AddInventoryDialog } from "@/components/hospital/add-inventory-dialog"
import { RequestBloodDialog, type BloodRequest } from "@/components/hospital/request-blood-dialog" 
import { HospitalLayout } from "@/components/hospital/hospital-layout"
import { RequestTable } from "@/components/hospital/request-table" // We'll need a new component for this

// --- MOCK DATA FOR INITIALIZATION & EXPORTS ---

const initialInventoryData: InventoryItem[] = [
  { id: 'UNIT-001', bloodType: 'A+', units: 10, donorId: 'D-101', expiryDate: '2024-09-15' },
  { id: 'UNIT-002', bloodType: 'O-', units: 5, donorId: 'D-102', expiryDate: '2024-08-30' },
  { id: 'UNIT-003', bloodType: 'B+', units: 8, donorId: 'D-103', expiryDate: '2024-08-25' },
];

const initialRequestsData: BloodRequest[] = [
  { id: 'REQ-001', hospital: 'City General', bloodType: 'O-', units: 2, priority: 'High', status: 'Pending' },
  { id: 'REQ-002', hospital: 'Metro Health', bloodType: 'A+', units: 5, priority: 'Medium', status: 'Fulfilled' },
];

const mockDonorsData: Donor[] = [
  { id: 'D-101', name: 'John Doe', bloodType: 'A+', lastDonation: '2024-05-10', status: 'Eligible' },
  { id: 'D-102', name: 'Jane Smith', bloodType: 'O-', lastDonation: '2024-06-20', status: 'Eligible' },
  { id: 'D-103', name: 'Mike Johnson', bloodType: 'B+', lastDonation: '2024-07-01', status: 'Ineligible' },
];

// --- HELPER FUNCTION FOR EXPORTING ---

const handleExport = (data: any[], filename: string) => {
  if (!data || data.length === 0) {
    alert("No data available to export.");
    return;
  }
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => JSON.stringify(row[header])).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


export default function HospitalDashboard() {
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [showAddInventory, setShowAddInventory] = useState(false)
  const [showRequestBlood, setShowRequestBlood] = useState(false)
  
  // State for inventory and requests, managed by local storage
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [requests, setRequests] = useState<BloodRequest[]>([]);

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedInventory = localStorage.getItem('hospitalInventory');
    setInventory(storedInventory ? JSON.parse(storedInventory) : initialInventoryData);
    
    const storedRequests = localStorage.getItem('hospitalRequests');
    setRequests(storedRequests ? JSON.parse(storedRequests) : initialRequestsData);
  }, []);

  // Persist inventory to localStorage whenever it changes
  useEffect(() => {
    if (inventory.length > 0) {
      localStorage.setItem('hospitalInventory', JSON.stringify(inventory));
    }
  }, [inventory]);

  // Persist requests to localStorage whenever they change
  useEffect(() => {
     if (requests.length > 0) {
      localStorage.setItem('hospitalRequests', JSON.stringify(requests));
    }
  }, [requests]);

  // --- HANDLERS ---
  const handleAddInventory = (newItem: Omit<InventoryItem, 'id'>) => {
    const newInventoryItem = { ...newItem, id: `UNIT-${Date.now().toString().slice(-4)}` };
    setInventory(prev => [...prev, newInventoryItem]);
  };

  const handleAddRequest = (newRequest: Omit<BloodRequest, 'id' | 'status'>) => {
    const newRequestItem = { ...newRequest, id: `REQ-${Date.now().toString().slice(-4)}`, status: 'Pending' as const };
    setRequests(prev => [...prev, newRequestItem]);
  };

  // --- DYNAMIC STATS ---
  const getExpiryStatus = (expiryDate: string) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 7 && diffDays > 0) return 'expiring';
    return 'good';
  };
  
  const stats = {
    totalUnits: inventory.reduce((sum, item) => sum + item.units, 0),
    criticalTypes: [...new Set(inventory.filter(item => item.units < 5).map(item => item.bloodType))].length,
    expiringUnits: inventory.filter(item => getExpiryStatus(item.expiryDate) === 'expiring').length,
    activeDonors: 856, // This remains static as we don't manage donors in local storage here
  }

  return (
    <HospitalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Overview of your blood bank operations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowFileUpload(true)}>
              <FileUp className="mr-2 h-4 w-4" />
              Upload Data
            </Button>
            <Button onClick={() => setShowAddInventory(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Inventory
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Blood Units</CardTitle>
              <DropletIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUnits}</div>
              <p className="text-xs text-muted-foreground">Across all blood types</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.criticalTypes}</div>
              <p className="text-xs text-muted-foreground">Blood types below threshold</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.expiringUnits}</div>
              <p className="text-xs text-muted-foreground">Units expiring in 7 days</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Donors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeDonors}</div>
              <p className="text-xs text-muted-foreground">Eligible to donate</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts and Predictions */}
        <div className="grid gap-4 md:grid-cols-2">
          <AlertsCard />
          <PredictionsCard />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="inventory" className="space-y-4">
          <TabsList>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="donors">Donors</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Blood Inventory</CardTitle>
                    <CardDescription>Manage your blood stock and expiry dates</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleExport(inventory, 'inventory_export.csv')}>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <InventoryTable inventory={inventory} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donors" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Donor Database</CardTitle>
                    <CardDescription>View and manage registered donors</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleExport(mockDonorsData, 'donors_export.csv')}>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <DonorTable donors={mockDonorsData} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Blood Requests</CardTitle>
                    <CardDescription>Inter-hospital blood transfer requests</CardDescription>
                  </div>
                  <Button onClick={() => setShowRequestBlood(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Request
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {requests.length > 0 ? (
                  <RequestTable requests={requests} />
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No active requests</p>
                    <p className="text-sm">Request blood from nearby hospitals when needed</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Reports & Analytics</CardTitle>
                <CardDescription>Download usage and wastage reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Button variant="outline" className="justify-start h-auto py-4 bg-transparent" onClick={() => handleExport(inventory, 'daily_usage_report.csv')}>
                    <div className="text-left">
                      <div className="font-semibold">Daily Usage Report</div>
                      <div className="text-sm text-muted-foreground">Blood consumption by type</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-4 bg-transparent" onClick={() => handleExport(inventory.filter(i => new Date(i.expiryDate) < new Date()), 'wastage_analysis_report.csv')}>
                    <div className="text-left">
                      <div className="font-semibold">Wastage Analysis</div>
                      <div className="text-sm text-muted-foreground">Expired units tracking</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-4 bg-transparent" onClick={() => handleExport(mockDonorsData, 'donor_activity_report.csv')}>
                    <div className="text-left">
                      <div className="font-semibold">Donor Activity</div>
                      <div className="text-sm text-muted-foreground">Donation frequency report</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-4 bg-transparent" onClick={() => handleExport([...inventory, ...requests], 'monthly_summary_report.csv')}>
                    <div className="text-left">
                      <div className="font-semibold">Monthly Summary</div>
                      <div className="text-sm text-muted-foreground">Comprehensive overview</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <FileUploadDialog open={showFileUpload} onOpenChange={setShowFileUpload} />
      <AddInventoryDialog open={showAddInventory} onOpenChange={setShowAddInventory} onAddInventory={handleAddInventory} />
      <RequestBloodDialog open={showRequestBlood} onOpenChange={setShowRequestBlood} onAddRequest={handleAddRequest} />
    </HospitalLayout>
  )
}