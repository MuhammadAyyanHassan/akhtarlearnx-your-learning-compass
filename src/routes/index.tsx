import { createFileRoute } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  Medal,
  User,
  Bell,
  Search,
  Flame,
  Star,
  BookMarked,
  ClipboardCheck,
  Target,
  Sparkles,
  Play,
  ChevronRight,
  Award,
  Crown,
  LogOut,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import heroStudent from "@/assets/hero-student.png";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Dashboard — AkhtarLearnX" },
      {
        name: "description",
        content:
          "Your AkhtarLearnX dashboard: continue learning, complete daily missions, take random challenges and climb the leaderboard.",
      },
      { property: "og:title", content: "Dashboard — AkhtarLearnX" },
      {
        property: "og:description",
        content: "Gamified matric learning dashboard with XP, streaks and daily missions.",
      },
    ],
  }),
});

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: BookOpen, label: "Subjects" },
  { icon: Trophy, label: "Achievements" },
  { icon: Medal, label: "Leaderboard" },
  { icon: User, label: "Profile" },
];

const weeklyXP = [
  { day: "Mon", xp: 240 },
  { day: "Tue", xp: 380 },
  { day: "Wed", xp: 310 },
  { day: "Thu", xp: 520 },
  { day: "Fri", xp: 460 },
  { day: "Sat", xp: 680 },
  { day: "Sun", xp: 590 },
];

const topStudents = [
  { rank: 1, name: "Ayesha Khan", xp: "22,410", initials: "AK" },
  { rank: 2, name: "Bilal Ahmed", xp: "19,880", initials: "BA" },
  { rank: 3, name: "Sana Malik", xp: "18,240", initials: "SM" },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <Sidebar />

      <main className="ml-[240px] p-8">
        <TopBar />

        <div className="mt-6 grid grid-cols-12 gap-6">
          {/* LEFT COLUMN */}
          <section className="col-span-12 xl:col-span-7 space-y-6">
            <HeroCard />
            <StatsRow />

            <h2 className="pt-2 text-lg font-semibold tracking-tight">
              Today's Learning Hub
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DailyMissionCard />
              <RandomChallengeCard />
              <LeaderboardPreviewCard />
              <RecentAchievementCard />
            </div>
          </section>

          {/* RIGHT COLUMN */}
          <aside className="col-span-12 xl:col-span-5 space-y-6">
            <ContinueLearningCard />
            <WeeklyXPCard />
            <UpcomingGoalCard />
          </aside>
        </div>
      </main>
    </div>
  );
}

