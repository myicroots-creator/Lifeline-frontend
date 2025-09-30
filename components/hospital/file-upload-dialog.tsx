"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { FileUp, Upload, CheckCircle2, X } from "lucide-react"

interface FileUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FileUploadDialog({ open, onOpenChange }: FileUploadDialogProps) {
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUploadAreaClick = () => {
    fileInputRef.current?.click()
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      return
    }

    setUploading(true)
    // Simulate file upload
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setUploading(false)
    setUploaded(true)
    setTimeout(() => {
      setUploaded(false)
      setSelectedFile(null)
      onOpenChange(false)
    }, 1500)
  }

  const handleClearFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Data Files</DialogTitle>
          <DialogDescription>
            Upload CSV, Excel, PDF, or images of donor/inventory records. AI will extract and digitize the data.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div
            className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
            onClick={handleUploadAreaClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls,.pdf,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              className="hidden"
            />
            <FileUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground">CSV, Excel, PDF, or images (max 10MB)</p>
          </div>

          {selectedFile && (
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <div className="flex items-center gap-2">
                <FileUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{selectedFile.name}</span>
                <span className="text-xs text-muted-foreground">({(selectedFile.size / 1024).toFixed(1)} KB)</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleClearFile} className="h-6 w-6 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="space-y-2">
            <Label>Supported formats:</Label>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">.csv</span>
              <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">.xlsx</span>
              <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">.pdf</span>
              <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">.jpg</span>
              <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">.png</span>
            </div>
          </div>

          <Button onClick={handleUpload} disabled={uploading || uploaded || !selectedFile} className="w-full">
            {uploaded ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Uploaded Successfully
              </>
            ) : uploading ? (
              <>Processing...</>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Files
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
