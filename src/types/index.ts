import type { LucideIcon } from "lucide-react";

export type Urgency = "Low" | "Medium" | "High";

export type Category = "Food" | "Medical" | "Education" | "Shelter" | "Rescue";

export type CaseStatus = "Open" | "In Progress" | "Resolved";

export interface Case {
  id: string;
  title: string;
  category: Category;
  urgency: Urgency;
  location: string;
  peopleAffected: number;
  description: string;
  skills: string[];
  reportedAt: string;
  status: CaseStatus;
}

export interface Volunteer {
  id: string;
  name: string;
  avatar?: string;
  skills: string[];
  location: string;
  availability: string[];
  preferredCause: Category;
  distanceKm: number;
}

export interface MatchResult {
  score: number;
  matchedSkills: string[];
  nearby: boolean;
  available: boolean;
}

export interface ImpactStat {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend: string;
}

export interface DashboardSummary {
  icon: LucideIcon;
  label: string;
  value: number;
  trend: string;
  up: boolean;
  color: string;
}

export interface NeedFormValues {
  title: string;
  category: Category;
  description: string;
  location: string;
  urgency: Urgency;
  peopleAffected: number;
  skills: string[];
}

export interface VolunteerFormValues {
  name: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  availability: string[];
  preferredCause: Category;
}
