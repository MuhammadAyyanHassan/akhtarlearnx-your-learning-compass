import type { AchievementCategory } from "../types";

const categories: { key: "all" | AchievementCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "learning", label: "Learning" },
  { key: "quiz", label: "Quiz" },
  { key: "accuracy", label: "Accuracy" },
  { key: "consistency", label: "Consistency" },
  { key: "challenges", label: "Challenges" },
];

export default function AchievementFilterChips({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: "all" | AchievementCategory;
  onFilterChange: (filter: "all" | AchievementCategory) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Achievement category filter">
      {categories.map((cat) => {
        const isActive = activeFilter === cat.key;
        return (
          <button
            key={cat.key}
            role="tab"
            aria-selected={isActive}
            aria-pressed={isActive}
            onClick={() => onFilterChange(cat.key)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
              isActive
                ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                : "border border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
