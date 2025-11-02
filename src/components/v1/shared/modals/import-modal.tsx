"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Upload } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog"

interface ImportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onImport: (file: File) => void
}

export default function ImportModal({ open, onOpenChange, onImport }: ImportModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      setSelectedFile(files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleImport = () => {
    if (selectedFile) {
      onImport(selectedFile)
      setSelectedFile(null)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Payments</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
              dragActive ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20" : "border-border"
            }`}
          >
            <Upload className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
            <p className="mb-2 text-sm font-medium text-foreground">
              {selectedFile ? selectedFile.name : "Drag and drop your file here"}
            </p>
            <p className="mb-4 text-xs text-muted-foreground">or</p>
            <label>
              <Input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileChange} className="hidden" />
              <Button variant="outline" size="sm" className="cursor-pointer bg-transparent">
                <span>Browse Files</span>
              </Button>
            </label>
            <p className="mt-2 text-xs text-muted-foreground">CSV, XLSX, or XLS files only</p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            disabled={!selectedFile}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
