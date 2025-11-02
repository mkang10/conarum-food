"use client";

import { useMemo, useState } from "react";
import BaseTable, { BaseTableColumn } from "../shared/base/base-table";
import { formatData } from "@/lib/format-data";
import { Meal } from "@/types/response/meal-response";
import { BaseFilterState } from "../shared/modals/filter-modal";
import { Pagination } from "../shared/base/Pagination";

interface MealTableProps {
  meals: Meal[];
  searchQuery: string;
  filters: BaseFilterState;
  groupBy?: "createdBy" | "modifiedBy" | "Vendor_ID";
  activeTab?: "today" | "thisWeek" | "thisMonth" | "all";
  isEditing?: boolean;
  onEditChange?: (id: string, field: keyof Meal, value: string | number) => void;

  // ✅ Pagination props
  page?: number;
  pageSize?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;

  onView?: (meal: Meal) => void;
  onEdit?: (meal: Meal) => void;
  onDelete?: (id: string | number) => void;
}

export default function MealTable({
  meals,
  searchQuery,
  filters,
  groupBy,
  activeTab,
  isEditing,
  onEditChange,
  onView,
  onEdit,
  onDelete,
  // ✅ Pagination
  page = 1,
  pageSize = 10,
  totalItems = 0,
  onPageChange,
}: MealTableProps) {
  const [viewing, setViewing] = useState<Meal | null>(null);

  // =============================
  // 🔍 1️⃣ Lọc theo search + filters + tab
  // =============================
  const filteredMeals = useMemo(() => {
    return meals.filter((meal) => {
      const matchesSearch =
        meal.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.Description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilters =
        (!filters.createdBy || meal.createdBy === filters.createdBy) &&
        (!filters.modifiedBy || meal.modifiedBy === filters.modifiedBy);

      const matchesTab = (() => {
        if (!activeTab || activeTab === "all") return true;

        const today = new Date();
        const createdAt = new Date(meal.createdAt);

        if (activeTab === "today") {
          return createdAt.toDateString() === today.toDateString();
        }

        if (activeTab === "thisWeek") {
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 7);
          return createdAt >= weekStart && createdAt <= weekEnd;
        }

        if (activeTab === "thisMonth") {
          return (
            createdAt.getMonth() === today.getMonth() &&
            createdAt.getFullYear() === today.getFullYear()
          );
        }

        return true;
      })();

      return matchesSearch && matchesFilters && matchesTab;
    });
  }, [meals, searchQuery, filters, activeTab]);

  // =============================
  // 📄 2️⃣ Phân trang local (nếu API chưa hỗ trợ)
  // =============================
  const paginatedMeals = filteredMeals;

  // =============================
  // 🧩 3️⃣ Gom nhóm theo groupBy
  // =============================
  const groupedMeals = useMemo(() => {
    if (!groupBy) return { All: paginatedMeals };

    return paginatedMeals.reduce<Record<string, Meal[]>>((groups, item) => {
      const key = (item[groupBy as keyof Meal] as string) || "Unknown";
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
      return groups;
    }, {});
  }, [paginatedMeals, groupBy]);

  // =============================
  // 🧱 4️⃣ Cấu hình cột hiển thị
  // =============================
  const columns: BaseTableColumn<Meal>[] = [
    {
      key: "ImageUrl",
      label: "Image",
      render: (m) => (
        <div className="relative h-12 w-12 rounded-full overflow-hidden border border-neutral-300 shadow-sm hover:shadow-md transition-shadow duration-300">
          <img
            src={m.ImageUrl || "https://res.cloudinary.com/dvbbfcxdz/image/upload/v1761619140/Copilot_20251028_093826_hs1hsl.png"} // fallback khi không có URL
            alt={m.Name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = "https://res.cloudinary.com/dvbbfcxdz/image/upload/v1761619140/Copilot_20251028_093826_hs1hsl.png"; // fallback khi lỗi
            }}
          />
          <div className="absolute inset-0 rounded-full ring-0 hover:ring-2 hover:ring-amber-400/60 transition-all duration-300"></div>
        </div>
      ),
    },
    {
      key: "Name",
      label: "Name",
      render: (m) =>
        isEditing ? (
          <input
            className="w-full rounded border border-border bg-background px-2 py-1 text-sm"
            value={m.Name}
            onChange={(e) => onEditChange?.(m.ID, "Name", e.target.value)}
          />
        ) : (
          m.Name
        ),
    },
    {
      key: "Description",
      label: "Description",
      render: (m) =>
        isEditing ? (
          <input
            className="w-full rounded border border-border bg-background px-2 py-1 text-sm"
            value={m.Description}
            onChange={(e) =>
              onEditChange?.(m.ID, "Description", e.target.value)
            }
          />
        ) : (
          m.Description
        ),
    },
    {
      key: "Price",
      label: "Price (VND)",
      render: (m) =>
        isEditing ? (
          <input
            type="number"
            className="w-full rounded border border-border bg-background px-2 py-1 text-sm"
            value={m.Price}
            onChange={(e) =>
              onEditChange?.(m.ID, "Price", Number(e.target.value))
            }
          />
        ) : (
          `${m.Price.toLocaleString()} VND`
        ),
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (m) => formatData("createdAt", m.createdAt),
    },
    {
      key: "modifiedAt",
      label: "Modified At",
      render: (m) => formatData("modifiedAt", m.modifiedAt),
    },
  ];

  // =============================
  // 🖼️ 5️⃣ Render table + Pagination
  // =============================
  return (
    <>
      <div className="space-y-10">
        {Object.entries(groupedMeals).map(([groupName, items]) => (
          <div key={groupName}>
            {groupBy && (
              <h3 className="mb-2 text-lg font-semibold text-foreground border-b border-border pb-1">
                {groupBy}:{" "}
                <span className="text-muted-foreground">{groupName}</span>
              </h3>
            )}
            <BaseTable
              data={items}
              columns={columns}
              getRowId={(m) => m.ID}
              onView={(id) => {
                const selected = meals.find((m) => m.ID === id);
                setViewing(selected || null);
                onView?.(selected!);
              }}
              onEdit={(id) => {
                const selected = meals.find((m) => m.ID === id);
                onEdit?.(selected!);
              }}
              onDelete={(id) => {
                const selected = meals.find((m) => m.ID === id);
                onDelete?.(selected?.ID);
              }}
            />
          </div>
        ))}

        {/* Pagination UI */}
        <Pagination
          page={page}
          totalPages={Math.ceil((totalItems ?? 0) / pageSize)}
          onPageChange={onPageChange}
        />
      </div>

      {/* 🔍 Chi tiết món ăn */}
      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Thông tin món ăn
            </h2>

            <div className="space-y-3 max-h-[60vh] overflow-auto">
              {Object.entries(viewing).map(([key, value], index) => (
                <div key={`${key}-${index}`}>
                  <p className="text-xs text-muted-foreground capitalize">{key}</p>
                  <p className="text-sm font-medium text-foreground">
                    {formatData(key, value)}
                  </p>
                </div>
              ))}

            </div>

            <button
              onClick={() => setViewing(null)}
              className="mt-6 w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
}
