import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "react-toastify"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function handleApiCall<T>(
  apiCall: () => Promise<T>,
  options?: {
    successMessage?: string
    errorMessage?: string
    onSuccess?: (data: T) => void
    onError?: (err: Error) => void
  }
) {
  try {
    const data = await apiCall()
    if (options?.successMessage) toast.success(options.successMessage)
    options?.onSuccess?.(data)
    return data
  } catch (err) {
    const error = err instanceof Error ? err : new Error("Unknown error")
    toast.error(options?.errorMessage || error.message)
    options?.onError?.(error)
    throw error
  }
}