import { Trophy, Star } from "lucide-react";
import { achievements } from "../data/achievements";
import { unlockedCount, xpEarned, collectionPercent } from "../utils/achievementStats";

const unlocked = unlockedCount(achievements);
const earned = xpEarned(achievements);
const total = achievements.length;
const pct = collectionPercent(achievements);

export default function AchievementsHeader() {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-soft)]">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Achievements</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Complete lessons, quizzes and challenges to earn achievements and XP.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={Trophy}
          label="Unlocked"
          value={`${unlocked} / ${total}`}
          unit="Achievements"
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
        <StatCard
          icon={Star}
          label="Achievement XP"
          value={earned.toLocaleString()}
          unit="XP Earned"
          iconBg="bg-[var(--warning)]/10"
          iconColor="text-[var(--warning)]"
        />
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="text-muted-foreground">Collection</span>
          <span className="font-bold text-foreground">{pct}%</span>
        </div>
        <div
          className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={unlocked}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`${unlocked} of ${total} achievements unlocked`}
        >
          <div
            className="h-full rounded-full bg-[image:var(--gradient-primary)] transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  iconBg,
  iconColor,
}: {
  icon: typeof Trophy;
  label: string;
  value: string;
  unit: string;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-[var(--shadow-soft)]">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
        <Icon className={`h-5 w-5 ${iconColor}`} strokeWidth={2} />
      </div>
      <p className="mt-3 text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 flex items-baseline gap-1.5">
        <span className="text-2xl font-extrabold tracking-tight">{value}</span>
        <span className="text-xs font-medium text-muted-foreground">{unit}</span>
      </p>
    </div>
  );
}
