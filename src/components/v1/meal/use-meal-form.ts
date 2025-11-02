"use client";
import { usePathname } from "next/navigation";

import { useState, useEffect } from "react";
import { mealApi } from "@/apis/meals/meal";
import { handleApiCall } from "@/lib/utils";
import { Meal, MealResponse } from "@/types/response/meal-response";
import {
  CreateMealRequest,
  BulkUpdateMealRequest,
} from "@/types/request/meal-request";
import {
  CreateMealResponse,
  BulkUpdateMealResponse,
} from "@/types/response/meal-response";
import { BaseFilterState } from "../shared/modals/filter-modal";

export function useMealForm() {
  const pathname = usePathname();

  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Filter & Search
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<BaseFilterState>({});
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  // ✅ Build OData query parameters ($filter, $skip, $top, $count)
  const buildODataParams = () => {
    const skip = (page - 1) * pageSize;
    const top = pageSize;

    const filterParts: string[] = [];

    if (filters.createdBy)
      filterParts.push(`createdBy eq '${filters.createdBy}'`);
    if (filters.modifiedBy)
      filterParts.push(`modifiedBy eq '${filters.modifiedBy}'`);
    if (filters.date) filterParts.push(`createdAt eq '${filters.date}'`);
    if (searchQuery)
      filterParts.push(
        `contains(tolower(Name), tolower('${searchQuery}')) or contains(tolower(Description), tolower('${searchQuery}'))`
      );

    const filterString =
      filterParts.length > 0 ? filterParts.join(" and ") : undefined;

    const params: Record<string, string> = {
      $skip: skip.toString(),
      $top: top.toString(),
      $count: "true",
    };

    if (filterString) params["$filter"] = filterString;

    return params;
  };

  // ✅ Fetch Meals (OData)
  const getAllMeals = async () => {
    setError("");
    setLoading(true);

    const odataParams = buildODataParams();

    await handleApiCall<MealResponse>(() => mealApi.getAll(odataParams), {
      successMessage: "Meals fetched successfully!",
      errorMessage: "Failed to fetch meals.",
      onSuccess: (data) => {
        setMeals(data.value);
        const total = data["@odata.count"] ?? data.value.length;
        setTotalItems(total);
      },
      onError: (err) => setError(err.message),
    }).finally(() => setLoading(false));
  };

  // ✅ Auto-fetch on dependency change
  useEffect(() => {
     if (pathname.startsWith("/adm/meal") || pathname.startsWith("/adm/menu/create"))  {
    getAllMeals();
  }
  }, [page, pageSize, filters, searchQuery]);

  // ✅ Create new meal
  const createMeal = async (payload: CreateMealRequest, imageUrl?: string) => {
    setError("");
    setLoading(true);

    // ⚡ Thêm ImageUrl vào payload nếu có
    const payloadWithImage = {
      ...payload,
      ...(imageUrl ? { ImageUrl: imageUrl } : {}),
    };

    await handleApiCall<CreateMealResponse>(
      () => mealApi.create(payloadWithImage),
      {
        successMessage: "Meal created successfully!",
        errorMessage: "Failed to create meal.",
        onSuccess: (newMeal) => {
          setMeals((prev) => [newMeal as unknown as Meal, ...prev]);
          setTotalItems((prev) => prev + 1);
        },
        onError: (err) => setError(err.message),
      }
    ).finally(() => setLoading(false));
  };

  // ✅ Bulk update meals
  const bulkUpdateMeals = async (payload: BulkUpdateMealRequest) => {
    setError("");
    setLoading(true);

    await handleApiCall<BulkUpdateMealResponse>(
      () => mealApi.bulkUpdate(payload),
      {
        successMessage: "Meals updated successfully!",
        errorMessage: "Failed to update meals.",
        onSuccess: () => getAllMeals(),
        onError: (err) => setError(err.message),
      }
    ).finally(() => setLoading(false));
  };

  // ✅ Delete meal
  const deleteMeal = async (id: string | number) => {
    setError("");
    setLoading(true);

    await handleApiCall<void>(() => mealApi.delete(id), {
      successMessage: "Meal deleted successfully!",
      errorMessage: "Failed to delete meal.",
      onSuccess: () => {
        setMeals((prev) => prev.filter((m) => m.ID !== id));
        setTotalItems((prev) => prev - 1);
      },
      onError: (err) => setError(err.message),
    }).finally(() => setLoading(false));
  };

  // ✅ Apply filters
  const handleApplyFilters = (newFilters: BaseFilterState) => {
    setFilters(newFilters);
    setPage(1);
  };

  // ✅ Pagination controls
  const totalPages = Math.ceil(totalItems / pageSize);
  const handleNextPage = () => setPage((p) => Math.min(p + 1, totalPages));
  const handlePrevPage = () => setPage((p) => Math.max(p - 1, 1));

  return {
    // Data
    meals,
    loading,
    error,

    // Filters
    filters,
    setFilters,
    filterOpen,
    setFilterOpen,
    handleApplyFilters,

    // Search
    searchQuery,
    setSearchQuery,

    // Pagination
    page,
    pageSize,
    setPage,
    setPageSize,
    totalItems,
    totalPages,
    handleNextPage,
    handlePrevPage,

    // CRUD
    getAllMeals,
    createMeal,
    bulkUpdateMeals,
    deleteMeal,
  };
}
