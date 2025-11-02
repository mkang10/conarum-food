"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export interface FilterField {
  key: string;
  label: string;
  type?: "text" | "number" | "date" | "select";
  placeholder?: string;
  options?: { label: string; value: string }[]; // cho select
}

export interface BaseFilterState {
  [key: string]: string | number | undefined;
}

interface BaseFilterModalProps {
  open: boolean;
  title?: string;
  fields: FilterField[];
  initialValues?: BaseFilterState;
  onOpenChange: (open: boolean) => void;
  onApply: (filters: BaseFilterState) => void;
}

export default function BaseFilterModal({
  open,
  title = "Filter Options",
  fields,
  initialValues = {},
  onOpenChange,
  onApply,
}: BaseFilterModalProps) {
  const [filters, setFilters] = useState<BaseFilterState>({});

  useEffect(() => {
    setFilters(initialValues);
  }, [initialValues]);

  const handleChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    const resetValues = Object.fromEntries(fields.map((f) => [f.key, ""]));
    setFilters(resetValues);
  };

  const handleApply = () => {
    onApply(filters);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {fields.map((field) => (
            <div key={field.key}>
              <Label
                htmlFor={field.key}
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                {field.label}
              </Label>

              {field.type === "select" ? (
                <select
                  id={field.key}
                  value={filters[field.key] ?? ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2"
                >
                  <option value="">-- Select --</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  id={field.key}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  value={filters[field.key] ?? ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2"
                />
              )}
            </div>
          ))}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-border"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
