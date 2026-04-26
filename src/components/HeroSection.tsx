import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppData } from "@/context/AppContext";

export interface HeroSectionProps {
  badgeText?: string;
  title?: React.ReactNode;
  subtitle?: string;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  tertiaryCta?: { label: string; to: string };
}

const HeroSection = ({
  badgeText,
  title = (
    <>
      Turn community needs into <span className="gradient-text">coordinated action.</span>
    </>
  ),
  subtitle = "ImpactGrid helps NGOs collect real-world problems, prioritize urgent needs, and intelligently match volunteers and resources — so help reaches people faster.",
  primaryCta = { label: "Report a Need", to: "/report" },
  secondaryCta = { label: "Join as Volunteer", to: "/volunteer" },
  tertiaryCta = { label: "View Dashboard", to: "/dashboard" },
}: HeroSectionProps) => {
  const { cases } = useAppData();

  const activeCases = cases.filter((c) => c.status !== "Resolved").length;

  const dynamicBadgeText =
    badgeText ?? `Live: ${activeCases} active cases needing help right now`;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[1100px] rounded-full bg-primary/10 blur-3xl opacity-60" />
        <div className="absolute top-40 right-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      </div>

      <div className="container pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur px-3 py-1 text-xs font-medium text-muted-foreground mb-6 shadow-sm">
            <span className="flex h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            {dynamicBadgeText}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            {title}
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="gradient-hero text-primary-foreground border-0 shadow-elegant h-12 px-6">
              <Link to={primaryCta.to}>
                {primaryCta.label} <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="h-12 px-6 border-2">
              <Link to={secondaryCta.to}>{secondaryCta.label}</Link>
            </Button>

            <Button asChild size="lg" variant="ghost" className="h-12 px-6">
              <Link to={tertiaryCta.to}>
                {tertiaryCta.label} <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" /> Verified NGOs
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-accent" /> Smart matching
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-accent" /> Live impact tracking
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
