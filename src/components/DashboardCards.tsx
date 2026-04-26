import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardSummary } from "@/types";

export interface DashboardCardsProps {
  cards: DashboardSummary[];
}

const DashboardCards = ({ cards }: DashboardCardsProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((s) => {
        const isLive = s.trend === "Live";

        return (
        <div
          key={s.label}
          className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elegant transition-smooth"
        >
          <div className="flex items-center justify-between">
            <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", s.color)}>
              <s.icon className="h-5 w-5" />
            </div>

            <span
              className={cn(
                "text-xs font-semibold inline-flex items-center gap-1 px-2 py-0.5 rounded-full",
                  isLive
                    ? "text-accent bg-accent/10"
                    : s.up
                    ? "text-accent bg-accent/10"
                    : "text-urgency-high bg-urgency-high-soft"
              )}
            >
                {!isLive && (s.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />)}
              {s.trend}
            </span>
          </div>

          <div className="mt-4 text-3xl font-bold tracking-tight">{s.value}</div>
          <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
        </div>
        );
      })}
    </div>
  );
};

export default DashboardCards;
