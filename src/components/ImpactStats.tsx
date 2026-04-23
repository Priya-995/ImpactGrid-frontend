import { HandHeart, Activity, Users, Building2 } from "lucide-react";
import type { ImpactStat } from "@/types";
import { stats as defaultStats } from "@/data/mockData";

export interface ImpactStatsProps {
  stats?: ImpactStat[];
}

const buildDefault = (): ImpactStat[] => [
  { icon: HandHeart, label: "People Helped", value: defaultStats.peopleHelped.toLocaleString(), trend: "+12%" },
  { icon: Activity, label: "Active Cases", value: defaultStats.activeCases, trend: "Live" },
  { icon: Users, label: "Volunteers", value: defaultStats.volunteers.toLocaleString(), trend: "+248" },
  { icon: Building2, label: "NGOs Onboarded", value: defaultStats.ngos, trend: "+5" },
];

const ImpactStats = ({ stats }: ImpactStatsProps) => {
  const items = stats ?? buildDefault();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elegant transition-smooth hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <s.icon className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
              {s.trend}
            </span>
          </div>
          <div className="mt-4 text-3xl font-bold tracking-tight">{s.value}</div>
          <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
};

export default ImpactStats;
