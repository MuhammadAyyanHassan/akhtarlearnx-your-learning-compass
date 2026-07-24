import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import LeaderboardHeader from "../features/leaderboard/components/LeaderboardHeader";
import PeriodTabs from "../features/leaderboard/components/PeriodTabs";
import Podium from "../features/leaderboard/components/Podium";
import LeaderboardList from "../features/leaderboard/components/LeaderboardList";
import YourRankCard from "../features/leaderboard/components/YourRankCard";
import { leaderboardEntries } from "../features/leaderboard/data/leaderboardEntries";
import { currentUser } from "../features/leaderboard/data/currentUser";
import {
  getFullLeaderboardForCohort,
  getXpForPeriod,
} from "../features/leaderboard/utils/ranking";
import type { RankingPeriod, LeaderboardEntry } from "../features/leaderboard/types";

function cohortLabelFromEntry(entry: LeaderboardEntry): string {
  const levelMap: Record<string, string> = {
    "matric-9": "Class 9",
    "matric-10": "Class 10",
  };
  const streamMap: Record<string, string> = {
    "science-biology": "Biology",
    "science-computer-science": "Computer Science",
  };
  const level = levelMap[entry.academicLevel] ?? entry.academicLevel;
  const stream = entry.stream ? streamMap[entry.stream] ?? entry.stream : "General";
  return `${level} · ${stream}`;
}

export const Route = createFileRoute("/leaderboard")({
  component: LeaderboardPage,
  head: () => ({
    meta: [
      { title: "Leaderboard — AkhtarLearnX" },
      {
        name: "description",
        content:
          "See how you rank against other students in your cohort. Compare weekly, monthly and all-time XP on AkhtarLearnX.",
      },
      { property: "og:title", content: "Leaderboard — AkhtarLearnX" },
      {
        property: "og:description",
        content:
          "Gamified matric leaderboard comparing XP, levels and RPG titles across students worldwide.",
      },
    ],
  }),
});

function LeaderboardPage() {
  const [activePeriod, setActivePeriod] = useState<RankingPeriod>("allTime");

  const { top10, currentUserRank } = getFullLeaderboardForCohort(
    leaderboardEntries,
    currentUser,
    activePeriod,
  );

  const cohortLabel = cohortLabelFromEntry(currentUser);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <AppSidebar />

      <main className="ml-[240px] p-8">
        <TopBar />

        <div className="mt-6 space-y-6">
          <LeaderboardHeader cohortLabel={cohortLabel} />
          <PeriodTabs
            activePeriod={activePeriod}
            onPeriodChange={setActivePeriod}
          />
          <Podium topThree={top10.slice(0, 3)} period={activePeriod} />
          <LeaderboardList rankedTop10={top10} period={activePeriod} />
          <YourRankCard
            currentUserEntry={currentUser}
            currentUserRank={currentUserRank}
            displayXp={getXpForPeriod(currentUser, activePeriod)}
          />
        </div>
      </main>
    </div>
  );
}

function TopBar() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Leaderboard
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">
          Rankings & Progress
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search subjects, chapters, quizzes..."
            className="w-[320px] rounded-full border border-border bg-card py-2.5 pl-10 pr-4 text-sm shadow-[var(--shadow-soft)] outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <button className="relative flex h-11 w-11 items-center justify-center rounded-full bg-card shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5">
          <Bell className="h-4 w-4" strokeWidth={2} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[var(--warning)]" />
        </button>
        <div className="flex items-center gap-3 rounded-full bg-card p-1 pr-4 shadow-[var(--shadow-soft)]">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] text-sm font-bold text-primary-foreground">
            MA
          </div>
          <div className="leading-tight">
            <p className="text-xs font-semibold">Muhammad Ali</p>
            <p className="text-[10px] text-muted-foreground">Science — Biology</p>
          </div>
        </div>
      </div>
    </div>
  );
}
