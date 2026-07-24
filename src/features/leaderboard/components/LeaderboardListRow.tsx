import type { LeaderboardEntry } from "../types";

function formatXp(n: number): string {
  return n.toLocaleString();
}

export default function LeaderboardListRow({
  entry,
  rank,
  displayXp,
}: {
  entry: LeaderboardEntry;
  rank: number;
  displayXp: number;
}) {
  const badgeClass =
    rank === 1
      ? "bg-[var(--warning)] text-white"
      : rank === 2
        ? "bg-muted-foreground/30 text-foreground"
        : "bg-primary/15 text-primary";

  return (
    <div className="flex items-center justify-between rounded-xl bg-card px-4 py-3">
      <div className="flex items-center gap-3 min-w-0">
        <span
          className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${badgeClass}`}
        >
          {rank}
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="flex-shrink-0">{entry.countryFlagEmoji}</span>
            <span className="truncate text-sm font-semibold text-foreground">
              {entry.name}
            </span>
          </div>
          <p className="truncate text-[11px] text-muted-foreground">
            {entry.rpgTitle} · Level {entry.level}
          </p>
        </div>
      </div>
      <span className="flex-shrink-0 text-sm font-bold text-foreground">
        {formatXp(displayXp)} XP
      </span>
    </div>
  );
}
