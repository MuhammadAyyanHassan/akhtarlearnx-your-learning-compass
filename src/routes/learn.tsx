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
  Flame,
  Star,
  Clock,
  Zap,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Crown,
  Sparkles,
  LogOut,
  ArrowRight,
  SkipForward,
} from "lucide-react";

export const Route = createFileRoute("/learn")({
  component: LearnPage,
  head: () => ({
    meta: [
      { title: "Quadratic Equations — AkhtarLearnX" },
      {
        name: "description",
        content:
          "Continue learning Mathematics: Quadratic Equations. Answer MCQs, earn XP and keep your streak on AkhtarLearnX.",
      },
      { property: "og:title", content: "Continue Learning — AkhtarLearnX" },
      {
        property: "og:description",
        content: "Interactive matric MCQ practice with XP and streaks.",
      },
    ],
  }),
});

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/" as const, match: "/" },
  { icon: BookOpen, label: "Subjects", to: "/learn" as const, match: "/learn" },
  { icon: Trophy, label: "Achievements", to: "/" as const, match: "/achievements" },
  { icon: Medal, label: "Leaderboard", to: "/" as const, match: "/leaderboard" },
  { icon: User, label: "Profile", to: "/" as const, match: "/profile" },
];

const options = [
  { id: "a", label: "2 and 3", correct: true },
  { id: "b", label: "1 and 6", correct: false },
  { id: "c", label: "5 and 6", correct: false },
  { id: "d", label: "3 and 4", correct: false },
];

type Status = "idle" | "correct" | "incorrect";

function LearnPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const isSubmitted = status !== "idle";
  const correctId = options.find((o) => o.correct)!.id;

  const submit = () => {
    if (!selected) return;
    const isCorrect = options.find((o) => o.id === selected)?.correct;
    setStatus(isCorrect ? "correct" : "incorrect");
  };

  const next = () => {
    setSelected(null);
    setStatus("idle");
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <Sidebar />

      <main className="ml-[240px] p-8">
        <TopBar />

        <div className="mt-6 grid grid-cols-12 gap-6">
          {/* MAIN COLUMN */}
          <section className="col-span-12 xl:col-span-8 space-y-6">
            <Breadcrumb />
            <MetaStrip />
            <QuestionCard
              selected={selected}
              setSelected={setSelected}
              status={status}
              correctId={correctId}
            />
            {status === "correct" && <CorrectFeedback />}
            {status === "incorrect" && <IncorrectFeedback correctLabel="2 and 3" />}

            <ActionBar
              isSubmitted={isSubmitted}
              canSubmit={selected !== null}
              onSubmit={submit}
              onNext={next}
            />
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="col-span-12 xl:col-span-4 space-y-6">
            <PlayerCard />
            <SessionProgressCard current={8} total={20} />
            <StreakCard />
          </aside>
        </div>
      </main>
    </div>
  );
}

/* ---------------- Sidebar ---------------- */
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

/* ---------------- Top Bar ---------------- */
function TopBar() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Learning Session
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Continue Learning</h1>
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

/* ---------------- Breadcrumb ---------------- */
function Breadcrumb() {
  return (
    <nav className="flex items-center gap-2 text-xs font-medium">
      <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
        Dashboard
      </Link>
      <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
      <span className="text-muted-foreground">Mathematics</span>
      <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
      <span className="font-semibold text-foreground">Quadratic Equations</span>
    </nav>
  );
}

/* ---------------- Meta strip ---------------- */
function MetaStrip() {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground">
            <BookOpen className="h-5 w-5" strokeWidth={2} />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Mathematics · Chapter 4
            </p>
            <h2 className="text-lg font-bold tracking-tight">Quadratic Equations</h2>
            <p className="text-xs text-muted-foreground">Lesson 3 of 5 · Question 8 of 20</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MetaChip icon={Zap} label="Medium" tone="warning" />
          <MetaChip icon={Clock} label="12 min left" tone="muted" />
          <MetaChip icon={Star} label="+10 XP" tone="primary" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span className="text-[11px] font-semibold text-muted-foreground">Lesson progress</span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-[image:var(--gradient-primary)] transition-all duration-700"
            style={{ width: "40%" }}
          />
        </div>
        <span className="text-[11px] font-bold">40%</span>
      </div>
    </div>
  );
}

