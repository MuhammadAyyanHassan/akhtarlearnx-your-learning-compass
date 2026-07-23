import { useState } from "react";
import { Lock, Check, Award, BookOpen, Target, Star, Flame, Sparkles } from "lucide-react";
import type { Achievement } from "../types";

const categoryIcon: Record<string, typeof BookOpen> = {
  learning: BookOpen,
  quiz: Target,
  accuracy: Star,
  consistency: Flame,
  challenges: Sparkles,
};

export default function AchievementCard({ achievement }: { achievement: Achievement }) {
  const [claimed, setClaimed] = useState(false);
  const Icon = categoryIcon[achievement.category];
  const status = claimed ? "claimed" : achievement.status;

  if (status === "locked") {
    return (
      <div className="rounded-2xl border border-border/60 bg-card p-5 opacity-60">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted">
            <Icon className="h-5 w-5 text-muted-foreground" strokeWidth={2} />
          </div>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted-foreground/20">
            <Lock className="h-3 w-3 text-muted-foreground" strokeWidth={2.5} />
          </div>
        </div>

        <h4 className="mt-4 text-base font-bold tracking-tight text-foreground">
          {achievement.title}
        </h4>
        <p className="mt-1 text-xs text-muted-foreground">{achievement.description}</p>

        {achievement.progress && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground">
                {achievement.progress.current} / {achievement.progress.target}
              </span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary/40"
                style={{
                  width: `${(achievement.progress.current / achievement.progress.target) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  if (status === "unlocked") {
    return (
      <div className="rounded-2xl border border-[var(--success)]/30 bg-card p-5 shadow-[var(--shadow-glow)]">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="h-5 w-5 text-primary" strokeWidth={2} />
          </div>
          <span className="rounded-full bg-[var(--success)]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--success)]">
            Completed
          </span>
        </div>

        <h4 className="mt-4 text-base font-bold tracking-tight">{achievement.title}</h4>
        <p className="mt-1 text-xs text-muted-foreground">{achievement.description}</p>

        {/* Mock-only local state — does not call an API, does not persist across refresh, does not add XP to any global total. */}
        <button
          onClick={() => setClaimed(true)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <Award className="h-4 w-4" strokeWidth={2} />
          Claim +{achievement.xpReward} XP
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-5 w-5 text-primary" strokeWidth={2} />
        </div>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--success)]/15">
          <Check className="h-3.5 w-3.5 text-[var(--success)]" strokeWidth={3} />
        </div>
      </div>

      <h4 className="mt-4 text-base font-bold tracking-tight">{achievement.title}</h4>
      <p className="mt-1 text-xs text-muted-foreground">{achievement.description}</p>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-muted/40 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 fill-[var(--warning)] text-[var(--warning)]" />
          <span className="text-xs font-semibold">Reward</span>
        </div>
        <span className="text-sm font-extrabold text-primary">+{achievement.xpReward} XP Claimed</span>
      </div>
    </div>
  );
}
