import { useState } from "react"
import { authApi } from "@/apis/auth/auth"
import { handleApiCall } from "@/lib/utils"

export function useAuthForm() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    await handleApiCall(
      () => authApi.login({ Email: form.email, Password: form.password }),
      {
        successMessage: "Login successful!",
        errorMessage: "Login failed. Please check your credentials.",
        onSuccess: (data) => {
          localStorage.setItem("token", data.token)
          localStorage.setItem("user", JSON.stringify(data))
          window.location.href = "/emp/home"
        },
        onError: (err) => setError(err.message),
      }
    ).finally(() => setLoading(false))
  }

  return { form, handleChange, handleSubmit, loading, error }
}
