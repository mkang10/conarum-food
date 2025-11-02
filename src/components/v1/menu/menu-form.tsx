"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BaseFormLayout from "../shared/base/base-form-layout";
import MenuTable from "./menu-table";
import { useMenuForm } from "./use-menu-form";
import BalanceCard from "../balance-card";
import MenuFilterModal from "./menu-filter-modal";
import GroupByModal from "../shared/modals/group-by-modal";
import ImportModal from "../shared/modals/import-modal";

export default function MenuForm() {
  const router = useRouter();

  const {
    menus,
    deleteMenu,
    getAllMenus,
    filterOpen,
    setFilterOpen,
    filters,
    handleApplyFilters,
    bulkUpdateMenus,
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalItems,
  } = useMenuForm();

  const [groupByOpen, setGroupByOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMenus, setEditedMenus] = useState(menus);

  const handleDeleteMenu = async (id: string | number) => {
    await deleteMenu(id);
  };

  const handleRefresh = () => getAllMenus();

  const handleToggleEdit = async () => {
    if (!isEditing) {
      setEditedMenus(menus);
    } else {
      await bulkUpdateMenus({
        updates: editedMenus.map((m) => ({
          ID: m.ID,
          Status : m.Status,
          Date: m.Date,
        })),
      });
    }
    setIsEditing((prev) => !prev);
  };

  const handleEditChange = (id: string, field: string, value: string) => {
    setEditedMenus((prev) =>
      prev.map((m) => (m.ID === id ? { ...m, [field]: value } : m))
    );
  };

  return (
    <>
      <BaseFormLayout
        title="Menus"
        subtitle="View and Manage Company Daily Menus"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAdd={() => router.push("/adm/menu/create")}
        onFilter={() => setFilterOpen(true)}
        onGroupBy={() => setGroupByOpen(true)}
        onImport={() => setImportOpen(true)}
        onToggleEdit={handleToggleEdit}
        onRefresh={handleRefresh}
        isEditing={isEditing}
        addLabel="Add Menu"
        cards={
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <BalanceCard label="Balance" amount="$226,635" color="green" />
            <BalanceCard label="Credit" amount="$24,842" color="red" />
            <BalanceCard label="Revenue" amount="$183,531" color="orange" />
          </div>
        }
      >
        <MenuTable
          menus={isEditing ? editedMenus : menus}
          searchQuery={searchQuery}
          filters={filters}
          isEditing={isEditing}
          onEditChange={handleEditChange}
          onDelete={handleDeleteMenu}
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </BaseFormLayout>

      {/* Giữ lại các modal phụ */}
      <MenuFilterModal
        open={filterOpen}
        onOpenChange={setFilterOpen}
        onApply={handleApplyFilters}
        initialValues={filters}
      />
      <GroupByModal
        open={groupByOpen}
        onOpenChange={setGroupByOpen}
        onApply={() => {}}
      />
      <ImportModal
        open={importOpen}
        onOpenChange={setImportOpen}
        onImport={() => {}}
      />
    </>
  );
}
