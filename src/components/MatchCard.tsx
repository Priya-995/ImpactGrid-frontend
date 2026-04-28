import { Clock, Crown, MapPin, Target, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MatchResult, Volunteer } from "@/types";
import { useState,useEffect } from "react";

export interface MatchCardProps {
  volunteer: Volunteer;
  match: MatchResult;
  rank: number;
  isTop?: boolean;
  onAssign?: (v: Volunteer) => void;
  onViewProfile?: (v: Volunteer) => void;
}

const ScoreRing = ({ score }: { score: number }) => {
  const r = 26;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const color =
    score >= 80 ? "hsl(var(--accent))" : score >= 60 ? "hsl(var(--primary))" : "hsl(var(--urgency-medium))";
  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={r} stroke="hsl(var(--muted))" strokeWidth="6" fill="none" />
        <circle
          cx="32" cy="32" r={r} stroke={color} strokeWidth="6" fill="none"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.7s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold">{score}%</span>
      </div>
    </div>
  );
};

const MatchCard = ({ volunteer: v, match: m, rank, isTop, onAssign, onViewProfile }: MatchCardProps) => {
  const initials = v.name.split(" ").map((p) => p[0]).join("").slice(0, 2);
  const [assigned, setAssigned] = useState(false); // ✅ ADD THIS
  const [aiReason, setAiReason] = useState("");
const [reasonLoading, setReasonLoading] = useState(false);

 useEffect(() => {
  const getReason = async () => {
    try {
      setReasonLoading(true);

      const res = await fetch("http://localhost:3000/api/gemini/match-reason", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          volunteer: v,
          match: m,
          caseData: {
            type: "Medical Emergency",
            urgency: "High",
            location: "Patna, Bihar",
            requiredSkills: m.matchedSkills,
          },
        }),
      });

      const data = await res.json();
      setAiReason(data.reason);
    } catch (err) {
      setAiReason("AI reason could not be generated right now.");
    } finally {
      setReasonLoading(false);
    }
  };

  getReason();
}, [v.id]);
  return (
    <div
      className={cn(
        "relative rounded-2xl bg-card p-5 shadow-soft hover:shadow-elegant transition-smooth",
        isTop ? "border-2 border-transparent bg-clip-padding" : "border border-border",
      )}
      style={
        isTop
          ? {
              backgroundImage: "linear-gradient(hsl(var(--card)), hsl(var(--card))), var(--gradient-hero)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }
          : {}
      }
    >
      {isTop && (
        <div className="absolute -top-2.5 left-5 inline-flex items-center gap-1 rounded-full gradient-hero text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 shadow-soft">
          <Crown className="h-3 w-3" /> Top Match #{rank}
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center gap-5">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl gradient-hero flex items-center justify-center text-primary-foreground font-bold text-lg shadow-soft shrink-0">
            {initials}
          </div>
          <ScoreRing score={m.score} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-base">{v.name}</h3>
            <span className="text-xs text-muted-foreground font-mono">{v.id}</span>
          </div>
          <div className="mt-1 text-sm text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {v.location} · {v.distanceKm}km away
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {v.availability.join(", ")}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {v.skills.map((s) => {
              const matched = m.matchedSkills.includes(s);
              return (
                <span
                  key={s}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full text-[11px] font-semibold px-2.5 py-0.5 border",
                    matched
                      ? "bg-accent/10 text-accent border-accent/20"
                      : "bg-muted text-muted-foreground border-transparent",
                  )}
                >
                  {matched && <CheckCircle2 className="h-3 w-3" />}
                  {s}
                </span>
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {m.nearby && (
              <span className="inline-flex items-center gap-1 rounded-md bg-sky-50 text-sky-700 text-[11px] font-semibold px-2 py-0.5 border border-sky-200">
                <MapPin className="h-3 w-3" /> Nearby location
              </span>
            )}
            {m.matchedSkills.length > 0 && (
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 border border-emerald-200">
                <Target className="h-3 w-3" /> {m.matchedSkills.length} matching skill{m.matchedSkills.length > 1 ? "s" : ""}
              </span>
            )}
            {m.available && (
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 text-amber-700 text-[11px] font-semibold px-2 py-0.5 border border-amber-200">
                <Clock className="h-3 w-3" /> Available now
              </span>
            )}
          </div>
          {/* WHY THIS VOLUNTEER (WOW FEATURE) */}
<div className="mt-4 rounded-xl border border-border bg-muted/40 p-3">
  <p className="text-xs font-bold text-foreground mb-2">
    Why this volunteer? 
    <span className="ml-1 text-[10px] text-primary">(Gemini AI)</span>
  </p>

  <div className="space-y-1.5 text-xs text-muted-foreground whitespace-pre-line">
    {reasonLoading ? "Generating AI reason..." : aiReason}
  </div>
</div>
        </div>

        <div className="flex md:flex-col items-end gap-2 md:w-40 shrink-0">
          <Button
            onClick={() => {
              onAssign?.(v);
              setAssigned(true);
            }}
            disabled={assigned}
            className={cn(
              "w-full",
              assigned
                ? "bg-green-600 text-white border-0"
                : isTop
                  ? "gradient-hero text-primary-foreground border-0 shadow-soft"
                  : ""
            )}
            variant={assigned ? "default" : isTop ? "default" : "outline"}
          >
            {assigned ? "Assigned ✓" : "Assign Volunteer"}
          </Button>
          {assigned && (
            <span className="text-[11px] text-green-600 font-semibold">
              Volunteer assigned successfully
            </span>
          )}
          <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => onViewProfile?.(v)}>
            View profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
