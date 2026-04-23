import { Link, NavLink, useLocation } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/report", label: "Report a Need" },
  { to: "/volunteer", label: "Volunteer" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-hero shadow-soft transition-smooth group-hover:scale-105">
            <Heart className="h-4 w-4 text-primary-foreground" fill="currentColor" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-base tracking-tight">ImpactGrid</span>
            <span className="text-[10px] text-muted-foreground font-medium">NGO Resource Network</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-smooth",
                  isActive
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/volunteer">Sign in</Link>
          </Button>
          <Button asChild size="sm" className="gradient-hero text-primary-foreground border-0 shadow-soft">
            <Link to="/report">Report a Need</Link>
          </Button>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container py-3 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "px-3 py-2.5 text-sm font-medium rounded-lg",
                  location.pathname === l.to
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                {l.label}
              </Link>
            ))}
            <Button asChild size="sm" className="gradient-hero text-primary-foreground border-0 mt-2">
              <Link to="/report" onClick={() => setOpen(false)}>Report a Need</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
