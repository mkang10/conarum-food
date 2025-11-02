"use client"

import { useState } from "react"
import { Checkbox } from "../ui/checkbox"
import ActionMenu from "../modals/action-menu"

export interface BaseTableColumn<T> {
  key: keyof T
  label: string
  render?: (item: T) => React.ReactNode
  className?: string
}

export interface BaseTableProps<T> {
  data: T[]
  columns: BaseTableColumn<T>[]
  getRowId: (item: T) => string
  onView?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export default function BaseTable<T>({
  data,
  columns,
  getRowId,
  onView,
  onEdit,
  onDelete,
}: BaseTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())

  const toggleRow = (id: string) => {
    const newSet = new Set(selectedRows)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setSelectedRows(newSet)
  }


  const toggleAll = () => {
    if (selectedRows.size === data.length) setSelectedRows(new Set())
    else setSelectedRows(new Set(data.map(getRowId)))
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-6 py-3">
              <Checkbox
                checked={selectedRows.size === data.length && data.length > 0}
                onChange={toggleAll}
              />
            </th>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`px-6 py-3 text-left text-xs font-semibold text-muted-foreground ${col.className || ""}`}
              >
                {col.label}
              </th>
            ))}
            {(onView || onEdit || onDelete) && (
              <th className="px-6 py-3 text-center text-xs font-semibold text-muted-foreground">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const id = getRowId(item)
            const isSelected = selectedRows.has(id)
            return (
              <tr
                key={id}
                className={`border-b border-border transition-colors hover:bg-muted/50 ${isSelected ? "bg-blue-50 dark:bg-blue-950/20" : ""
                  }`}
              >
                <td className="px-6 py-4">
                  <Checkbox
                    checked={isSelected}
                    onChange={() => toggleRow(id)}
                  />
                </td>
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-6 py-4 text-sm text-foreground">
                    {col.render ? col.render(item) : String(item[col.key as keyof T] ?? "")}
                  </td>
                ))}
                {(onView || onEdit || onDelete) && (
                  <td className="px-6 py-4 text-center">
                    <ActionMenu
                      onView={onView ? () => onView(id) : undefined}
                      onEdit={onEdit ? () => onEdit(id) : undefined}
                      onDelete={onDelete ? () => onDelete(id) : undefined}
                    />
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
