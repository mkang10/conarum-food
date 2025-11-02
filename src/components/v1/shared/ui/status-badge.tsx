interface StatusBadgeProps {
  status: number
  className?: string
}

/**
 * 🎯 StatusBadge — đồng bộ hiệu ứng nhấp nháy như menu.meals.IsAvailable
 *  - Active (status === 0) → chấm xanh lá nhấp nháy
 *  - Inactive → chấm xám tĩnh
 */
export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const isActive = status === 0

  return (
    <span
      className={[
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 ease-out",
        isActive
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-gray-100 text-gray-500 border-gray-300",
        "dark:border-gray-700 dark:bg-gray-800/40 dark:text-gray-400",
        className,
      ].join(" ")}
    >
      {/* Chấm trạng thái */}
      <span
        className={`h-3 w-3 rounded-full ${
          isActive
            ? "bg-green-500 animate-pulse"
            : "bg-gray-400"
        }`}
      ></span>

      {/* Text trạng thái */}
      <span className="font-semibold tracking-wide">
        {isActive ? "Active" : "In-Active"}
      </span>
    </span>
  )
}
