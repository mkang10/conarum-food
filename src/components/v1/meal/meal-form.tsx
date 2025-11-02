"use client";

import { useRouter } from "next/navigation";
import { useMealForm } from "./use-meal-form";
import BaseFormLayout from "../shared/base/base-form-layout";
import MealTable from "./meal-table";
import MealFilterModal from "./meal-filter-modal";
import GroupByModal from "../shared/modals/group-by-modal";
import ImportModal from "../shared/modals/import-modal";
import BalanceCard from "../balance-card";
import { useState } from "react";

export default function MealForm() {
  const {
    meals,
    deleteMeal,
    getAllMeals,
    filterOpen,
    setFilterOpen,
    filters,
    handleApplyFilters,
    bulkUpdateMeals,
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalItems,
  } = useMealForm();

  const [groupByOpen, setGroupByOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMeals, setEditedMeals] = useState(meals);
  const router = useRouter();



  const handleAddMeal = () => {
    // ✅ Điều hướng và truyền handleMealSubmit qua router state
    router.push("/adm/meal/create");
  };

  const handleToggleEdit = async () => {
    if (!isEditing) {
      setEditedMeals(meals);
    } else {
      await bulkUpdateMeals({
        updates: editedMeals.map((m) => ({
          ID: m.ID,
          Name: m.Name,
          Price: m.Price,
          Description: m.Description,
          ImageUrl: m.ImageUrl,
        })),
      });
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <>
      <BaseFormLayout
        title="Meals"
        subtitle="View and Manage Daily Meals"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAdd={handleAddMeal} // ✅ Mở page create
        onFilter={() => setFilterOpen(true)}
        onGroupBy={() => setGroupByOpen(true)}
        onImport={() => setImportOpen(true)}
        onToggleEdit={handleToggleEdit}
        onRefresh={getAllMeals}
        isEditing={isEditing}
        addLabel="Add Meal"
        cards={
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <BalanceCard label="Revenue" amount="$183,531" color="green" />
            <BalanceCard label="Cost" amount="$42,800" color="red" />
            <BalanceCard label="Profit" amount="$140,731" color="orange" />
          </div>
        }
      >
        <MealTable
          meals={isEditing ? editedMeals : meals}
          searchQuery={searchQuery}
          filters={filters}
          isEditing={isEditing}
          onEditChange={(id, f, v) =>
            setEditedMeals((prev) =>
              prev.map((m) => (m.ID === id ? { ...m, [f]: v } : m))
            )
          }
          onDelete={deleteMeal}
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </BaseFormLayout>

      <MealFilterModal
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
