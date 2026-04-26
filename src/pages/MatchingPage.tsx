import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, MapPin, Sparkles, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MatchCard from "@/components/MatchCard";
import UrgencyBadge from "@/components/UrgencyBadge";
import { categoryIcons, categoryColors } from "@/data/mockData";
import { rankVolunteers } from "@/lib/matching";
import { cn } from "@/lib/utils";
import type { Volunteer } from "@/types";
import { useAppData } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";

const MatchingPage = () => {
  const { id } = useParams();
  const { cases, volunteers, assignVolunteerToCase } = useAppData();
  const navigate = useNavigate();
  const caseData = cases.find((c) => String(c.id) === String(id));

  if (!caseData) {
    return (
      <div className="min-h-screen flex flex-col bg-muted/30">
        <Navbar />
        <main className="flex-1 container py-10">
          <p className="text-lg font-semibold">Case not found.</p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mt-3"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = categoryIcons[caseData.category];
  const ranked = useMemo(() => rankVolunteers(caseData, volunteers), [caseData, volunteers]);

  const handleAssign = (v: Volunteer) => {
  assignVolunteerToCase(caseData.id, v.id);

    toast.success(`${v.name} assigned to case ${caseData.id}`, {
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
                  {caseData.skills.map((s) => (
                    <span key={s} className="rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" /> Recommended Volunteers
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Sorted by match score · Top 3 highlighted</p>
          </div>
          <span className="text-sm text-muted-foreground">{ranked.length} candidates</span>
        </div>

        <div className="space-y-4">
          {ranked.map(({ volunteer, match }, i) => (
            <MatchCard
              key={volunteer.id}
              volunteer={volunteer}
              match={match}
              rank={i + 1}
              isTop={i < 3}
              onAssign={handleAssign}
               onViewProfile={(v) => navigate(`/volunteer-profile/${v.id}`)}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MatchingPage;