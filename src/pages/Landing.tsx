import { Link } from "react-router-dom";
import {
  ArrowRight,
  ClipboardList,
  Sparkles,
  Users,
  HandHeart,
  Activity,
  Building2,
  Utensils,
  Stethoscope,
  GraduationCap,
  Home,
  LifeBuoy,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { stats } from "@/data/mockData";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[1100px] rounded-full bg-primary/10 blur-3xl opacity-60" />
          <div className="absolute top-40 right-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        </div>

        <div className="container pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur px-3 py-1 text-xs font-medium text-muted-foreground mb-6 shadow-sm">
              <span className="flex h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Live: 142 active cases needing help right now
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Turn community needs into <span className="gradient-text">coordinated action.</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              ImpactGrid helps NGOs collect real-world problems, prioritize urgent needs, and intelligently match volunteers and resources — so help reaches people faster.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg" className="gradient-hero text-primary-foreground border-0 shadow-elegant h-12 px-6">
                <Link to="/report">
                  Report a Need <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-6 border-2">
                <Link to="/volunteer">Join as Volunteer</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="h-12 px-6">
                <Link to="/dashboard">View Dashboard <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>

            <div className="mt-10 flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-accent" /> Verified NGOs</div>
              <div className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-accent" /> Smart matching</div>
              <div className="flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5 text-accent" /> Live impact tracking</div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: HandHeart, label: "People Helped", value: stats.peopleHelped.toLocaleString(), trend: "+12%" },
              { icon: Activity, label: "Active Cases", value: stats.activeCases, trend: "Live" },
              { icon: Users, label: "Volunteers", value: stats.volunteers.toLocaleString(), trend: "+248" },
              { icon: Building2, label: "NGOs Onboarded", value: stats.ngos, trend: "+5" },
            ].map((s) => (
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
        </div>
      </section>

      {/* How it works */}
      <section className="container py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-accent">How it works</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">From signal to support in three steps</h2>
          <p className="text-muted-foreground mt-4">
            We turn raw community signals into coordinated action with intelligent prioritization and matching.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: ClipboardList,
              step: "01",
              title: "Report",
              text: "Communities and field workers report needs with location, urgency, and required resources.",
            },
            {
              icon: Sparkles,
              step: "02",
              title: "Prioritize",
              text: "Our system ranks cases by urgency, people affected, and time-sensitivity — surfacing what matters most.",
            },
            {
              icon: Users,
              step: "03",
              title: "Match",
              text: "Volunteers and resources are matched to cases by skill, proximity, and availability for maximum impact.",
            },
          ].map((s, i) => (
            <div key={s.step} className="relative rounded-2xl border border-border bg-card p-7 shadow-soft hover:shadow-elegant transition-smooth">
              <div className="flex items-center justify-between mb-5">
                <div className="h-12 w-12 rounded-xl gradient-hero flex items-center justify-center shadow-soft">
                  <s.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-5xl font-bold text-muted/50">{s.step}</span>
              </div>
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{s.text}</p>
              {i < 2 && (
                <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-border" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-accent">Coverage areas</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">Wherever help is needed</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: Utensils, label: "Food", color: "text-amber-600 bg-amber-50" },
            { icon: Stethoscope, label: "Medical", color: "text-rose-600 bg-rose-50" },
            { icon: GraduationCap, label: "Education", color: "text-indigo-600 bg-indigo-50" },
            { icon: Home, label: "Shelter", color: "text-emerald-600 bg-emerald-50" },
            { icon: LifeBuoy, label: "Rescue", color: "text-sky-600 bg-sky-50" },
          ].map((c) => (
            <div key={c.label} className="rounded-2xl border border-border bg-card p-6 text-center hover:shadow-elegant hover:-translate-y-0.5 transition-smooth">
              <div className={`mx-auto h-14 w-14 rounded-2xl flex items-center justify-center ${c.color}`}>
                <c.icon className="h-6 w-6" />
              </div>
              <div className="mt-4 font-semibold">{c.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="container pb-20">
        <div className="rounded-3xl gradient-hero p-10 md:p-16 text-center relative overflow-hidden shadow-elegant">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground tracking-tight">
              Be the reason someone gets help today.
            </h2>
            <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
              Join thousands of volunteers and NGOs already building a faster, smarter response network.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 h-12 px-6">
                <Link to="/volunteer">Become a Volunteer</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-6 bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to="/dashboard">Explore Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
