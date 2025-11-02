"use client";

import { useState } from "react";
import { Input } from "../../shared/ui/input";
import { Button } from "../../shared/ui/button";
import { Trash2 } from "lucide-react";

import { CreateMenuMeal, CreateMenuRequest } from "@/types/request/menu-request";
import MealSelectDropdown from "./meal-dropdown";
import { useMealForm } from "../../meal/use-meal-form";
import BaseCreateFormPage from "../../shared/base/base-create-page";

interface MenuCreatePageFormProps {
  onSubmit: (data: CreateMenuRequest) => Promise<void>;
}

export default function MenuCreatePageForm({ onSubmit }: MenuCreatePageFormProps) {
  const [meals, setMeals] = useState<CreateMenuMeal[]>([]);

  const { meals: mealList, loading, error } = useMealForm();

  const defaultData: CreateMenuRequest = {
    Date: "",
    Status: 0,
    TotalOrders: 0,
    meals: [],
  };

  const handleAddMeal = () => {
    setMeals([...meals, { Meal: { ID: "" }, IsAvailable: true }]);
  };

  const handleMealSelect = (index: number, selectedId: string) => {
    const updated = [...meals];
    updated[index].Meal.ID = selectedId;
    setMeals(updated);
  };

  const handleRemoveMeal = (index: number) => {
    setMeals(meals.filter((_, i) => i !== index));
  };

  if (loading) return <div className="text-center text-gray-500">Loading meals...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <BaseCreateFormPage<CreateMenuRequest>
      title="Create New Menu"
      onSubmit={(data) =>
        onSubmit({
          ...data,
          Status: 0,
          TotalOrders: 0,
          meals,
        })
      }
      initialData={defaultData}
      resetData={defaultData}
    >
      {(formData, handleChange) => (
        <div className="space-y-6">
          {/* Ngày */}
          <div>
            <label className="text-sm font-medium text-[var(--color-primary)]">Date</label>
            <Input
              type="date"
              name="Date"
              value={formData.Date}
              onChange={handleChange}
              required
              className="border-2"
            />
          </div>

          {/* Danh sách Meal */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-[var(--color-primary)]">Meals</label>

            {meals.map((meal, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-3 border-2 rounded-xl p-3"
              >
                <MealSelectDropdown
                  mealList={mealList.map((m) => ({
                    Meal_ID: m.ID,
                    Meal_Name: m.Name,
                    ImageUrl: m.ImageUrl,
                  }))}
                  selectedId={meal.Meal.ID}
                  onSelect={(id) => handleMealSelect(index, id)}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveMeal(index)}
                  className="text-[var(--color-primary)] hover:text-[var(--color-primary-light)] !w-12 !h-12 p-0"
                >
                  <Trash2 />
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full border-2 border-dashed hover:text-[var(--color-primary-light)] text-[var(--color-primary)]"
              onClick={handleAddMeal}
            >
              + Add Meal
            </Button>
          </div>
        </div>
      )}
    </BaseCreateFormPage>
  );
}
