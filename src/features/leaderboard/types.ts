export type RankingPeriod = "weekly" | "monthly" | "allTime";

export type EducationSystem = "matric";

export type AcademicLevel = "matric-9" | "matric-10";

export type Stream = "science-biology" | "science-computer-science" | null;

export type RpgTitle =
  | "Novice"
  | "Apprentice"
  | "Adept"
  | "Veteran"
  | "Elite"
  | "Champion"
  | "Hero"
  | "Legend"
  | "Mythic"
  | "Immortal";

export type CountryCode = string;

export type LeaderboardXp = {
  weekly: number;
  monthly: number;
  allTime: number;
};

export type LeaderboardEntry = {
  id: string;
  name: string;
  avatarInitials: string;
  countryCode: CountryCode;
  countryFlagEmoji: string;
  educationSystem: EducationSystem;
  academicLevel: AcademicLevel;
  stream: Stream;
  level: number;
  rpgTitle: RpgTitle;
  xp: LeaderboardXp;
};

export type LeaderboardCohort = {
  educationSystem: EducationSystem;
  academicLevel: AcademicLevel;
  stream: Stream;
};
