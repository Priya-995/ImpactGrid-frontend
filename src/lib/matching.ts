import type { Case, MatchResult, Volunteer } from "@/types";

export const computeMatch = (
  caseSkills: string[],
  caseLocation: string,
  v: Volunteer,
): MatchResult => {
  const skillOverlap = v.skills.filter((s) => caseSkills.includes(s)).length;
  const skillScore = caseSkills.length ? Math.min(60, (skillOverlap / caseSkills.length) * 60) : 0;
  const sameCity = caseLocation.split(",")[0].trim() === v.location.split(",")[0].trim();
  const distScore = sameCity ? 25 : v.distanceKm < 20 ? 18 : v.distanceKm < 50 ? 10 : 4;
  const availScore = v.availability.length >= 2 ? 15 : 8;
  const total = Math.round(skillScore + distScore + availScore);
  return {
    score: Math.min(99, total),
    matchedSkills: v.skills.filter((s) => caseSkills.includes(s)),
    nearby: v.distanceKm <= 20,
    available: v.availability.length >= 1,
  };
};

export const rankVolunteers = (caseData: Case, volunteers: Volunteer[]) =>
  volunteers
    .map((v) => ({ volunteer: v, match: computeMatch(caseData.skills, caseData.location, v) }))
    .sort((a, b) => b.match.score - a.match.score);
