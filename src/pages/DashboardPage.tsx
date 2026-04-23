import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity, AlertTriangle, Users, Boxes, Search, MapPin, ArrowUpRight,
  LayoutGrid, List, Filter,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardCards from "@/components/DashboardCards";
import UrgencyBadge from "@/components/UrgencyBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cases as allCases, categoryIcons, categoryColors } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Category, DashboardSummary } from "@/types";

const URGENCIES = ["All", "High", "Medium", "Low"] as const;
const CATEGORIES = ["All", "Food", "Medical", "Education", "Shelter", "Rescue"] as const;

const DashboardPage = () => {
  const [urgency, setUrgency] = useState<typeof URGENCIES[number]>("All");
  const [category, setCategory] = useState<typeof CATEGORIES[number]>("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "table">("grid");

  const filtered = useMemo(() => {
    return allCases.filter(
      (c) =>
        (urgency === "All" || c.urgency === urgency) &&
        (category === "All" || c.category === category) &&
        (search === "" ||
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          c.location.toLowerCase().includes(search.toLowerCase())),
    );
  }, [urgency, category, search]);

  const summaryCards: DashboardSummary[] = [
    { icon: Activity, label: "Active Cases", value: allCases.filter((c) => c.status !== "Resolved").length, trend: "+8%", up: true, color: "text-primary bg-primary/10" },
    { icon: AlertTriangle, label: "High Priority", value: allCases.filter((c) => c.urgency === "High").length, trend: "+3", up: true, color: "text-urgency-high bg-urgency-high-soft" },
    { icon: Users, label: "Volunteers Available", value: 248, trend: "+12%", up: true, color: "text-accent bg-accent/10" },
    { icon: Boxes, label: "Resources Assigned", value: 67, trend: "-4%", up: false, color: "text-indigo-600 bg-indigo-50" },
  ];

  const byCategory = (["Food", "Medical", "Education", "Shelter", "Rescue"] as Category[]).map((cat) => ({
    cat,
    count: allCases.filter((c) => c.category === cat).length,
  }));
  const maxCount = Math.max(...byCategory.map((b) => b.count));

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />

      <main className="flex-1 container py-8 md:py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-accent uppercase tracking-wider">NGO Dashboard</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-1">Operations overview</h1>
            <p className="text-muted-foreground mt-2">Monitor active cases, urgency levels, and volunteer assignments in real time.</p>
          </div>
          <Button asChild className="gradient-hero text-primary-foreground border-0 shadow-soft">
            <Link to="/report">+ New Need</Link>
          </Button>
        </div>

        <div className="mb-8">
          <DashboardCards cards={summaryCards} />
        </div>

        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold">Cases by category</h3>
                <p className="text-xs text-muted-foreground">Distribution of all active reports</p>
              </div>
              <span className="text-xs text-muted-foreground">Last 30 days</span>
            </div>
            <div className="space-y-4">
              {byCategory.map((b) => {
                const Icon = categoryIcons[b.cat];
                const pct = (b.count / maxCount) * 100;
                return (
                  <div key={b.cat} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 font-medium">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        {b.cat}
                      </span>
                      <span className="font-bold">{b.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full gradient-hero transition-all duration-700" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-semibold">Response time</h3>
            <p className="text-xs text-muted-foreground">Average match latency</p>
            <div className="mt-6">
              <p className="text-5xl font-bold gradient-text">22m</p>
              <p className="text-sm text-muted-foreground mt-2">↓ 18% vs last week</p>
            </div>
            <div className="mt-6 pt-6 border-t border-border space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Resolved this week</span>
                <span className="font-semibold">38</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pending matches</span>
                <span className="font-semibold">12</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-soft mb-5">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search cases by title or location..." className="pl-9 h-10 border-border bg-background"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                <Filter className="h-3 w-3" /> Urgency:
              </div>
              {URGENCIES.map((u) => (
                <button
                  key={u} onClick={() => setUrgency(u)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-smooth",
                    urgency === u ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/40",
                  )}
                >
                  {u}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="text-xs font-semibold text-muted-foreground">Category:</div>
              {CATEGORIES.map((c) => (
                <button
                  key={c} onClick={() => setCategory(c)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-smooth",
                    category === c ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/40",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex border border-border rounded-lg overflow-hidden">
              <button onClick={() => setView("grid")} className={cn("px-3 py-1.5", view === "grid" ? "bg-muted" : "bg-background")}>
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button onClick={() => setView("table")} className={cn("px-3 py-1.5 border-l border-border", view === "table" ? "bg-muted" : "bg-background")}>
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            Reported needs <span className="text-muted-foreground font-normal">({filtered.length})</span>
          </h2>
        </div>

        {view === "grid" ? (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((c) => {
              const Icon = categoryIcons[c.category];
              return (
                <div key={c.id} className="group rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elegant hover:-translate-y-0.5 transition-smooth flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className={cn("h-10 w-10 rounded-xl border flex items-center justify-center shrink-0", categoryColors[c.category])}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <UrgencyBadge level={c.urgency} />
                  </div>
                  <div className="mt-4 flex-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-mono">{c.id}</span>
                      <span>•</span>
                      <span>{c.reportedAt}</span>
                    </div>
                    <h3 className="mt-1 font-semibold leading-snug line-clamp-2">{c.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" /> {c.location}
                      </span>
                      <span className="font-semibold">{c.peopleAffected} people</span>
                    </div>
                    <Button asChild size="sm" variant="outline" className="w-full group-hover:border-primary group-hover:text-primary transition-smooth">
                      <Link to={`/match/${c.id}`}>
                        Find Matches <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Urgency</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">People</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => {
                  const Icon = categoryIcons[c.category];
                  return (
                    <TableRow key={c.id}>
                      <TableCell className="font-mono text-xs">{c.id}</TableCell>
                      <TableCell className="font-medium max-w-md">{c.title}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1.5 text-sm">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          {c.category}
                        </span>
                      </TableCell>
                      <TableCell><UrgencyBadge level={c.urgency} /></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{c.location}</TableCell>
                      <TableCell className="text-right font-semibold">{c.peopleAffected}</TableCell>
                      <TableCell className="text-right">
                        <Button asChild size="sm" variant="ghost">
                          <Link to={`/match/${c.id}`}>Match →</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">No cases match your filters.</div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;
