import { Crown } from "lucide-react";
import type { LeaderboardEntry } from "../types";

function formatXp(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

const positionStyles = {
  1: {
    card: "border border-border/60 bg-card shadow-[var(--shadow-glow)] ring-1 ring-[var(--warning)]/30",
    avatar:
      "h-16 w-16 rounded-full bg-[image:var(--gradient-primary)] text-lg font-bold text-primary-foreground shadow-[var(--shadow-glow)]",
    badge:
      "flex h-7 w-7 items-center justify-center rounded-full bg-[var(--warning)] text-white text-xs font-bold",
    crown: true,
  },
  2: {
    card: "border border-border/60 bg-card shadow-[var(--shadow-soft)]",
    avatar:
      "h-14 w-14 rounded-full bg-[image:var(--gradient-primary)] text-base font-bold text-primary-foreground",
    badge:
      "flex h-6 w-6 items-center justify-center rounded-full bg-muted-foreground/30 text-foreground text-[10px] font-bold",
    crown: false,
  },
  3: {
    card: "border border-border/60 bg-card shadow-[var(--shadow-soft)]",
    avatar:
      "h-14 w-14 rounded-full bg-[image:var(--gradient-primary)] text-base font-bold text-primary-foreground",
    badge:
      "flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary text-[10px] font-bold",
    crown: false,
  },
};

export default function PodiumCard({
  entry,
  position,
  displayXp,
}: {
  entry: LeaderboardEntry;
  position: 1 | 2 | 3;
  displayXp: number;
}) {
  const style = positionStyles[position];
  return (
    <div
      className={`flex w-[180px] flex-col items-center rounded-2xl px-5 py-6 text-center transition-all ${style.card}`}
    >
      <div className={style.badge}>{position}</div>
      <div className={`mt-3 flex items-center justify-center ${style.avatar}`}>
        {entry.avatarInitials}
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-2xl">
        {entry.countryFlagEmoji}
      </div>
      <p className="mt-2 text-sm font-bold leading-tight text-foreground">
        {entry.name}
      </p>
      <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {entry.rpgTitle}
      </p>
      <div className="mt-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <span>Level {entry.level}</span>
        <span className="text-border/60">·</span>
        <span className="font-bold text-foreground">{formatXp(displayXp)} XP</span>
      </div>
      {style.crown && (
        <Crown className="mt-2 h-4 w-4 text-[var(--warning)]" strokeWidth={2.5} />
      )}
    </div>
  );
}
