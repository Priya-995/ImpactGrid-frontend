import { useState } from "react";
import {
  MapPin, Send, X, Plus, Utensils, Stethoscope, GraduationCap, Home as HomeIcon, LifeBuoy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { Category, NeedFormValues, Urgency } from "@/types";

const categories: { value: Category; icon: any; color: string }[] = [
  { value: "Food", icon: Utensils, color: "text-amber-600 bg-amber-50 border-amber-200" },
  { value: "Medical", icon: Stethoscope, color: "text-rose-600 bg-rose-50 border-rose-200" },
  { value: "Education", icon: GraduationCap, color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
  { value: "Shelter", icon: HomeIcon, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  { value: "Rescue", icon: LifeBuoy, color: "text-sky-600 bg-sky-50 border-sky-200" },
];

const urgencies: { value: Urgency; color: string }[] = [
  { value: "Low", color: "border-urgency-low text-urgency-low bg-urgency-low-soft" },
  { value: "Medium", color: "border-urgency-medium text-urgency-medium bg-urgency-medium-soft" },
  { value: "High", color: "border-urgency-high text-urgency-high bg-urgency-high-soft" },
];

export interface NeedFormProps {
  initialValues?: Partial<NeedFormValues>;
  onSubmit: (values: NeedFormValues) => void;
  submitLabel?: string;
}

const NeedForm = ({ initialValues, onSubmit, submitLabel = "Submit Report" }: NeedFormProps) => {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [location, setLocation] = useState(initialValues?.location ?? "");
  const [peopleAffected, setPeopleAffected] = useState<number>(initialValues?.peopleAffected ?? 0);
  const [category, setCategory] = useState<Category>(initialValues?.category ?? "Food");
  const [urgency, setUrgency] = useState<Urgency>(initialValues?.urgency ?? "Medium");
  const [skills, setSkills] = useState<string[]>(initialValues?.skills ?? ["Logistics"]);
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    const v = skillInput.trim();
    if (v && !skills.includes(v)) setSkills([...skills, v]);
    setSkillInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  onSubmit({
    title,
    description,
    location: location.trim(),
    peopleAffected: Number(peopleAffected),
    category,
    urgency,
    skills,
  });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-card border border-border shadow-soft">
      <div className="p-6 md:p-8 space-y-7">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-semibold">Issue Title</Label>
          <Input
            id="title" required value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Emergency food supplies for flood-affected families" className="h-11"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">Category</Label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {categories.map((c) => {
              const active = category === c.value;
              return (
                <button
                  key={c.value} type="button" onClick={() => setCategory(c.value)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-smooth",
                    active ? c.color + " shadow-soft" : "border-border hover:border-primary/40 bg-background",
                  )}
                >
                  <c.icon className="h-5 w-5" />
                  <span className="text-xs font-semibold">{c.value}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="desc" className="text-sm font-semibold">Description</Label>
          <Textarea
            id="desc" required value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the situation, what's needed, and any context that will help volunteers respond effectively." rows={5}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="loc" className="text-sm font-semibold">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="loc" required value={location} onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State" className="pl-9 h-11"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="people" className="text-sm font-semibold">People Affected</Label>
            <Input
              id="people" type="number" min={1} required
              value={peopleAffected || ""} onChange={(e) => setPeopleAffected(Number(e.target.value))}
              placeholder="0" className="h-11"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">Urgency Level</Label>
          <div className="grid grid-cols-3 gap-2">
            {urgencies.map((u) => {
              const active = urgency === u.value;
              return (
                <button
                  key={u.value} type="button" onClick={() => setUrgency(u.value)}
                  className={cn(
                    "py-3 rounded-xl border-2 font-semibold text-sm transition-smooth",
                    active ? u.color : "border-border bg-background text-muted-foreground hover:border-primary/40",
                  )}
                >
                  <span
                    className={cn("inline-block h-2 w-2 rounded-full mr-2", active ? "" : "bg-muted-foreground")}
                    style={active ? { background: "currentColor" } : {}}
                  />
                  {u.value}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">Required Skills / Resources</Label>
          <div className="flex gap-2">
            <Input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
              placeholder="e.g. First Aid, Driving, Logistics" className="h-11"
            />
            <Button type="button" onClick={addSkill} variant="outline" className="h-11">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5">
                {s}
                <button type="button" onClick={() => setSkills(skills.filter((k) => k !== s))} className="hover:bg-primary/20 rounded-full">
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
          <Send className="h-4 w-4" /> {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default NeedForm;
