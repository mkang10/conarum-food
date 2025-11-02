"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog"

interface GroupByModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onApply: (groupBy: string) => void
}

export default function GroupByModal({ open, onOpenChange, onApply }: GroupByModalProps) {
  const [selectedGroup, setSelectedGroup] = useState("supplier")

  const groupOptions = [
    { value: "supplier", label: "Supplier" },
    { value: "status", label: "Status" },
    { value: "dueDate", label: "Due Date" },
    { value: "amount", label: "Amount Range" },
  ]

  const handleApply = () => {
    onApply(selectedGroup)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Group By</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {groupOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <input
                type="radio"
                name="groupBy"
                value={option.value}
                checked={selectedGroup === option.value}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="h-4 w-4 cursor-pointer"
              />
              <span className="text-sm font-medium text-foreground">{option.label}</span>
            </label>
          ))}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleApply} className="bg-blue-600 hover:bg-blue-700">
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
