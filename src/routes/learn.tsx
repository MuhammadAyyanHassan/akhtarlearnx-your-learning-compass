import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
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
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Clock,
  Gauge,
  LogOut,
  Crown,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Lightbulb,
  Zap,
  Home,
} from "lucide-react";

export const Route = createFileRoute("/learn")({
  component: LearnPage,
  head: () => ({
    meta: [
      { title: "Quadratic Equations — Continue Learning | AkhtarLearnX" },
      {
        name: "description",
        content:
          "Practice quadratic equations one MCQ at a time. Earn XP, keep your streak, and climb toward the Veteran title.",
      },
      { property: "og:title", content: "Continue Learning — AkhtarLearnX" },
      {
        property: "og:description",
        content: "Interactive matric MCQ practice with instant feedback and XP rewards.",
      },
    ],
  }),
});

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/" as const, active: false },
  { icon: BookOpen, label: "Subjects", to: "/learn" as const, active: true },
  { icon: Trophy, label: "Achievements", to: "/" as const, active: false },
  { icon: Medal, label: "Leaderboard", to: "/" as const, active: false },
  { icon: User, label: "Profile", to: "/" as const, active: false },
];

const question = {
  prompt: "If x² − 5x + 6 = 0, what are the values of x?",
  options: ["2 and 3", "1 and 6", "5 and 6", "3 and 4"],
  correctIndex: 0,
  explanation:
    "The quadratic factors into (x − 2)(x − 3) = 0. Therefore x = 2 and x = 3.",
};

type Status = "idle" | "correct" | "incorrect";

function LearnPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const submit = () => {
    if (selected === null || status !== "idle") return;
    setStatus(selected === question.correctIndex ? "correct" : "incorrect");
  };

  const reset = () => {
    setSelected(null);
    setStatus("idle");
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <Sidebar />

      <main className="ml-[240px] p-8">
        <TopBar />

        <Breadcrumb />

        <div className="mt-6 grid grid-cols-12 gap-6">
          <section className="col-span-12 xl:col-span-8 space-y-6">
            <LessonMetaCard />
            <QuestionCard
              selected={selected}
              setSelected={setSelected}
              status={status}
            />
            <ActionsRow
              status={status}
              canSubmit={selected !== null}
              onSubmit={submit}
              onNext={reset}
            />
          </section>

          <aside className="col-span-12 xl:col-span-4 space-y-6">
            <PlayerCard />
            <ProgressCard />
            <TipCard />
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
          <Link
            key={item.label}
            to={item.to}
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
          </Link>
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
          Continue Learning
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">
          Quadratic Equations
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

/* ---------------- Breadcrumb ---------------- */
function Breadcrumb() {
  return (
    <nav className="mt-6 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
      <Link to="/" className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 shadow-[var(--shadow-soft)] transition-colors hover:text-primary">
        <Home className="h-3 w-3" />
        Dashboard
      </Link>
      <ChevronRight className="h-3 w-3" />
      <span className="rounded-full bg-card px-3 py-1.5 shadow-[var(--shadow-soft)]">Mathematics</span>
      <ChevronRight className="h-3 w-3" />
      <span className="rounded-full bg-primary/10 px-3 py-1.5 font-semibold text-primary">
        Quadratic Equations
      </span>
    </nav>
  );
}

/* ---------------- Lesson Meta ---------------- */
function LessonMetaCard() {
  const meta = [
    { label: "Subject", value: "Mathematics" },
    { label: "Chapter", value: "Quadratic Eq." },
    { label: "Lesson", value: "3 of 5" },
    { label: "Question", value: "8 of 20" },
    { label: "Difficulty", value: "Medium", icon: Gauge },
    { label: "Time Left", value: "12 min", icon: Clock },
    { label: "XP Reward", value: "+10 XP", icon: Zap, tone: "text-[var(--warning)]" },
  ];
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-[var(--shadow-soft)]">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-7">
        {meta.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label}>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {m.label}
              </p>
              <p
                className={`mt-1.5 inline-flex items-center gap-1.5 text-sm font-bold tracking-tight ${
                  m.tone ?? "text-foreground"
                }`}
              >
                {Icon ? <Icon className="h-3.5 w-3.5" strokeWidth={2} /> : null}
                {m.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Question ---------------- */
function QuestionCard({
  selected,
  setSelected,
  status,
}: {
  selected: number | null;
  setSelected: (i: number) => void;
  status: Status;
}) {
  const feedback = useMemo(() => {
    if (status === "correct") return <CorrectBanner />;
    if (status === "incorrect") return <IncorrectBanner />;
    return null;
  }, [status]);

  const locked = status !== "idle";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-10 shadow-[var(--shadow-soft)]">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />

      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
          <Sparkles className="h-3 w-3" />
          Question 8 · Medium
        </span>
        <span className="text-xs font-medium text-muted-foreground">MCQ · Single answer</span>
      </div>

      <h2 className="mt-6 text-center text-3xl font-extrabold leading-snug tracking-tight">
        If <span className="text-primary">x² − 5x + 6 = 0</span>,<br />
        what are the values of x?
      </h2>

      <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-3 md:grid-cols-2">
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrectAnswer = i === question.correctIndex;
          const showCorrect = locked && isCorrectAnswer;
          const showWrong = status === "incorrect" && isSelected;

          const base =
            "group flex items-center gap-3 rounded-2xl border p-4 text-left text-sm font-semibold transition-all";
          let tone =
            "border-border bg-card hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-soft)]";
          if (isSelected && !locked)
            tone = "border-primary bg-primary/5 shadow-[var(--shadow-soft)]";
          if (showCorrect)
            tone = "border-[var(--success)] bg-[var(--success)]/10";
          if (showWrong) tone = "border-destructive bg-destructive/10";

          return (
            <button
              key={opt}
              disabled={locked}
              onClick={() => setSelected(i)}
              className={`${base} ${tone} ${locked ? "cursor-default" : "cursor-pointer"}`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors ${
                  showCorrect
                    ? "border-[var(--success)] bg-[var(--success)] text-white"
                    : showWrong
                    ? "border-destructive bg-destructive text-white"
                    : isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-muted text-muted-foreground group-hover:border-primary/40"
                }`}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt}</span>
              {showCorrect ? (
                <CheckCircle2 className="h-5 w-5 text-[var(--success)]" strokeWidth={2.25} />
              ) : showWrong ? (
                <XCircle className="h-5 w-5 text-destructive" strokeWidth={2.25} />
              ) : null}
            </button>
          );
        })}
      </div>

      {feedback ? <div className="mx-auto mt-8 max-w-2xl">{feedback}</div> : null}
    </div>
  );
}

/* ---------------- Feedback banners ---------------- */
function CorrectBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--success)]/30 bg-[var(--success)]/10 p-6 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--success)] text-white shadow-[var(--shadow-glow)] animate-in zoom-in-50 duration-500">
        <CheckCircle2 className="h-8 w-8" strokeWidth={2.5} />
      </div>
      <h3 className="mt-3 text-xl font-extrabold tracking-tight text-[var(--success)]">
        Correct!
      </h3>
      <p className="mt-1 text-sm text-foreground/80">Excellent work — keep going!</p>
      <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--success)] px-3 py-1 text-xs font-bold text-white shadow-[var(--shadow-soft)]">
        <Zap className="h-3.5 w-3.5" strokeWidth={2.5} />
        +10 XP
      </span>
    </div>
  );
}

function IncorrectBanner() {
  return (
    <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/15 text-destructive">
          <XCircle className="h-5 w-5" strokeWidth={2.25} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-destructive">Incorrect.</p>
          <p className="text-xs text-muted-foreground">
            Correct answer: <span className="font-semibold text-foreground">2 and 3</span>
          </p>
        </div>
        <span className="rounded-full bg-destructive px-3 py-1 text-xs font-bold text-white">
          −5 XP
        </span>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-card p-4">
        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          <Lightbulb className="h-3.5 w-3.5 text-[var(--warning)]" />
          Explanation
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/90">
          The quadratic factors into{" "}
          <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs font-semibold">
            (x − 2)(x − 3) = 0
          </span>
          . Therefore <span className="font-semibold">x = 2</span> and{" "}
          <span className="font-semibold">x = 3</span>.
        </p>
      </div>
    </div>
  );
}

/* ---------------- Bottom Actions ---------------- */
function ActionsRow({
  status,
  canSubmit,
  onSubmit,
  onNext,
}: {
  status: Status;
  canSubmit: boolean;
  onSubmit: () => void;
  onNext: () => void;
}) {
  const locked = status !== "idle";
  return (
    <div className="flex items-center justify-between rounded-3xl border border-border/60 bg-card p-4 shadow-[var(--shadow-soft)]">
      <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent">
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>

      {!locked ? (
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          Submit Answer
          <ArrowRight className="h-4 w-4" />
        </button>
      ) : (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest ${
            status === "correct"
              ? "bg-[var(--success)]/15 text-[var(--success)]"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          {status === "correct" ? "Answer accepted" : "Try to remember this"}
        </span>
      )}

      <button
        onClick={onNext}
        className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
      >
        Next Question
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ---------------- Right Sidebar Cards ---------------- */
function PlayerCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-primary)] p-6 text-primary-foreground shadow-[var(--shadow-glow)]">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
          <Crown className="h-6 w-6" strokeWidth={2} />
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
            Current Title
          </p>
          <p className="text-lg font-extrabold tracking-tight">Adept</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
            Level
          </p>
          <p className="mt-1 text-2xl font-extrabold tracking-tight">27</p>
        </div>
        <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
            Total XP
          </p>
          <p className="mt-1 text-2xl font-extrabold tracking-tight">14,580</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-2xl bg-white/10 p-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-[var(--warning)]" strokeWidth={2.25} />
          <span className="text-xs font-semibold text-white/80">Current Streak</span>
        </div>
        <span className="text-sm font-extrabold">12 Days</span>
      </div>
    </div>
  );
}

function ProgressCard() {
  const done = 8;
  const total = 20;
  const pct = (done / total) * 100;
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Lesson Progress
          </p>
          <h3 className="mt-1 text-base font-bold tracking-tight">Question {done} / {total}</h3>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {Math.round(pct)}%
        </span>
      </div>

      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-[image:var(--gradient-primary)] transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-4 grid grid-cols-10 gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full ${
              i < done - 1
                ? "bg-primary"
                : i === done - 1
                ? "bg-primary/60 ring-2 ring-primary/30"
                : "bg-muted"
            }`}
          />
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs">
        <span className="text-muted-foreground">Est. time remaining</span>
        <span className="inline-flex items-center gap-1.5 font-bold">
          <Clock className="h-3.5 w-3.5 text-primary" strokeWidth={2.25} />
          12 minutes
        </span>
      </div>
    </div>
  );
}

function TipCard() {
  return (
    <div className="rounded-3xl border border-border/60 bg-[image:var(--gradient-hero)] p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--warning)]/15 text-[var(--warning)]">
          <Lightbulb className="h-5 w-5" strokeWidth={2.25} />
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Study Tip
          </p>
          <h4 className="mt-1 text-sm font-bold tracking-tight">Factor first, then solve</h4>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            For a quadratic ax² + bx + c, look for two numbers that multiply to c and add to b.
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-2xl bg-card p-3 text-xs shadow-[var(--shadow-soft)]">
        <Star className="h-4 w-4 text-[var(--warning)]" strokeWidth={2.25} />
        <span className="font-semibold">Answer 3 more correctly to earn +50 bonus XP</span>
      </div>
    </div>
  );
}
