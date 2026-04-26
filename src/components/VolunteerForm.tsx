import { useState } from "react";
import { Mail, Phone, MapPin, User, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { Category, VolunteerFormValues } from "@/types";

const ALL_SKILLS = [
  "First Aid", "Doctor", "Nurse", "Teaching", "Counseling", "Driving",
  "Cooking", "Logistics", "Construction", "Mentoring", "Distribution",
  "Translation", "Tech Support", "Donation Drive",
];

const CAUSES: Category[] = ["Food", "Medical", "Education", "Shelter", "Rescue"];
const AVAILABILITY = ["Weekdays", "Weekends", "Evenings"] as const;

export interface VolunteerFormProps {
  initialValues?: Partial<VolunteerFormValues>;
  onSubmit: (values: VolunteerFormValues) => void;
  onCancel?: () => void;
}

const VolunteerForm = ({ initialValues, onSubmit, onCancel }: VolunteerFormProps) => {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [email, setEmail] = useState(initialValues?.email ?? "");
  const [phone, setPhone] = useState(initialValues?.phone ?? "");
  const [location, setLocation] = useState(initialValues?.location ?? "");
  const [skills, setSkills] = useState<string[]>(initialValues?.skills ?? ["First Aid"]);
  const [availability, setAvailability] = useState<string[]>(initialValues?.availability ?? ["Weekends"]);
  const [preferredCause, setPreferredCause] = useState<Category>(initialValues?.preferredCause ?? "Medical");

  const toggleSkill = (s: string) =>
    setSkills(skills.includes(s) ? skills.filter((k) => k !== s) : [...skills, s]);

  const toggleAvailability = (a: string) =>
    setAvailability(availability.includes(a) ? availability.filter((k) => k !== a) : [...availability, a]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, phone, location, skills, availability, preferredCause });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-card border border-border shadow-soft p-6 md:p-8 space-y-7">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="pl-9 h-11" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="loc" className="text-sm font-semibold">Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="loc" required value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, State" className="pl-9 h-11" />
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="pl-9 h-11" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-semibold">Phone</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 ..." className="pl-9 h-11" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-semibold">
          Skills <span className="text-muted-foreground font-normal">(select all that apply)</span>
        </Label>
        <div className="flex flex-wrap gap-2">
          {ALL_SKILLS.map((s) => {
            const active = skills.includes(s);
            return (
              <button
                type="button" key={s} onClick={() => toggleSkill(s)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-smooth",
                  active
                    ? "bg-primary text-primary-foreground border-primary shadow-soft"
                    : "bg-background border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
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
          {AVAILABILITY.map((a) => {
            const active = availability.includes(a);
            return (
              <button
                type="button" key={a} onClick={() => toggleAvailability(a)}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl border-2 px-3 py-3 text-sm font-semibold transition-smooth",
                  active ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:border-primary/40",
                )}
              >
                <span
                  className={cn(
                    "h-4 w-4 rounded border-2 flex items-center justify-center shrink-0",
                    active ? "bg-accent border-accent text-accent-foreground" : "border-border",
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
          {CAUSES.map((c) => {
            const active = preferredCause === c;
            return (
              <button
                type="button" key={c} onClick={() => setPreferredCause(c)}
                className={cn(
                  "rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition-smooth",
                  active ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/40",
                )}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-2 flex items-center justify-end gap-3">
        {onCancel && (
          <Button variant="ghost" type="button" onClick={onCancel}>Cancel</Button>
        )}
        <Button type="submit" size="lg"  onClick={() => console.log("Register button clicked")} className="gradient-hero text-primary-foreground border-0 shadow-soft h-11 px-6">
          Register as Volunteer
        </Button>
      </div>
    </form>
  );
};

export default VolunteerForm;
