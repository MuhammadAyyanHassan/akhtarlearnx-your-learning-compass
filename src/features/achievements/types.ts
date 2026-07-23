export type AchievementCategory =
  | "learning"
  | "quiz"
  | "accuracy"
  | "consistency"
  | "challenges";

export type AchievementStatus = "locked" | "unlocked" | "claimed";

export type AchievementProgress = {
  current: number;
  target: number;
};

export type Achievement = {
  id: string;
  category: AchievementCategory;
  title: string;
  description: string;
  xpReward: number;
  status: AchievementStatus;
  progress?: AchievementProgress;
};