"use client";

import { BaseFilterState, FilterField } from "../shared/modals/filter-modal";
import BaseFilterModal from "../shared/modals/filter-modal";

interface MenuFilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (filters: BaseFilterState) => void;
  initialValues: BaseFilterState;
}

export default function MenuFilterModal({
  open,
  onOpenChange,
  onApply,
  initialValues,
}: MenuFilterModalProps) {
  // 🔹 định nghĩa fields riêng cho Menu
  const fields: FilterField[] = [
    {
      key: "createdBy",
      label: "Created By",
      placeholder: "Enter creator name",
    },
    {
      key: "modifiedBy",
      label: "Modified By",
      placeholder: "Enter modifier name",
    },
    {
      key: "date",
      label: "Date",
      type: "date",
    },
  ];

  return (
    <BaseFilterModal
      open={open}
      onOpenChange={onOpenChange}
      onApply={onApply}
      title="Filter Menus"
      fields={fields}
      initialValues={initialValues}
    />
  );
}
