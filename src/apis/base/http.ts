import { apiFetch } from "../client";

// ====== Type Definitions ======
type QueryValue = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryValue>;

type JsonBody = object;
type RequestBody = JsonBody | FormData | undefined;

// ====== Helper ======
const buildQueryString = (params?: QueryParams): string => {
  if (!params) return "";

  return Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&")
    .replace(/^&/, ""); // loại bỏ & đầu nếu có
};



// ====== API Client ======

export const api = {
   get: async <T>(url: string, params?: QueryParams): Promise<T> => {
    const [baseUrl, queryPart] = url.split("?");

    const existingParams = new URLSearchParams(queryPart);
    const existingExpand = existingParams.get("$expand");

    const newExpand = "createdByUser($select=Name,Email)";

    const mergedExpand = existingExpand
      ? `${existingExpand},${newExpand}`
      : newExpand;

    const mergedParams = {
      ...params,
      "$expand": mergedExpand,
    };

    const queryString = buildQueryString(mergedParams);

    const finalUrl = `${baseUrl}?${queryString}`;

    return apiFetch<T>(finalUrl, { method: "GET" });
  },

  post: async <T, TBody extends RequestBody = JsonBody>(
    url: string,
    body?: TBody
  ): Promise<T> => {
    return apiFetch<T>(url, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body ?? {}),
      headers:
        body instanceof FormData
          ? undefined
          : { "Content-Type": "application/json" },
    });
  },

  put: async <T, TBody extends RequestBody = JsonBody>(
    url: string,
    body?: TBody
  ): Promise<T> => {
    return apiFetch<T>(url, {
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body ?? {}),
      headers:
        body instanceof FormData
          ? undefined
          : { "Content-Type": "application/json" },
    });
  },

  patch: async <T, TBody extends RequestBody = JsonBody>(
    url: string,
    body?: TBody
  ): Promise<T> => {
    return apiFetch<T>(url, {
      method: "PATCH",
      body: body instanceof FormData ? body : JSON.stringify(body ?? {}),
      headers:
        body instanceof FormData
          ? undefined
          : { "Content-Type": "application/json" },
    });
  },

  delete: async <T, TBody extends RequestBody = JsonBody>(
    url: string,
    body?: TBody
  ): Promise<T | null> => {
    const options: RequestInit = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    if (body && !(body instanceof FormData)) {
      options.body = JSON.stringify(body);
    } else if (body instanceof FormData) {
      delete options.headers!["Content-Type"];
      options.body = body;
    }

    return apiFetch<T>(url, options);
  },
};
