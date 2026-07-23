import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  Medal,
  User,
  Bell,
  Search,
  LogOut,
} from "lucide-react";
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

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/" as const, match: "/" },
  { icon: BookOpen, label: "Subjects", to: "/learn" as const, match: "/learn" },
  { icon: Trophy, label: "Achievements", to: "/achievements" as const, match: "/achievements" },
  { icon: Medal, label: "Leaderboard", to: "/" as const, match: "/leaderboard" },
  { icon: User, label: "Profile", to: "/" as const, match: "/profile" },
];

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
        <Sidebar />
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
      <Sidebar />

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

function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="fixed inset-y-4 left-4 z-20 flex w-[216px] flex-col rounded-3xl bg-sidebar px-5 py-7 text-sidebar-foreground shadow-[var(--shadow-elevated)]">
      <div className="flex items-center gap-2 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground font-extrabold">
          A.
        </div>
        <div className="leading-tight">
          <p className="text-sm font-bold text-white">AkhtarLearnX</p>
          <p className="text-[10px] uppercase tracking-widest text-sidebar-foreground/60">
            Matric Prep
          </p>
        </div>
      </div>

      <nav className="mt-10 flex-1 space-y-1.5">
        {navItems.map((item) => {
          const isActive = pathname === item.match;
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-[var(--shadow-glow)]"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-white"
              }`}
            >
              <item.icon
                className="h-[18px] w-[18px] transition-transform group-hover:scale-110"
                strokeWidth={1.75}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button className="mt-4 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-white">
        <LogOut className="h-[18px] w-[18px]" strokeWidth={1.75} />
        Sign out
      </button>
    </aside>
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
