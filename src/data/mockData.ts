import { Utensils, Stethoscope, GraduationCap, Home, LifeBuoy, type LucideIcon } from "lucide-react";
import type { Case, Category, Volunteer } from "@/types";

export const categoryIcons: Record<Category, LucideIcon> = {
  Food: Utensils,
  Medical: Stethoscope,
  Education: GraduationCap,
  Shelter: Home,
  Rescue: LifeBuoy,
};

export const categoryColors: Record<Category, string> = {
  Food: "bg-amber-50 text-amber-600 border-amber-200",
  Medical: "bg-rose-50 text-rose-600 border-rose-200",
  Education: "bg-indigo-50 text-indigo-600 border-indigo-200",
  Shelter: "bg-emerald-50 text-emerald-600 border-emerald-200",
  Rescue: "bg-sky-50 text-sky-600 border-sky-200",
};

export const cases: Case[] = [
  {
    id: "C-1042",
    title: "Emergency food supplies for flood-affected families",
    category: "Food",
    urgency: "High",
    location: "Patna, Bihar",
    peopleAffected: 240,
    description:
      "Severe flooding has displaced multiple families. Immediate need for dry rations, drinking water, and baby food.",
    skills: ["Logistics", "Distribution", "Driving"],
    reportedAt: "2h ago",
    status: "Open",
  },
  {
    id: "C-1041",
    title: "Medical camp needed in remote village",
    category: "Medical",
    urgency: "High",
    location: "Jaisalmer, Rajasthan",
    peopleAffected: 85,
    description: "Outbreak of seasonal infections. Doctors and basic medicines urgently required.",
    skills: ["Doctor", "Nurse", "First Aid"],
    reportedAt: "4h ago",
    status: "In Progress",
  },
  {
    id: "C-1040",
    title: "School supplies for underprivileged children",
    category: "Education",
    urgency: "Medium",
    location: "Mumbai, Maharashtra",
    peopleAffected: 120,
    description: "Notebooks, stationery and uniforms needed before the new academic term begins next month.",
    skills: ["Teaching", "Mentoring", "Donation Drive"],
    reportedAt: "1d ago",
    status: "Open",
  },
  {
    id: "C-1039",
    title: "Temporary shelter for displaced families",
    category: "Shelter",
    urgency: "High",
    location: "Guwahati, Assam",
    peopleAffected: 60,
    description: "Tents, blankets, and basic shelter materials needed for families affected by recent landslide.",
    skills: ["Construction", "Logistics", "Counseling"],
    reportedAt: "6h ago",
    status: "Open",
  },
  {
    id: "C-1038",
    title: "Rescue operation for trapped trekkers",
    category: "Rescue",
    urgency: "High",
    location: "Manali, Himachal",
    peopleAffected: 12,
    description: "Group of trekkers stranded due to sudden snowfall. Trained rescue volunteers needed.",
    skills: ["Mountaineering", "First Aid", "Navigation"],
    reportedAt: "30m ago",
    status: "In Progress",
  },
  {
    id: "C-1037",
    title: "After-school tutoring program",
    category: "Education",
    urgency: "Low",
    location: "Bengaluru, Karnataka",
    peopleAffected: 45,
    description: "Volunteers needed for math and science tutoring at community center, weekday evenings.",
    skills: ["Teaching", "Math", "Science"],
    reportedAt: "2d ago",
    status: "Open",
  },
  {
    id: "C-1036",
    title: "Community kitchen for elderly residents",
    category: "Food",
    urgency: "Medium",
    location: "Kolkata, West Bengal",
    peopleAffected: 80,
    description: "Daily meal preparation and delivery for elderly residents living alone.",
    skills: ["Cooking", "Delivery", "Care"],
    reportedAt: "1d ago",
    status: "Open",
  },
  {
    id: "C-1035",
    title: "Mental health support sessions",
    category: "Medical",
    urgency: "Medium",
    location: "Delhi, NCR",
    peopleAffected: 30,
    description: "Counselors needed for weekly group sessions with disaster survivors.",
    skills: ["Counseling", "Psychology", "Empathy"],
    reportedAt: "3d ago",
    status: "In Progress",
  },
];

export const volunteers: Volunteer[] = [
  { id: "V-201", name: "Aanya Sharma", skills: ["Logistics", "Distribution", "Driving"], location: "Patna, Bihar", availability: ["Weekdays", "Weekends"], preferredCause: "Food", distanceKm: 3 },
  { id: "V-202", name: "Rohan Mehta", skills: ["Doctor", "First Aid"], location: "Patna, Bihar", availability: ["Weekends", "Evenings"], preferredCause: "Medical", distanceKm: 5 },
  { id: "V-203", name: "Priya Nair", skills: ["Teaching", "Mentoring", "Logistics"], location: "Gaya, Bihar", availability: ["Weekdays"], preferredCause: "Education", distanceKm: 12 },
  { id: "V-204", name: "Vikram Singh", skills: ["Distribution", "Driving", "Construction"], location: "Patna, Bihar", availability: ["Weekdays", "Weekends", "Evenings"], preferredCause: "Shelter", distanceKm: 7 },
  { id: "V-205", name: "Meera Iyer", skills: ["Nurse", "First Aid", "Counseling"], location: "Muzaffarpur, Bihar", availability: ["Weekends"], preferredCause: "Medical", distanceKm: 18 },
  { id: "V-206", name: "Arjun Patel", skills: ["Logistics", "Donation Drive"], location: "Ranchi, Jharkhand", availability: ["Evenings"], preferredCause: "Food", distanceKm: 35 },
];

export const stats = {
  peopleHelped: 24580,
  activeCases: 142,
  volunteers: 3267,
  ngos: 89,
};
