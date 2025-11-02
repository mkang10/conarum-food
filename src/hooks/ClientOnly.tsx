import { useEffect, useState } from "react"

export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black text-white">
        {/* Optional: simple spinner or text here */}
        <div className="text-sm">Đang khởi tạo...</div>
      </div>
    )
  }

  return <>{children}</>
}
