import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  Medal,
  User,
  LogOut,
} from "lucide-react";

const navItems: {
  icon: typeof LayoutDashboard | typeof BookOpen | typeof Trophy | typeof Medal | typeof User;
  label: string;
  to: string;
  match: string;
}[] = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/", match: "/" },
  { icon: BookOpen, label: "Subjects", to: "/learn", match: "/learn" },
  { icon: Trophy, label: "Achievements", to: "/achievements", match: "/achievements" },
  { icon: Medal, label: "Leaderboard", to: "/leaderboard", match: "/leaderboard" },
  { icon: User, label: "Profile", to: "/", match: "/profile" },
];

export function AppSidebar() {
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
