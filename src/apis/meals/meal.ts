"use client";

import {
  BulkUpdateMealResponse,
  CreateMealResponse,
  MealResponse,
} from "@/types/response/meal-response";
import { api } from "../base/http";
import { mealUrl } from "./meal-url";
import {
  BulkUpdateMealRequest,
  CreateMealRequest,
} from "@/types/request/meal-request";

export const mealApi = {
  // 🟢 Get all meals
  getAll: (
    params?: Record<string, string | number | boolean>
  ): Promise<MealResponse> => {
    return api.get<MealResponse>(mealUrl.getAll, params);
  },

  // 🟢 Get a single meal by ID
  getById: (id: string | number): Promise<MealResponse> => {
    return api.get<MealResponse>(mealUrl.getById(id));
  },

  // 🟢 Create a new meal
  // create: (payload: CreateMealRequest): Promise<CreateMealResponse> => {
  //   return api.post<CreateMealResponse>(mealUrl.create, payload);
  // },

  create: (payload: CreateMealRequest): Promise<CreateMealResponse> => {
    const formData = new FormData();
    formData.append("Name", payload.Name);
    formData.append("Description", payload.Description || "");
    formData.append("Price", String(payload.Price));
    formData.append("VendorName", payload.VendorName);
    formData.append("VendorPhone", payload.VendorPhone);
    formData.append("VendorAddr", payload.VendorAddr);

    if (payload.ImageUrl) {
      formData.append("ImageUrl", payload.ImageUrl);
    }

    return api.post<CreateMealResponse>(mealUrl.uploadMeal, formData);
  },

  // 🟢 Bulk update multiple meals
  bulkUpdate: (
    payload: BulkUpdateMealRequest
  ): Promise<BulkUpdateMealResponse> => {
    return api.post<BulkUpdateMealResponse>(mealUrl.bulkUpdate, payload);
  },

  // 🔴 Delete a meal by ID
  delete: (id: string | number): Promise<void> => {
    return api.delete<void>(mealUrl.delete(id));
  },
};
