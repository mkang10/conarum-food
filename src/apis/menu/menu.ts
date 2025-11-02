"use client";

import {
  BulkUpdateMenuResponse,
  CreateMenuResponse,
  MenuDetailResponse,
  MenuResponse,
} from "@/types/response/menu-response";
import { api } from "../base/http";
import { menuUrl } from "./menu-url";
import {
  BulkUpdateMenuRequest,
  CreateMenuRequest,
} from "@/types/request/menu-request";

export const menuApi = {
  // Get all menus
  getAll: (
    params?: Record<string, string | number | boolean>
  ): Promise<MenuResponse> => {
    return api.get<MenuResponse>(menuUrl.getAll, params);
  },

  // Get a single menu by ID
  getById: (id: string | number): Promise<MenuDetailResponse> => {
    return api.get<MenuDetailResponse>(menuUrl.getById(id));
  },

  // Create a new menu
  create: (payload: CreateMenuRequest): Promise<CreateMenuResponse> => {
    return api.post<CreateMenuResponse>(menuUrl.create, payload);
  },

  // Update Multi
  bulkUpdate: (
    payload: BulkUpdateMenuRequest
  ): Promise<BulkUpdateMenuResponse> => {
    return api.post<BulkUpdateMenuResponse>(menuUrl.bulkUpdate, payload);
  },

  // Update an entire menu (PUT)
  // update: (
  //   id: string | number,
  //   payload: MenuRequest
  // ): Promise<MenuResponse> => {
  //   return api.put<MenuResponse>(menuUrl.update(id), payload);
  // },

  // // Partially update a menu (PATCH)
  // patch: (
  //   id: string | number,
  //   payload: Partial<MenuRequest>
  // ): Promise<MenuResponse> => {
  //   return api.patch<MenuResponse>(menuUrl.patch(id), payload);
  // },

  // Delete a menu
  delete: (id: string | number): Promise<void> => {
    return api.delete<void>(menuUrl.delete(id));
  },
};
