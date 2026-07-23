import { BookOpen, Target, Star, Flame, Sparkles } from "lucide-react";
import type { Achievement, AchievementCategory } from "../types";
import AchievementCard from "./AchievementCard";

const categoryMeta: Record<
  AchievementCategory,
  { icon: string; label: string }
> = {
  learning: { icon: "📚", label: "Learning" },
  quiz: { icon: "🎯", label: "Quiz" },
  accuracy: { icon: "⭐", label: "Accuracy" },
  consistency: { icon: "🔥", label: "Consistency" },
  challenges: { icon: "🎲", label: "Challenges" },
};

export default function AchievementCategorySection({
  category,
  achievements,
}: {
  category: AchievementCategory;
  achievements: Achievement[];
}) {
  if (achievements.length === 0) return null;

  const meta = categoryMeta[category];

  return (
    <section>
      <div className="flex items-center gap-2 pt-2">
        <span className="text-lg">{meta.icon}</span>
        <h2 className="text-lg font-semibold tracking-tight">{meta.label}</h2>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {achievements.map((a) => (
          <AchievementCard key={a.id} achievement={a} />
        ))}
      </div>
    </section>
  );
}
