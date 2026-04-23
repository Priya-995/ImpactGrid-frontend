import { cn } from "@/lib/utils";

export type Urgency = "High" | "Medium" | "Low";

const styles: Record<Urgency, string> = {
  High: "bg-urgency-high-soft text-urgency-high border-urgency-high/20",
  Medium: "bg-urgency-medium-soft text-urgency-medium border-urgency-medium/20",
  Low: "bg-urgency-low-soft text-urgency-low border-urgency-low/20",
};

const dots: Record<Urgency, string> = {
  High: "bg-urgency-high",
  Medium: "bg-urgency-medium",
  Low: "bg-urgency-low",
};

const UrgencyBadge = ({ level, className }: { level: Urgency; className?: string }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        styles[level],
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse", dots[level])} />
      {level}
    </span>
  );
};

export default UrgencyBadge;
