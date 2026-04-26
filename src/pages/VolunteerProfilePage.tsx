import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, HeartHandshake, BadgeCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppData } from "@/context/AppContext";
import { Button } from "@/components/ui/button";

const VolunteerProfilePage = () => {
  const { id } = useParams();
  const { volunteers } = useAppData();

  const volunteer = volunteers.find((v) => String(v.id) === String(id));

  if (!volunteer) {
    return (
      <div className="min-h-screen flex flex-col bg-muted/30">
        <Navbar />
        <main className="flex-1 container py-10">
          <h1 className="text-2xl font-bold">Volunteer not found</h1>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const initials = volunteer.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />

      <main className="flex-1 container py-10">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>

        <div className="max-w-3xl rounded-2xl border border-border bg-card p-8 shadow-soft">
          <div className="flex items-start gap-5">
            <div className="h-20 w-20 rounded-2xl gradient-hero text-primary-foreground flex items-center justify-center text-2xl font-bold">
              {initials}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">{volunteer.name}</h1>
                <BadgeCheck className="h-5 w-5 text-accent" />
              </div>

              <p className="text-sm text-muted-foreground font-mono mt-1">
                {volunteer.id}
              </p>

              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {volunteer.location}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4" /> {volunteer.availability.join(", ")}
                </p>
                <p className="flex items-center gap-2">
                  <HeartHandshake className="h-4 w-4" /> Preferred cause: {volunteer.preferredCause}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-semibold mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {volunteer.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Distance</p>
              <p className="text-xl font-bold">{volunteer.distanceKm} km</p>
            </div>

            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="text-xl font-bold">{volunteer.status || "Available"}</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VolunteerProfilePage;