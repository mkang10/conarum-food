"use client";

import { ReactNode } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Filter,
  Search,
  Download,
  RotateCcw,
  ChevronDown,
  Edit3,
  Save,
} from "lucide-react";

interface BaseFormLayoutProps {
  title: string;
  subtitle?: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;

  onAdd?: () => void;
  onFilter?: () => void;
  onGroupBy?: () => void;
  onImport?: () => void;
  onRefresh?: () => void;
  onToggleEdit?: () => void;

  isEditing?: boolean;
  addLabel?: string;

  children: ReactNode;
  cards?: ReactNode;
}

export default function BaseFormLayout({
  title,
  subtitle,
  searchQuery,
  onSearchChange,
  onAdd,
  onFilter,
  onGroupBy,
  onImport,
  onRefresh,
  onToggleEdit,
  isEditing = false,
  addLabel = "Add Item",
  children,
  cards,
}: BaseFormLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {onAdd && (
            <Button
              onClick={onAdd}
              className="bg-blue-600 hover:bg-blue-700"
            >
              + {addLabel}
            </Button>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Optional summary cards */}
        {cards && <div className="mb-8">{cards}</div>}

        {/* Search + actions */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1 md:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {onFilter && (
              <Button variant="outline" size="sm" onClick={onFilter}>
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
            )}
            {onGroupBy && (
              <Button variant="outline" size="sm" onClick={onGroupBy}>
                Group by <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            )}
            {onImport && (
              <Button variant="outline" size="sm" onClick={onImport}>
                <Download className="h-4 w-4 mr-2" /> Import
              </Button>
            )}
            {onToggleEdit && (
              <Button
                variant={isEditing ? "default" : "outline"}
                size="sm"
                className={isEditing ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                onClick={onToggleEdit}
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4 mr-2" /> Save
                  </>
                ) : (
                  <>
                    <Edit3 className="h-4 w-4 mr-2" /> Edit
                  </>
                )}
              </Button>
            )}
            {onRefresh && (
              <Button variant="outline" size="sm" onClick={onRefresh}>
                <RotateCcw className="h-4 w-4 mr-2" /> Refresh
              </Button>
            )}
          </div>
        </div>

        {/* Table / children */}
        <div>{children}</div>
      </main>
    </div>
  );
}
