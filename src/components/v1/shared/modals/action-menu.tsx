"use client"

import { MoreVertical, Edit2, Trash2, Eye } from "lucide-react"
import { useState } from "react"

interface ActionMenuProps {
  onEdit: () => void
  onDelete: () => void
  onView: () => void
}

export default function ActionMenu({ onEdit, onDelete, onView }: ActionMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="rounded p-1 hover:bg-muted">
        <MoreVertical className="h-4 w-4 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-40 rounded-lg border border-border bg-card shadow-lg z-50">
          <button
            onClick={() => {
              onView()
              setOpen(false)
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted first:rounded-t-lg"
          >
            <Eye className="h-4 w-4" />
            View
          </button>
          <button
            onClick={() => {
              onEdit()
              setOpen(false)
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted"
          >
            <Edit2 className="h-4 w-4" />
            Edit
          </button>
          <button
            onClick={() => {
              onDelete()
              setOpen(false)
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-muted last:rounded-b-lg"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      )}
    </div>
  )
}
