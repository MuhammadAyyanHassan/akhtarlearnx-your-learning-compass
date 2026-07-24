import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell,
  Search,
} from "lucide-react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import AchievementsHeader from "../features/achievements/components/AchievementsHeader";
import AchievementFilterChips from "../features/achievements/components/AchievementFilterChips";
import AchievementCategorySection from "../features/achievements/components/AchievementCategorySection";
import { achievements } from "../features/achievements/data/achievements";
import type { AchievementCategory } from "../features/achievements/types";

export const Route = createFileRoute("/achievements")({
  component: AchievementsPage,
  head: () => ({
    meta: [
      { title: "Achievements — AkhtarLearnX" },
      {
        name: "description",
        content:
          "Track your achievements, unlock rewards and earn XP on AkhtarLearnX.",
      },
      { property: "og:title", content: "Achievements — AkhtarLearnX" },
      {
        property: "og:description",
        content:
          "Complete lessons, quizzes and challenges to earn achievements on AkhtarLearnX.",
      },
    ],
  }),
});

const categories: AchievementCategory[] = [
  "learning",
  "quiz",
  "accuracy",
  "consistency",
  "challenges",
];

function AchievementsPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | AchievementCategory>("all");

  if (achievements.length === 0) {
    return (
      <div className="min-h-screen bg-background font-sans text-foreground antialiased">
        <AppSidebar />
        <main className="ml-[240px] p-8">
          <TopBar />
          <div className="mt-6 py-20 text-center">
            <p className="text-sm text-muted-foreground">
              Complete your first lesson to start unlocking achievements.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const visibleCategories =
    activeFilter === "all" ? categories : [activeFilter];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <AppSidebar />

      <main className="ml-[240px] p-8">
        <TopBar />

        <div className="mt-6 space-y-6">
          <AchievementsHeader />
          <AchievementFilterChips
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
          {visibleCategories.map((cat) => (
            <AchievementCategorySection
              key={cat}
              category={cat}
              achievements={achievements.filter((a) => a.category === cat)}
            />
          ))}
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
          Achievements
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">
          Your achievements
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
