export default function LeaderboardHeader({
  cohortLabel,
}: {
  cohortLabel: string;
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-soft)]">
      <h1 className="text-2xl font-bold tracking-tight">Leaderboard</h1>
      <p className="mt-1 text-xs text-muted-foreground">
        Ranked against {cohortLabel} students worldwide
      </p>
    </div>
  );
}
