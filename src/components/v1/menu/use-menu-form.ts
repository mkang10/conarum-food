"use client";

import { useState, useEffect } from "react";
import { menuApi } from "@/apis/menu/menu";
import { handleApiCall } from "@/lib/utils";
import {
  BulkUpdateMenuResponse,
  CreateMenuResponse,
  Menu,
  MenuDetailResponse,
  MenuResponse,
} from "@/types/response/menu-response";
import {
  BulkUpdateMenuRequest,
  CreateMenuRequest,
} from "@/types/request/menu-request";
import { BaseFilterState } from "../shared/modals/filter-modal";

export function useMenuForm() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [menuDetails, setMenuDetail] = useState<MenuDetailResponse | null>(null); // ✅ thêm state riêng cho chi tiết

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

  // ✅ Build OData params ($filter, $skip, $top, $count)
  const buildODataParams = () => {
    const skip = (page - 1) * pageSize;
    const top = pageSize;

    // Build filter string
    const filterParts: string[] = [];

    if (filters.createdBy)
      filterParts.push(`createdBy eq '${filters.createdBy}'`);
    if (filters.modifiedBy)
      filterParts.push(`modifiedBy eq '${filters.modifiedBy}'`);
    if (filters.date) filterParts.push(`date eq '${filters.date}'`);
    if (searchQuery)
      filterParts.push(`contains(tolower(Title), tolower('${searchQuery}'))`);

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

  // ✅ Fetch OData data
  const getAllMenus = async () => {
    setError("");
    setLoading(true);

    const odataParams = buildODataParams();

    await handleApiCall<MenuResponse>(() => menuApi.getAll(odataParams), {
      successMessage: "Menus fetched successfully!",
      errorMessage: "Failed to fetch menus.",
      onSuccess: (data) => {
        setMenus(data.value);
        // Đọc total count từ metadata OData
        const total = data["@odata.count"] ?? data.value.length;
        setTotalItems(total);
      },
      onError: (err) => setError(err.message),
    }).finally(() => setLoading(false));
  };

  // ✅ Auto fetch khi page, filters, hoặc search đổi
  useEffect(() => {
    getAllMenus();
  }, [page, pageSize, filters, searchQuery]);

  // CRUD
  const createMenu = async (payload: CreateMenuRequest) => {
    setError("");
    setLoading(true);

    await handleApiCall<CreateMenuResponse>(() => menuApi.create(payload), {
      successMessage: "Create menu successfully!",
      errorMessage: "Failed to create menu.",
      onSuccess: (newMenu) => {
        setMenus((prev) => [newMenu as unknown as Menu, ...prev]);
        setTotalItems((prev) => prev + 1);
      },
      onError: (err) => setError(err.message),
    }).finally(() => setLoading(false));
  };

  const bulkUpdateMenus = async (payload: BulkUpdateMenuRequest) => {
    setError("");
    setLoading(true);

    await handleApiCall<BulkUpdateMenuResponse>(
      () => menuApi.bulkUpdate(payload),
      {
        successMessage: "Menus updated successfully!",
        errorMessage: "Failed to update menus.",
        onSuccess: () => getAllMenus(),
        onError: (err) => setError(err.message),
      }
    ).finally(() => setLoading(false));
  };

  const deleteMenu = async (id: string | number) => {
    setError("");
    setLoading(true);

    await handleApiCall<void>(() => menuApi.delete(id), {
      successMessage: "Menu deleted successfully!",
      errorMessage: "Failed to delete menu.",
      onSuccess: () => {
        setMenus((prev) => prev.filter((m) => m.ID !== id));
        setTotalItems((prev) => prev - 1);
      },
      onError: (err) => setError(err.message),
    }).finally(() => setLoading(false));
  };

  //Get Detail
  const getMenuDetail = async (menuId: string) => {
    setError("");
    setLoading(true);
    setMenuDetail(null); // reset trước khi load

    await handleApiCall<MenuDetailResponse>(() => menuApi.getById(menuId), {
      successMessage: "Menu detail fetched successfully!",
      errorMessage: "Failed to fetch menu details.",
      onSuccess: (detail) => {
        setMenuDetail(detail);
      },
      onError: (err) => setError(err.message),
    }).finally(() => setLoading(false));
  };

  // Filter Apply
  const handleApplyFilters = (newFilters: BaseFilterState) => {
    setFilters(newFilters);
    setPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(totalItems / pageSize);
  const handleNextPage = () => setPage((p) => Math.min(p + 1, totalPages));
  const handlePrevPage = () => setPage((p) => Math.max(p - 1, 1));

  return {
    // Data
    menus,
    loading,
    error,
    menuDetails,
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
    getAllMenus,
    createMenu,
    bulkUpdateMenus,
    deleteMenu,
    getMenuDetail,
  };
}
