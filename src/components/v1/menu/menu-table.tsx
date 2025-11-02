"use client";

import { useMemo, useState } from "react";
import BaseTable, { BaseTableColumn } from "../shared/base/base-table";
import { formatData } from "@/lib/format-data";
import { Menu } from "@/types/response/menu-response";
import { BaseFilterState } from "../shared/modals/filter-modal";
import { Pagination } from "../shared/base/Pagination";
import { StatusBadge } from "../shared/ui/status-badge";
import { useRouter } from "next/navigation";
import { Switch } from "@mui/material";

interface MenuTableProps {
  menus: Menu[];
  searchQuery: string;
  filters: BaseFilterState;
  groupBy?: "createdBy" | "modifiedBy" | "Date";
  activeTab?: "today" | "thisWeek" | "thisMonth" | "all";
  isEditing?: boolean;
  onEditChange?: (id: string, field: keyof Menu, value: string) => void;

  // Pagination
  page?: number;
  pageSize?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;

  onView?: (menu: Menu) => void;
  onEdit?: (menu: Menu) => void;
  onDelete?: (id: string | number) => void;
}

export default function MenuTable({
  menus,
  searchQuery,
  filters,
  groupBy,
  activeTab,
  isEditing,
  onEditChange,
  onEdit,
  onDelete,
  page = 1,
  pageSize = 10,
  totalItems = 0,
  onPageChange,
}: MenuTableProps) {
  const [viewing, setViewing] = useState<Menu | null>(null);
  const router = useRouter(); // ✅ hook điều hướng
  const [editingStatus, setEditingStatus] = useState<Record<string, number>>({});


  const filteredMenus = useMemo(() => {
    return menus.filter((menu) => {
      const matchesSearch =
        menu.Date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        menu.createdByUser?.Email?.toLowerCase().includes(
          searchQuery.toLowerCase()
        );

      const matchesFilters =
        (!filters.createdBy ||
          menu.createdByUser?.Email === filters.createdBy) &&
        (!filters.date || menu.Date === filters.date);

      const matchesTab = (() => {
        if (!activeTab || activeTab === "all") return true;

        const today = new Date();
        const menuDate = new Date(menu.Date);

        if (activeTab === "today") {
          return menuDate.toDateString() === today.toDateString();
        }

        if (activeTab === "thisWeek") {
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 7);
          return menuDate >= weekStart && menuDate <= weekEnd;
        }

        if (activeTab === "thisMonth") {
          return (
            menuDate.getMonth() === today.getMonth() &&
            menuDate.getFullYear() === today.getFullYear()
          );
        }

        return true;
      })();

      return matchesSearch && matchesFilters && matchesTab;
    });
  }, [menus, searchQuery, filters, activeTab]);


  const groupedMenus = useMemo(() => {
    if (!groupBy) return { TấtCả: filteredMenus };

    return filteredMenus.reduce<Record<string, Menu[]>>((groups, item) => {
      const key = (item[groupBy as keyof Menu] as string) || "Không xác định";
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
      return groups;
    }, {});
  }, [filteredMenus, groupBy]);


  const columns: BaseTableColumn<Menu>[] = [
    {
      key: "Date",
      label: "Date",
      render: (m) =>
        isEditing ? (
          <input
            type="date"
            className="w-full rounded border border-border bg-background px-2 py-1 text-sm"
            value={m.Date}
            onChange={(e) => onEditChange?.(m.ID, "Date", e.target.value)}
          />
        ) : (
          formatData("Date", m.Date)
        ),
    },
    {
      key: "Status",
      label: "Status",
      render: (m) => {
        const status = editingStatus[m.ID] ?? m.Status;

        return isEditing ? (
          <div className="flex items-center">
            <Switch
              checked={status === 0}
              onChange={(e) => {
                const newStatus = e.target.checked ? 0 : 1;
                setEditingStatus((prev) => ({ ...prev, [m.ID]: newStatus }));
                onEditChange?.(m.ID, "Status", newStatus.toString());
              }}
              color="success"
            />
            <span className="ml-2 text-sm font-medium">
              {status === 0 ? "Active" : "In-Active"}
            </span>
          </div>
        ) : (
          <StatusBadge status={m.Status} />
        );
      },
    },

    {
      key: "TotalOrders",
      label: "Total Orders",
      render: (m) => formatData("number", m.TotalOrders),
    },
    {
      key: "createdByUser",
      label: "User Email",
      render: (m) => m.createdByUser?.Email ?? "Không có dữ liệu",
    },
  ];

  // =============================
  // 🖼️ 4️⃣ Render table + Pagination
  // =============================
  return (
    <>
      <div className="space-y-10">
        {Object.entries(groupedMenus).map(([groupName, items]) => (
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
                router.push(`/adm/menu/${id}`); // <--- điều hướng đến trang chi tiết
              }}
              onEdit={(id) => {
                const selected = menus.find((m) => m.ID === id);
                onEdit?.(selected!);
              }}
              onDelete={(id) => {
                const selected = menus.find((m) => m.ID === id);
                onDelete?.(selected?.ID);
              }}
            />
          </div>
        ))}

        {/* Pagination */}
        <Pagination
          page={page}
          totalPages={Math.ceil((totalItems ?? 0) / pageSize)}
          onPageChange={onPageChange}
        />
      </div>

      {/* 🔍 Chi tiết Menu */}
      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Chi tiết Menu
            </h2>

            <div className="space-y-3 max-h-[60vh] overflow-auto">
              <div>
                <p className="text-xs text-muted-foreground">Ngày</p>
                <p className="text-sm font-medium">{formatData("Date", viewing.Date)}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Trạng thái</p>
                <p className="text-sm font-medium">
                  {viewing.Status === 0 ? "Đang hoạt động" : "Ngừng hoạt động"}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Tổng số đơn</p>
                <p className="text-sm font-medium">{viewing.TotalOrders}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Email người tạo</p>
                <p className="text-sm font-medium">
                  {viewing.createdByUser?.Email ?? "Không có dữ liệu"}
                </p>
              </div>
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
