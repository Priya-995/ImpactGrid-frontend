import { HandHeart, Activity, Users, Building2 } from "lucide-react";
import type { ImpactStat } from "@/types";
import { useAppData } from "@/context/AppContext";

export interface ImpactStatsProps {
  stats?: ImpactStat[];
}



const ImpactStats = ({ stats }: ImpactStatsProps) => {
  const { cases, volunteers } = useAppData();

  const totalPeople = cases.reduce(
    (sum, c) => sum + (Number(c.peopleAffected) || 0),
    0
  );

  const activeCases = cases.filter((c) => c.status !== "Resolved").length;

  const items =
    stats ?? [
      { icon: HandHeart, label: "People Impacted", value: totalPeople.toLocaleString(), trend: "Live" },
      { icon: Activity, label: "Active Cases", value: activeCases, trend: "Live" },
      { icon: Users, label: "Volunteers", value: volunteers.length.toLocaleString(), trend: "Live" },
      { icon: Building2, label: "NGOs Onboarded", value: "1", trend: "Pilot" },
    ];

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
