import type { Achievement } from "../types";

export function unlockedCount(achievements: Achievement[]): number {
  return achievements.filter(
    (a) => a.status === "unlocked" || a.status === "claimed",
  ).length;
}

export function xpEarned(achievements: Achievement[]): number {
  return achievements
    .filter((a) => a.status === "claimed")
    .reduce((sum, a) => sum + a.xpReward, 0);
}

export function collectionPercent(achievements: Achievement[]): number {
  if (achievements.length === 0) return 0;
  return Math.round((unlockedCount(achievements) / achievements.length) * 100);
}