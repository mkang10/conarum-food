"use client";

import  React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";

interface BaseCreateFormProps<T> {
  open: boolean;
  title?: string;
  initialData: T;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: T) => void;
  children: (formData: T, handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void) => React.ReactNode;
  resetData: T;
}

export function BaseCreateForm<T>({
  open,
  title = "Create Item",
  onOpenChange,
  onSubmit,
  initialData,
  children,
  resetData,
}: BaseCreateFormProps<T>) {
  const [formData, setFormData] = React.useState<T>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value } as T));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData(resetData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {children(formData, handleChange)}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
