interface BalanceCardProps {
  label: string
  amount: string
  color: "green" | "red" | "orange"
}

export default function BalanceCard({ label, amount, color }: BalanceCardProps) {
  const colorClasses = {
    green: "text-green-600",
    red: "text-red-600",
    orange: "text-orange-600",
  }

  const barColors = {
    green: "bg-green-500",
    red: "bg-red-500",
    orange: "bg-orange-500",
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-4">
        <p className={`text-2xl font-bold ${colorClasses[color]}`}>{amount}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
      <div className="flex gap-0.5">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className={`h-12 flex-1 rounded-sm ${i < 16 ? barColors[color] : "bg-muted"}`} />
        ))}
      </div>
    </div>
  )
}
