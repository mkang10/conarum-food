"use client";

import { api } from "../base/http";
import { authUrl } from "./auth-url";
import { LoginRequest } from "@/types/request/login-request";
import { LoginResponse } from "@/types/response/login-response";

export const authApi = {
  login: (payload: LoginRequest): Promise<LoginResponse> => {
    return api.post<LoginResponse>(authUrl.login, payload);
  },
};


