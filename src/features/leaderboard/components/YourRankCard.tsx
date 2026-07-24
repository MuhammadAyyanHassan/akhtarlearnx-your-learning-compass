import { Medal } from "lucide-react";
import type { LeaderboardEntry } from "../types";

function formatXp(n: number): string {
  return n.toLocaleString();
}

export default function YourRankCard({
  currentUserEntry,
  currentUserRank,
  displayXp,
}: {
  currentUserEntry: LeaderboardEntry;
  currentUserRank: number | null;
  displayXp: number;
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Your Rank
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-2xl">{currentUserEntry.countryFlagEmoji}</span>
            <h3 className="text-lg font-bold tracking-tight text-foreground">
              {currentUserEntry.name}
            </h3>
          </div>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
          <Medal className="h-5 w-5 text-primary" strokeWidth={2} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-2xl bg-muted/50 px-4 py-3">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Rank
        </span>
        <span className="text-lg font-extrabold text-primary">
          {currentUserRank === null
            ? "Not yet ranked"
            : `#${currentUserRank}`}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-muted/50 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Title
          </p>
          <p className="mt-0.5 text-sm font-bold text-foreground">
            {currentUserEntry.rpgTitle}
          </p>
        </div>
        <div className="rounded-2xl bg-muted/50 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Level
          </p>
          <p className="mt-0.5 text-sm font-bold text-foreground">
            {currentUserEntry.level}
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-[image:var(--gradient-primary)] p-4 text-primary-foreground">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/80">
          Total XP
        </p>
        <p className="mt-0.5 text-xl font-extrabold">
          {formatXp(displayXp)} XP
        </p>
      </div>
    </div>
  );
}
