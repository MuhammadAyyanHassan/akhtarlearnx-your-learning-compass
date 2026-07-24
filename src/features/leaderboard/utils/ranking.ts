import type {
  LeaderboardCohort,
  LeaderboardEntry,
  RankingPeriod,
} from "../types";

export function getCohort(entry: LeaderboardEntry): LeaderboardCohort {
  return {
    educationSystem: entry.educationSystem,
    academicLevel: entry.academicLevel,
    stream: entry.stream,
  };
}

export function isSameCohort(
  a: LeaderboardCohort,
  b: LeaderboardCohort,
): boolean {
  return (
    a.educationSystem === b.educationSystem &&
    a.academicLevel === b.academicLevel &&
    a.stream === b.stream
  );
}

export function filterByCohort(
  entries: LeaderboardEntry[],
  cohort: LeaderboardCohort,
): LeaderboardEntry[] {
  return entries.filter((entry) => isSameCohort(getCohort(entry), cohort));
}

export function getXpForPeriod(
  entry: LeaderboardEntry,
  period: RankingPeriod,
): number {
  return entry.xp[period];
}

export function getRankedList(
  entries: LeaderboardEntry[],
  period: RankingPeriod,
): LeaderboardEntry[] {
  return [...entries].sort(
    (a, b) => getXpForPeriod(b, period) - getXpForPeriod(a, period),
  );
}

export function getTopN(
  rankedList: LeaderboardEntry[],
  n: number,
): LeaderboardEntry[] {
  if (n <= 0) return [];
  return rankedList.slice(0, n);
}

export function getRankOf(
  rankedList: LeaderboardEntry[],
  entryId: string,
): number | null {
  const index = rankedList.findIndex((entry) => entry.id === entryId);
  return index === -1 ? null : index + 1;
}

export function getFullLeaderboardForCohort(
  allEntries: LeaderboardEntry[],
  currentUserEntry: LeaderboardEntry,
  period: RankingPeriod,
): {
  rankedList: LeaderboardEntry[];
  top10: LeaderboardEntry[];
  currentUserRank: number | null;
} {
  const entriesWithUser = allEntries.some(
    (entry) => entry.id === currentUserEntry.id,
  )
    ? allEntries
    : [...allEntries, currentUserEntry];

  const cohort = getCohort(currentUserEntry);
  const cohortEntries = filterByCohort(entriesWithUser, cohort);
  const rankedList = getRankedList(cohortEntries, period);
  const top10 = getTopN(rankedList, 10);
  const currentUserRank = getRankOf(rankedList, currentUserEntry.id);

  return { rankedList, top10, currentUserRank };
}
