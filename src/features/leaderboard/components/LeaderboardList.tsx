import type { LeaderboardEntry, RankingPeriod } from "../types";
import { getXpForPeriod } from "../utils/ranking";
import LeaderboardListRow from "./LeaderboardListRow";

export default function LeaderboardList({
  rankedTop10,
  period,
}: {
  rankedTop10: LeaderboardEntry[];
  period: RankingPeriod;
}) {
  const rows = rankedTop10.slice(3);

  if (rows.length === 0) return null;

  return (
    <div className="space-y-2">
      {rows.map((entry, i) => (
        <LeaderboardListRow
          key={entry.id}
          entry={entry}
          rank={i + 4}
          displayXp={getXpForPeriod(entry, period)}
        />
      ))}
    </div>
  );
}
