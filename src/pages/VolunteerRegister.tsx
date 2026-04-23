import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Mail, Phone, MapPin, User, Award, Heart, Sparkles, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const ALL_SKILLS = [
  "First Aid", "Doctor", "Nurse", "Teaching", "Counseling", "Driving",
  "Cooking", "Logistics", "Construction", "Mentoring", "Distribution",
  "Translation", "Tech Support", "Donation Drive",
];

const CAUSES = ["Food", "Medical", "Education", "Shelter", "Rescue"] as const;
const AVAILABILITY = ["Weekdays", "Weekends", "Evenings"] as const;

const VolunteerRegister = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<string[]>(["First Aid"]);
  const [availability, setAvailability] = useState<string[]>(["Weekends"]);
  const [cause, setCause] = useState<typeof CAUSES[number]>("Medical");

  const toggleSkill = (s: string) =>
    setSkills(skills.includes(s) ? skills.filter(k => k !== s) : [...skills, s]);

  const toggleAvailability = (a: string) =>
    setAvailability(availability.includes(a) ? availability.filter(k => k !== a) : [...availability, a]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Welcome to ImpactGrid 🎉", {
      description: "You'll be notified when matching cases come up in your area.",
    });
    setTimeout(() => navigate("/dashboard"), 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />

      <main className="flex-1 container py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Become a volunteer</h1>
            <p className="text-muted-foreground mt-2">Tell us about you. We'll match you with cases that fit your skills, schedule, and location.</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-3 rounded-2xl bg-card border border-border shadow-soft p-6 md:p-8 space-y-7">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="name" required placeholder="Your full name" className="pl-9 h-11" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loc" className="text-sm font-semibold">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="loc" required placeholder="City, State" className="pl-9 h-11" />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" required placeholder="you@email.com" className="pl-9 h-11" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" type="tel" required placeholder="+91 ..." className="pl-9 h-11" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold">Skills <span className="text-muted-foreground font-normal">(select all that apply)</span></Label>
                <div className="flex flex-wrap gap-2">
                  {ALL_SKILLS.map(s => {
                    const active = skills.includes(s);
                    return (
                      <button
                        type="button"
                        key={s}
                        onClick={() => toggleSkill(s)}
                        className={cn(
                          "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-smooth",
                          active
                            ? "bg-primary text-primary-foreground border-primary shadow-soft"
                            : "bg-background border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        )}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold">Availability</Label>
                <div className="grid grid-cols-3 gap-2">
                  {AVAILABILITY.map(a => {
                    const active = availability.includes(a);
                    return (
                      <button
                        type="button"
                        key={a}
                        onClick={() => toggleAvailability(a)}
                        className={cn(
                          "flex items-center justify-center gap-2 rounded-xl border-2 px-3 py-3 text-sm font-semibold transition-smooth",
                          active ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:border-primary/40"
                        )}
                      >
                        <span
                          className={cn(
                            "h-4 w-4 rounded border-2 flex items-center justify-center shrink-0",
                            active ? "bg-accent border-accent text-accent-foreground" : "border-border"
                          )}
                        >
                          {active && <Check className="h-3 w-3" />}
                        </span>
                        {a}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold">Preferred Cause</Label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {CAUSES.map(c => {
                    const active = cause === c;
                    return (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setCause(c)}
                        className={cn(
                          "rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition-smooth",
                          active ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/40"
                        )}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <Button asChild variant="ghost" type="button">
                  <Link to="/">Cancel</Link>
                </Button>
                <Button type="submit" size="lg" className="gradient-hero text-primary-foreground border-0 shadow-soft h-11 px-6">
                  Register as Volunteer
                </Button>
              </div>
            </form>

            {/* Side panel */}
            <aside className="lg:col-span-2 space-y-4">
              <div className="rounded-2xl gradient-hero p-7 text-primary-foreground shadow-elegant relative overflow-hidden">
                <Sparkles className="absolute -top-4 -right-4 h-32 w-32 text-primary-foreground/10" />
                <div className="relative">
                  <Heart className="h-7 w-7" fill="currentColor" />
                  <h3 className="mt-4 text-2xl font-bold leading-tight">Small actions. Real impact.</h3>
                  <p className="mt-2 text-sm text-primary-foreground/80">
                    Last month, 1,240 volunteers helped over 8,000 people through ImpactGrid.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-5">
                <h3 className="font-semibold">Why volunteer with us?</h3>
                {[
                  { icon: Sparkles, title: "Smart matching", text: "Get matched only with cases that fit your skills and schedule." },
                  { icon: Award, title: "Track your impact", text: "See exactly how many lives you've helped change." },
                  { icon: MapPin, title: "Local focus", text: "We prioritize matching you to nearby needs." },
                ].map((b, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-9 w-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
                      <b.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{b.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{b.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VolunteerRegister;
