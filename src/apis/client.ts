import { publicEnv } from "@/lib/public-env";
import { ApiError } from "@/types/ApiError";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const baseUrl = publicEnv.NEXT_PUBLIC_API_BASE_URL;
  const url = `${baseUrl}${endpoint}`;

  const token = localStorage.getItem("token");

  const isFormData = options?.body instanceof FormData;

  const headers: HeadersInit = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options?.headers ?? {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new ApiError(
        endpoint,
        `Request failed with status ${response.status} ${response.statusText}`,
        response.status,
        text
      );
    }

    try {
      if (response.status === 204) return null;
      return (await response.json()) as T;
    } catch {
      throw new ApiError(
        endpoint,
        "Failed to parse JSON response",
        response.status
      );
    }
  } catch (err) {
    if (err instanceof ApiError) {
      console.error("[apiFetch] API Error:", {
        endpoint: err.endpoint,
        status: err.status,
        message: err.message,
        details: err.details,
      });
      throw err;
    }

    const unknownError =
      err instanceof Error
        ? err
        : new Error("Unknown error occurred during fetch");
    console.error(
      `[apiFetch] Unexpected Error at ${endpoint}:`,
      unknownError.message
    );
    throw new ApiError(endpoint, "Network or unexpected error occurred");
  }
}
