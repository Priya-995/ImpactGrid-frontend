import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { MapPin, Send, X, Lightbulb, Clock, ShieldCheck, Plus, Utensils, Stethoscope, GraduationCap, Home as HomeIcon, LifeBuoy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { Category } from "@/data/mockData";

const categories: { value: Category; icon: any; color: string }[] = [
  { value: "Food", icon: Utensils, color: "text-amber-600 bg-amber-50 border-amber-200" },
  { value: "Medical", icon: Stethoscope, color: "text-rose-600 bg-rose-50 border-rose-200" },
  { value: "Education", icon: GraduationCap, color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
  { value: "Shelter", icon: HomeIcon, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  { value: "Rescue", icon: LifeBuoy, color: "text-sky-600 bg-sky-50 border-sky-200" },
];

const urgencies = [
  { value: "Low", color: "border-urgency-low text-urgency-low bg-urgency-low-soft" },
  { value: "Medium", color: "border-urgency-medium text-urgency-medium bg-urgency-medium-soft" },
  { value: "High", color: "border-urgency-high text-urgency-high bg-urgency-high-soft" },
] as const;

const ReportNeed = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category>("Food");
  const [urgency, setUrgency] = useState<"Low" | "Medium" | "High">("Medium");
  const [skills, setSkills] = useState<string[]>(["Logistics"]);
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    const v = skillInput.trim();
    if (v && !skills.includes(v)) setSkills([...skills, v]);
    setSkillInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Need reported successfully", {
      description: "An NGO coordinator will review and start matching volunteers shortly.",
    });
    setTimeout(() => navigate("/dashboard"), 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />

      <main className="flex-1 container py-10 md:py-14">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">← Back to Dashboard</Link>
            <h1 className="text-3xl md:text-4xl font-bold mt-3">Report a community need</h1>
            <p className="text-muted-foreground mt-2">Share the details — we'll help match volunteers and resources fast.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 rounded-2xl bg-card border border-border shadow-soft">
              <div className="p-6 md:p-8 space-y-7">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-semibold">Issue Title</Label>
                  <Input id="title" required placeholder="e.g. Emergency food supplies for flood-affected families" className="h-11" />
                </div>

                {/* Category */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Category</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {categories.map((c) => {
                      const active = category === c.value;
                      return (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => setCategory(c.value)}
                          className={cn(
                            "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-smooth",
                            active ? c.color + " shadow-soft" : "border-border hover:border-primary/40 bg-background"
                          )}
                        >
                          <c.icon className="h-5 w-5" />
                          <span className="text-xs font-semibold">{c.value}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="desc" className="text-sm font-semibold">Description</Label>
                  <Textarea id="desc" required placeholder="Describe the situation, what's needed, and any context that will help volunteers respond effectively." rows={5} />
                </div>

                {/* Location & people */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="loc" className="text-sm font-semibold">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="loc" required placeholder="City, State" className="pl-9 h-11" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="people" className="text-sm font-semibold">People Affected</Label>
                    <Input id="people" type="number" min={1} required placeholder="0" className="h-11" />
                  </div>
                </div>

                {/* Urgency */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Urgency Level</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {urgencies.map((u) => {
                      const active = urgency === u.value;
                      return (
                        <button
                          key={u.value}
                          type="button"
                          onClick={() => setUrgency(u.value)}
                          className={cn(
                            "py-3 rounded-xl border-2 font-semibold text-sm transition-smooth",
                            active ? u.color : "border-border bg-background text-muted-foreground hover:border-primary/40"
                          )}
                        >
                          <span className={cn("inline-block h-2 w-2 rounded-full mr-2", active ? "" : "bg-muted-foreground")} style={active ? { background: "currentColor" } : {}} />
                          {u.value}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Required Skills / Resources</Label>
                  <div className="flex gap-2">
                    <Input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
                      placeholder="e.g. First Aid, Driving, Logistics"
                      className="h-11"
                    />
                    <Button type="button" onClick={addSkill} variant="outline" className="h-11">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s) => (
                      <span key={s} className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5">
                        {s}
                        <button type="button" onClick={() => setSkills(skills.filter(k => k !== s))} className="hover:bg-primary/20 rounded-full">
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                    {skills.length === 0 && <span className="text-xs text-muted-foreground">No skills added yet.</span>}
                  </div>
                </div>
              </div>

              <div className="border-t border-border p-5 md:p-6 flex items-center justify-between gap-3 bg-muted/30 rounded-b-2xl sticky bottom-0">
                <p className="text-xs text-muted-foreground hidden sm:block">By submitting, you confirm this report is accurate.</p>
                <Button type="submit" size="lg" className="gradient-hero text-primary-foreground border-0 shadow-soft h-11 px-6 ml-auto">
                  <Send className="h-4 w-4" /> Submit Report
                </Button>
              </div>
            </form>

            {/* Helper */}
            <aside className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="font-semibold flex items-center gap-2"><Lightbulb className="h-4 w-4 text-accent" /> What happens next?</h3>
                <ol className="mt-4 space-y-4 text-sm">
                  {[
                    { icon: ShieldCheck, title: "Verification", text: "An NGO coordinator reviews your report within minutes." },
                    { icon: Clock, title: "Prioritization", text: "We rank cases by urgency and people affected." },
                    { icon: Send, title: "Matching", text: "Volunteers with matching skills nearby get notified instantly." },
                  ].map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <s.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold">{s.title}</p>
                        <p className="text-muted-foreground text-xs mt-0.5">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-2xl gradient-hero p-6 text-primary-foreground shadow-elegant">
                <p className="text-2xl font-bold leading-tight">~22 min</p>
                <p className="text-sm text-primary-foreground/80 mt-1">Average time from report to first volunteer match</p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReportNeed;
