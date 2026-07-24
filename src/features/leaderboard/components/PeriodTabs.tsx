import type { RankingPeriod } from "../types";

const periods: { key: RankingPeriod; label: string }[] = [
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
  { key: "allTime", label: "All Time" },
];

export default function PeriodTabs({
  activePeriod,
  onPeriodChange,
}: {
  activePeriod: RankingPeriod;
  onPeriodChange: (period: RankingPeriod) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Ranking period filter">
      {periods.map((p) => {
        const isActive = activePeriod === p.key;
        return (
          <button
            key={p.key}
            role="tab"
            aria-selected={isActive}
            aria-pressed={isActive}
            onClick={() => onPeriodChange(p.key)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
              isActive
                ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                : "border border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            {p.label}
          </button>
        );
      })}
    </div>
  );
}