function MetaChip({
  icon: Icon,
  label,
  tone,
}: {
  icon: typeof Zap;
  label: string;
  tone: "warning" | "muted" | "primary";
}) {
  const styles = {
    warning: "bg-[var(--warning)]/15 text-[var(--warning)]",
    muted: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
  }[tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold ${styles}`}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
      {label}
    </span>
  );
}

/* ---------------- Question card ---------------- */
function QuestionCard({
  selected,
  setSelected,
  status,
  correctId,
}: {
  selected: string | null;
  setSelected: (id: string) => void;
  status: Status;
  correctId: string;
}) {
  const submitted = status !== "idle";
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
          Question 8 of 20
        </span>
        <span className="text-[11px] font-medium text-muted-foreground">Single answer · MCQ</span>
      </div>

      <h3 className="mt-5 text-2xl font-extrabold leading-snug tracking-tight">
        If <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xl">x² − 5x + 6 = 0</span>
        , what are the values of x?
      </h3>

      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        {options.map((opt, idx) => {
          const isSelected = selected === opt.id;
          const isCorrectOption = opt.id === correctId;
          const showCorrect = submitted && isCorrectOption;
          const showIncorrect = submitted && isSelected && !isCorrectOption;

          let cls =
            "border-border/60 bg-card hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5";
          if (!submitted && isSelected) {
            cls = "border-primary bg-primary/5 shadow-[var(--shadow-glow)]";
          } else if (showCorrect) {
            cls = "border-[var(--success)] bg-[var(--success)]/10";
          } else if (showIncorrect) {
            cls = "border-destructive bg-destructive/10";
          } else if (submitted) {
            cls = "border-border/40 bg-card opacity-60";
          }

          return (
            <button
              key={opt.id}
              disabled={submitted}
              onClick={() => setSelected(opt.id)}
              className={`group flex items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all disabled:cursor-not-allowed ${cls}`}
            >
              <span
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border-2 text-xs font-bold transition-colors ${
                  showCorrect
                    ? "border-[var(--success)] bg-[var(--success)] text-white"
                    : showIncorrect
                      ? "border-destructive bg-destructive text-white"
                      : isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-muted text-muted-foreground group-hover:border-primary/40"
                }`}
              >
                {showCorrect ? (
                  <Check className="h-4 w-4" strokeWidth={3} />
                ) : showIncorrect ? (
                  <X className="h-4 w-4" strokeWidth={3} />
                ) : (
                  String.fromCharCode(65 + idx)
                )}
              </span>
              <span className="text-base font-semibold">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Feedback: Correct ---------------- */
function CorrectFeedback() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[var(--success)]/30 bg-[var(--success)]/10 p-6 shadow-[var(--shadow-soft)]">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--success)]/20 blur-3xl" />
      <div className="flex items-center gap-4">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--success)] text-white shadow-[var(--shadow-glow)]">
          <Check className="h-7 w-7" strokeWidth={3} />
          <span className="absolute inset-0 animate-ping rounded-2xl bg-[var(--success)] opacity-40" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-xl font-extrabold text-[var(--success)]">Correct!</h4>
            <Sparkles className="h-4 w-4 text-[var(--warning)]" />
          </div>
          <p className="text-sm text-muted-foreground">Excellent work! Keep going.</p>
        </div>
        <div className="rounded-2xl bg-card px-4 py-3 text-right shadow-[var(--shadow-soft)]">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Earned
          </p>
          <p className="text-xl font-extrabold text-[var(--success)]">+10 XP</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Feedback: Incorrect ---------------- */
