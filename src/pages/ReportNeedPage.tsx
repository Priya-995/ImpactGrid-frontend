import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Lightbulb, Clock, ShieldCheck, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NeedForm from "@/components/NeedForm";
import { useAppData } from "@/context/AppContext";
import type { NeedFormValues } from "@/types";


const ReportNeedPage = () => {
  const navigate = useNavigate();
  const { addCase } = useAppData();
  const handleSubmit = async (values: NeedFormValues) => {
  try {
    const newCase = {
      id: `C-${Date.now()}`,   // IMPORTANT
      title: values.title,
      location: values.location,
      peopleAffected: values.peopleAffected,
      status: "Open" as const,   // better than "pending"
      urgency: values.urgency,
      category: values.category,
      description: values.description,
      skills: values.skills,
      reportedAt: new Date().toISOString(),
      
    };

    await addCase(newCase);   // ✅ MUST await

    toast.success("Need reported successfully", {
      description: "An NGO coordinator will review and start matching volunteers shortly.",
    });

    navigate("/dashboard");   // no need setTimeout
  } catch (error) {
    toast.error("Failed to submit need", {
      description: "Please try again.",
    });
    console.error(error);
  }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />

      <main className="flex-1 container py-10 md:py-14">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">← Back to Dashboard</Link>
            <h1 className="text-3xl md:text-4xl font-bold mt-3">Report a community need</h1>
            <p className="text-muted-foreground mt-2">Share the details — we'll help match volunteers and resources fast.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <NeedForm onSubmit={handleSubmit} />
            </div>

            <aside className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="font-semibold flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-accent" /> What happens next?
                </h3>
                <ol className="mt-4 space-y-4 text-sm">
                  {[
                    { icon: ShieldCheck, title: "Verification", text: "An NGO coordinator reviews your report within minutes." },
                    { icon: Clock, title: "Prioritization", text: "We rank cases by urgency and people affected." },
                    { icon: Send, title: "Matching", text: "Volunteers with matching skills nearby get notified instantly." },
                  ].map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <s.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold">{s.title}</p>
                        <p className="text-muted-foreground text-xs mt-0.5">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-2xl gradient-hero p-6 text-primary-foreground shadow-elegant">
                <p className="text-2xl font-bold leading-tight">~22 min</p>
                <p className="text-sm text-primary-foreground/80 mt-1">Average time from report to first volunteer match</p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReportNeedPage;
