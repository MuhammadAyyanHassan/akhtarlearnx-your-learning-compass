import type { LeaderboardEntry, RankingPeriod } from "../types";
import { getXpForPeriod } from "../utils/ranking";
import PodiumCard from "./PodiumCard";

export default function Podium({
  topThree,
  period,
}: {
  topThree: LeaderboardEntry[];
  period: RankingPeriod;
}) {
  if (topThree.length === 0) return null;

  const viewed = topThree.slice(0, 3);
  const visualOrder: number[] =
    viewed.length >= 3
      ? [1, 0, 2]
      : viewed.length === 2
        ? [0, 1]
        : [0];

  return (
    <div className="flex items-end justify-center gap-4">
      {visualOrder.map((i) => (
        <PodiumCard
          key={viewed[i].id}
          entry={viewed[i]}
          position={(i + 1) as 1 | 2 | 3}
          displayXp={getXpForPeriod(viewed[i], period)}
        />
      ))}
    </div>
  );
}