function IncorrectFeedback({ correctLabel }: { correctLabel: string }) {
  return (
    <div className="rounded-3xl border border-destructive/30 bg-destructive/5 p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-destructive text-destructive-foreground shadow-[var(--shadow-soft)]">
          <X className="h-7 w-7" strokeWidth={3} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-extrabold text-destructive">Incorrect</h4>
            <span className="rounded-full bg-destructive/15 px-3 py-1 text-xs font-bold text-destructive">
              −5 XP
            </span>
          </div>

          <div className="mt-3 rounded-2xl bg-card p-4 shadow-[var(--shadow-soft)]">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Correct Answer
            </p>
            <p className="mt-1 text-base font-bold text-[var(--success)]">{correctLabel}</p>

            <div className="mt-4 border-t border-border/60 pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Explanation
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                The quadratic factors into{" "}
                <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono">(x − 2)(x − 3) = 0</span>
                . Setting each factor to zero gives{" "}
                <span className="font-semibold">x = 2</span> and{" "}
                <span className="font-semibold">x = 3</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Action bar ---------------- */
function ActionBar({
  isSubmitted,
  canSubmit,
  onSubmit,
  onNext,
  onSkip,
}: {
  isSubmitted: boolean;
  canSubmit: boolean;
  onSubmit: () => void;
  onNext: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-border/60 bg-card p-4 shadow-[var(--shadow-soft)]">
      <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent">
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>

      {isSubmitted ? (
        <p className="text-xs font-medium text-muted-foreground">
          Review the answer, then continue to the next question.
        </p>
      ) : (
        <button
          onClick={onSkip}
          className="inline-flex items-center gap-2 rounded-full bg-destructive px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          <SkipForward className="h-4 w-4" />
          Skip Question
        </button>
      )}

      {!isSubmitted ? (
        <button
          disabled={!canSubmit}
          onClick={onSubmit}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:translate-y-0"
        >
          Submit Answer
          <ArrowRight className="h-4 w-4" />
        </button>
      ) : (
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
        >
          Next Question
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

/* ---------------- Right sidebar cards ---------------- */
function PlayerCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-primary)] p-6 text-primary-foreground shadow-[var(--shadow-glow)]">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest backdrop-blur">
          Your Progress
        </span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur">
          <Crown className="h-4 w-4" strokeWidth={2} />
        </div>
      </div>

      <div className="mt-6 flex items-end gap-3">
        <p className="text-6xl font-extrabold leading-none tracking-tight">27</p>
        <div className="pb-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">Level</p>
          <p className="text-sm font-bold">Adept</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
            Total XP
          </p>
          <p className="mt-0.5 text-lg font-extrabold">14,580</p>
        </div>
        <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
            To Next
          </p>
          <p className="mt-0.5 text-lg font-extrabold">420 XP</p>
        </div>
      </div>
    </div>
  );
}

function SessionProgressCard({ current, total }: { current: number; total: number }) {
  const pct = (current / total) * 100;
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Session
          </p>
          <h3 className="mt-1 text-base font-bold tracking-tight">Question Progress</h3>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {current} / {total}
        </span>
      </div>

      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-[image:var(--gradient-primary)] transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-5 flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < current - 1
                ? "bg-[var(--success)]"
                : i === current - 1
                  ? "bg-primary"
                  : "bg-muted"
            }`}
          />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-muted/50 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Correct
          </p>
          <p className="mt-0.5 text-lg font-extrabold text-[var(--success)]">6</p>
        </div>
        <div className="rounded-2xl bg-muted/50 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Missed
          </p>
          <p className="mt-0.5 text-lg font-extrabold text-destructive">1</p>
        </div>
      </div>
    </div>
  );
}

function StreakCard() {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10">
          <Flame className="h-5 w-5 text-destructive" strokeWidth={2} />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Current Streak
          </p>
          <p className="text-lg font-extrabold tracking-tight">12 Days</p>
        </div>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Answer at least one question today to keep your streak alive.
      </p>
    </div>
  );
}