/* ---------------- Sidebar ---------------- */
function Sidebar() {
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
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
              item.active
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-[var(--shadow-glow)]"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-white"
            }`}
          >
            <item.icon
              className="h-[18px] w-[18px] transition-transform group-hover:scale-110"
              strokeWidth={1.75}
            />
            {item.label}
          </button>
        ))}
      </nav>

      <button className="mt-4 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-white">
        <LogOut className="h-[18px] w-[18px]" strokeWidth={1.75} />
        Sign out
      </button>
    </aside>
  );
}

/* ---------------- Top Bar ---------------- */
function TopBar() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Dashboard
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">
          Welcome back, Muhammad!
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

/* ---------------- Hero ---------------- */
function HeroCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-hero)] p-10 shadow-[var(--shadow-soft)]">
      <div className="grid grid-cols-5 items-center gap-6">
        <div className="col-span-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-card/70 px-3 py-1 text-[11px] font-semibold text-primary backdrop-blur">
            <Sparkles className="h-3 w-3" />
            Day 12 streak — keep it going
          </span>
          <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight">
            Ready to master another <br />
            <span className="text-primary">chapter today?</span>
          </h2>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Only 420 XP left to reach Level 28 and unlock the Veteran title! Keep the momentum
            going, Muhammad.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5">
              <Play className="h-4 w-4 fill-current" />
              Resume learning
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent">
              Browse subjects
            </button>
          </div>
        </div>
        <div className="col-span-2 flex justify-end">
          <img
            src={heroStudent}
            alt="Student studying with a book and laptop"
            width={280}
            height={260}
            className="h-[260px] w-auto object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}

/* ---------------- Stats ---------------- */
function StatsRow() {
  const stats = [
    {
      icon: BookMarked,
      label: "Subjects Enrolled",
      value: "8",
      unit: "Subjects",
      tone: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: ClipboardCheck,
      label: "Tests Completed",
      value: "146",
      unit: "Tests",
      tone: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      icon: Star,
      label: "Total XP",
      value: "14,580",
      unit: "XP",
      tone: "text-[var(--warning)]",
      bg: "bg-[var(--warning)]/10",
    },
    {
      icon: Flame,
      label: "Daily Streak",
      value: "12",
      unit: "Days",
      tone: "text-destructive",
      bg: "bg-destructive/10",
    },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="group rounded-2xl border border-border/60 bg-card p-4 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}>
            <s.icon className={`h-5 w-5 ${s.tone}`} strokeWidth={2} />
          </div>
          <p className="mt-3 text-xs font-medium text-muted-foreground">{s.label}</p>
          <p className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold tracking-tight">{s.value}</span>
            <span className="text-xs font-medium text-muted-foreground">{s.unit}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Continue Learning (Featured) ---------------- */
function ContinueLearningCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-primary)] p-8 text-primary-foreground shadow-[var(--shadow-glow)]">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest backdrop-blur">
          Continue Learning
        </span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur">
          <BookOpen className="h-4 w-4" strokeWidth={2} />
        </div>
      </div>

      <p className="mt-8 text-xs font-medium uppercase tracking-widest text-white/70">
        Mathematics
      </p>
      <h3 className="mt-1 text-2xl font-extrabold tracking-tight">Quadratic Equations</h3>
      <p className="mt-1.5 text-xs text-white/80">Chapter 4 · Lesson 3 of 5</p>

      <div className="mt-8">
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="text-white/80">Progress</span>
          <span>68%</span>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-white transition-all duration-700"
            style={{ width: "68%" }}
          />
        </div>
      </div>

      <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5">
        Continue Learning
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ---------------- Weekly XP Chart ---------------- */
function WeeklyXPCard() {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            This Week
          </p>
          <h3 className="mt-1 text-base font-bold tracking-tight">Weekly XP Progress</h3>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          +3,180 XP
        </span>
      </div>

      <div className="mt-4 h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weeklyXP} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="xpFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "var(--card)",
                fontSize: 12,
                boxShadow: "var(--shadow-soft)",
              }}
            />
            <Area
              type="monotone"
              dataKey="xp"
              stroke="var(--primary)"
              strokeWidth={2.5}
              fill="url(#xpFill)"
            />
            <Line
              type="monotone"
              dataKey="xp"
              stroke="var(--primary)"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "var(--primary)", strokeWidth: 2, stroke: "var(--card)" }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ---------------- Daily Mission ---------------- */
function DailyMissionCard() {
  const done = 13;
  const total = 20;
  const pct = (done / total) * 100;
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
          <Target className="h-5 w-5 text-primary" strokeWidth={2} />
        </div>
        <span className="rounded-full bg-[var(--warning)]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--warning)]">
          Bonus XP
        </span>
      </div>
      <h4 className="mt-4 text-base font-bold tracking-tight">Daily Mission</h4>
      <p className="mt-0.5 text-xs text-muted-foreground">20 mixed questions · resets in 6h 42m</p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-bold text-foreground">
            {done} / {total}
          </span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-[image:var(--gradient-primary)] transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5">
        Continue Mission
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ---------------- Random Challenge ---------------- */
function RandomChallengeCard() {
  const subjects = ["Mathematics", "Physics", "English"];
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/15">
          <Sparkles className="h-5 w-5 text-secondary" strokeWidth={2} />
        </div>
        <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary">
          50 Q
        </span>
      </div>
      <h4 className="mt-4 text-base font-bold tracking-tight">Random Challenge</h4>
      <p className="mt-0.5 text-xs text-muted-foreground">On-demand mixed exam practice</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {subjects.map((s) => (
          <span
            key={s}
            className="rounded-full border border-border bg-muted/60 px-2.5 py-1 text-[11px] font-medium"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-secondary" strokeWidth={2} />
          <span className="font-semibold text-foreground">35 min</span>
        </span>
        <span className="h-3 w-px bg-border" />
        <span className="inline-flex items-center gap-1.5">
          <Gauge className="h-3.5 w-3.5 text-secondary" strokeWidth={2} />
          <span className="font-semibold text-foreground">Mixed</span>
        </span>
      </div>

      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground transition-transform hover:-translate-y-0.5">
        Start Challenge
        <Play className="h-3.5 w-3.5 fill-current" />
      </button>
    </div>
  );
}

/* ---------------- Leaderboard Preview ---------------- */
function LeaderboardPreviewCard() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--warning)]/15">
            <Medal className="h-5 w-5 text-[var(--warning)]" strokeWidth={2} />
          </div>
          <div>
            <h4 className="text-base font-bold tracking-tight">Leaderboard</h4>
            <p className="text-xs text-muted-foreground">Your rank · #18</p>
          </div>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {topStudents.map((s) => (
          <li
            key={s.rank}
            className="flex items-center justify-between rounded-xl bg-muted/40 px-3 py-2"
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                  s.rank === 1
                    ? "bg-[var(--warning)] text-white"
                    : s.rank === 2
                      ? "bg-muted-foreground/30 text-foreground"
                      : "bg-primary/15 text-primary"
                }`}
              >
                {s.rank}
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] text-[10px] font-bold text-primary-foreground">
                {s.initials}
              </div>
              <span className="text-xs font-semibold">{s.name}</span>
            </div>
            <span className="text-[11px] font-bold text-muted-foreground">{s.xp} XP</span>
          </li>
        ))}
      </ul>

      <button className="mt-4 flex w-full items-center justify-center gap-2 text-xs font-semibold text-primary hover:underline">
        View Full Leaderboard
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/* ---------------- Recent Achievement ---------------- */
function RecentAchievementCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
          <Award className="h-5 w-5 text-primary" strokeWidth={2} />
        </div>
        <span className="rounded-full bg-[var(--success)]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--success)]">
          Unlocked
        </span>
      </div>

      <p className="mt-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        Recent Achievement
      </p>
      <h4 className="mt-1 text-base font-bold tracking-tight">Chapter Conqueror</h4>
      <p className="mt-1 text-xs text-muted-foreground">
        Completed 10 chapters across your subjects.
      </p>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-muted/40 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 fill-[var(--warning)] text-[var(--warning)]" />
          <span className="text-xs font-semibold">Reward</span>
        </div>
        <span className="text-sm font-extrabold text-primary">+250 XP</span>
      </div>
    </div>
  );
}

/* ---------------- Upcoming Goal ---------------- */
function UpcomingGoalCard() {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Upcoming Goal
          </p>
          <h3 className="mt-1 text-lg font-bold tracking-tight">Reach Level 28</h3>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground">
          <Crown className="h-5 w-5" strokeWidth={2} />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-2xl bg-muted/50 px-4 py-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Current Title
          </p>
          <p className="text-sm font-bold">Adept</p>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <div className="text-right">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Next Title
          </p>
          <p className="text-sm font-bold text-primary">Veteran</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="text-muted-foreground">Level 27 → 28</span>
          <span className="font-bold">420 XP left</span>
        </div>
        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-[image:var(--gradient-primary)] transition-all duration-700"
            style={{ width: "84%" }}
          />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Unlock the <span className="font-semibold text-foreground">Veteran</span> title and a
          bonus XP reward when you reach Level 28.
        </p>
      </div>
    </div>
  );
}
