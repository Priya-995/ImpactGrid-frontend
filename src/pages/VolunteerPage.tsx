import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { Award, Heart, MapPin, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VolunteerForm from "@/components/VolunteerForm";
import type { VolunteerFormValues } from "@/types";
import { useAppData } from "@/context/AppContext";

const VolunteerPage = () => {
  const navigate = useNavigate();
  const { addVolunteer } = useAppData();

  const handleSubmit = async (values: VolunteerFormValues) => {
  try {
   const newVolunteer = {
      id: `V-${Date.now()}`,
      name: values.name,
      email: values.email,
      phone: values.phone,
      location: values.location,
        distanceKm: 5,
      status: "Available" as const,
      skills: values.skills,
      availability: values.availability,
      preferredCause: values.preferredCause,
      
    };

    await addVolunteer(newVolunteer);

    toast.success("Welcome to ImpactGrid 🎉", {
      description: "You'll be notified when matching cases come up in your area.",
    });

    navigate("/dashboard");
  } catch (error) {
    toast.error("Failed to register volunteer", {
      description: "Please check backend/API and try again.",
    });
    console.error(error);
  }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />

      <main className="flex-1 container py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Become a volunteer</h1>
            <p className="text-muted-foreground mt-2">Tell us about you. We'll match you with cases that fit your skills, schedule, and location.</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <VolunteerForm onSubmit={handleSubmit} onCancel={() => navigate("/")} />
            </div>

            <aside className="lg:col-span-2 space-y-4">
              <div className="rounded-2xl gradient-hero p-7 text-primary-foreground shadow-elegant relative overflow-hidden">
                <Sparkles className="absolute -top-4 -right-4 h-32 w-32 text-primary-foreground/10" />
                <div className="relative">
                  <Heart className="h-7 w-7" fill="currentColor" />
                  <h3 className="mt-4 text-2xl font-bold leading-tight">Small actions. Real impact.</h3>
                  <p className="mt-2 text-sm text-primary-foreground/80">
                    Last month, 1,240 volunteers helped over 8,000 people through ImpactGrid.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-5">
                <h3 className="font-semibold">Why volunteer with us?</h3>
                {[
                  { icon: Sparkles, title: "Smart matching", text: "Get matched only with cases that fit your skills and schedule." },
                  { icon: Award, title: "Track your impact", text: "See exactly how many lives you've helped change." },
                  { icon: MapPin, title: "Local focus", text: "We prioritize matching you to nearby needs." },
                ].map((b, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-9 w-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
                      <b.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{b.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{b.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VolunteerPage;
