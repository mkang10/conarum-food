export function formatData(key: string, value: unknown): string {
  if (value == null) return "";

  const normalizedKey = key.toLowerCase();

  // Handle date formatting
  if (
    normalizedKey.includes("date") ||
    normalizedKey.includes("createdat") ||
    normalizedKey.includes("modifiedat")
  ) {
    try {
      const date = new Date(value as string);
      if (!isNaN(date.getTime())) {
        const formattedDate = date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        // ✅ Nếu key là "date" => thêm chữ "Menu Thứ ..."
        if (normalizedKey === "date") {
          const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];

          const weekday = days[date.getDay()];
          return ` (${weekday}) ${formattedDate}`;
        }

        // Các field ngày khác (createdAt, modifiedAt) vẫn giữ nguyên
        return date.toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    } catch {
      return String(value);
    }
  }

  // Handle currency-like fields
  if (
    normalizedKey.includes("price") ||
    normalizedKey.includes("amount") ||
    normalizedKey.includes("total")
  ) {
    return `${Number(value).toLocaleString("en-US")} ₫`;
  }

  // Handle boolean-like fields
  if (typeof value === "boolean") {
    return value ? "Active" : "Inactive";
  }

  // Default
  return String(value);
}
