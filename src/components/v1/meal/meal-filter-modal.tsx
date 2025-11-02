"use client";

import { BaseFilterState, FilterField } from "../shared/modals/filter-modal";
import BaseFilterModal from "../shared/modals/filter-modal";

interface MealFilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (filters: BaseFilterState) => void;
  initialValues: BaseFilterState;
}

export default function MealFilterModal({
  open,
  onOpenChange,
  onApply,
  initialValues,
}: MealFilterModalProps) {
  // 🔹 Định nghĩa các field lọc cho Meals
  const fields: FilterField[] = [
    {
      key: "Name",
      label: "Tên món ăn",
      placeholder: "Nhập tên món ăn",
    },
    {
      key: "Vendor_ID",
      label: "ID Nhà cung cấp",
      placeholder: "Nhập ID nhà cung cấp",
    },
    {
      key: "Price",
      label: "Giá (VNĐ)",
      type: "number",
      placeholder: "Nhập giá món ăn",
    },
    {
      key: "createdBy",
      label: "Người tạo",
      placeholder: "Nhập tên người tạo",
    },
    {
      key: "createdAt",
      label: "Ngày tạo",
      type: "date",
    },
  ];

  return (
    <BaseFilterModal
      open={open}
      onOpenChange={onOpenChange}
      onApply={onApply}
      title="Lọc danh sách món ăn"
      fields={fields}
      initialValues={initialValues}
    />
  );
}
