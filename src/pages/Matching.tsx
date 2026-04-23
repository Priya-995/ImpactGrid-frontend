import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, MapPin, Users, Sparkles, Clock, Target, Crown, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import UrgencyBadge from "@/components/UrgencyBadge";
import { cases, volunteers, categoryIcons, categoryColors } from "@/data/mockData";
import { cn } from "@/lib/utils";

const computeMatch = (caseSkills: string[], caseLocation: string, v: typeof volunteers[number]) => {
  const skillOverlap = v.skills.filter(s => caseSkills.includes(s)).length;
  const skillScore = caseSkills.length ? Math.min(60, (skillOverlap / caseSkills.length) * 60) : 0;
  const sameCity = caseLocation.split(",")[0].trim() === v.location.split(",")[0].trim();
  const distScore = sameCity ? 25 : v.distanceKm < 20 ? 18 : v.distanceKm < 50 ? 10 : 4;
  const availScore = v.availability.length >= 2 ? 15 : 8;
  const total = Math.round(skillScore + distScore + availScore);
  return {
    score: Math.min(99, total),
    matchedSkills: v.skills.filter(s => caseSkills.includes(s)),
    nearby: v.distanceKm <= 20,
    available: v.availability.length >= 1,
  };
};

const ScoreRing = ({ score }: { score: number }) => {
  const r = 26;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const color = score >= 80 ? "hsl(var(--accent))" : score >= 60 ? "hsl(var(--primary))" : "hsl(var(--urgency-medium))";
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

const Matching = () => {
  const { id } = useParams();
  const caseData = cases.find(c => c.id === id) ?? cases[0];
  const Icon = categoryIcons[caseData.category];

  const matches = useMemo(() => {
    return volunteers
      .map(v => ({ v, m: computeMatch(caseData.skills, caseData.location, v) }))
      .sort((a, b) => b.m.score - a.m.score);
  }, [caseData]);

  const handleAssign = (name: string) => {
    toast.success(`${name} assigned to case ${caseData.id}`, {
      description: "They'll receive a notification with case details.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />

      <main className="flex-1 container py-10">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>

        {/* Case summary */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-soft mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 gradient-hero" />
          <div className="flex flex-col md:flex-row md:items-start gap-5">
            <div className={cn("h-14 w-14 rounded-2xl border flex items-center justify-center shrink-0", categoryColors[caseData.category])}>
              <Icon className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="font-mono font-semibold">{caseData.id}</span>
                <span>•</span>
                <span>{caseData.category}</span>
                <span>•</span>
                <span>Reported {caseData.reportedAt}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mt-1.5 leading-tight">{caseData.title}</h1>
              <p className="text-muted-foreground mt-2 max-w-3xl">{caseData.description}</p>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <UrgencyBadge level={caseData.urgency} />
                <span className="flex items-center gap-1.5 text-muted-foreground"><MapPin className="h-4 w-4" /> {caseData.location}</span>
                <span className="flex items-center gap-1.5 text-muted-foreground"><Users className="h-4 w-4" /> {caseData.peopleAffected} affected</span>
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Required Skills</p>
                <div className="flex flex-wrap gap-2">
                  {caseData.skills.map(s => (
                    <span key={s} className="rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Matches */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" /> Recommended Volunteers
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Sorted by match score · Top 3 highlighted</p>
          </div>
          <span className="text-sm text-muted-foreground">{matches.length} candidates</span>
        </div>

        <div className="space-y-3">
          {matches.map(({ v, m }, i) => {
            const isTop = i < 3;
            const initials = v.name.split(" ").map(p => p[0]).join("").slice(0, 2);
            return (
              <div
                key={v.id}
                className={cn(
                  "relative rounded-2xl bg-card p-5 shadow-soft hover:shadow-elegant transition-smooth",
                  isTop ? "border-2 border-transparent bg-clip-padding" : "border border-border",
                )}
                style={isTop ? { backgroundImage: "linear-gradient(hsl(var(--card)), hsl(var(--card))), var(--gradient-hero)", backgroundOrigin: "border-box", backgroundClip: "padding-box, border-box" } : {}}
              >
                {isTop && (
                  <div className="absolute -top-2.5 left-5 inline-flex items-center gap-1 rounded-full gradient-hero text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 shadow-soft">
                    <Crown className="h-3 w-3" /> Top Match #{i + 1}
                  </div>
                )}

                <div className="flex flex-col md:flex-row md:items-center gap-5">
                  {/* Avatar + score */}
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl gradient-hero flex items-center justify-center text-primary-foreground font-bold text-lg shadow-soft shrink-0">
                      {initials}
                    </div>
                    <ScoreRing score={m.score} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-base">{v.name}</h3>
                      <span className="text-xs text-muted-foreground font-mono">{v.id}</span>
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {v.location} · {v.distanceKm}km away</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {v.availability.join(", ")}</span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {v.skills.map(s => {
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
                  </div>

                  {/* Action */}
                  <div className="flex md:flex-col items-end gap-2 md:w-40 shrink-0">
                    <Button
                      onClick={() => handleAssign(v.name)}
                      className={cn(
                        "w-full",
                        isTop ? "gradient-hero text-primary-foreground border-0 shadow-soft" : ""
                      )}
                      variant={isTop ? "default" : "outline"}
                    >
                      Assign Volunteer
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full text-xs">View profile</Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Matching;
