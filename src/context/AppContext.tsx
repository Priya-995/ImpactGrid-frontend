import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const AppProvider = ({ children }) => {
  const [cases, setCases]         = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading]     = useState(true);

  // ─── Fetch all data ────────────────────────────────────────────
  const fetchData = async () => {
    try {
      setLoading(true);
      const [casesRes, volunteersRes] = await Promise.all([
        fetch(`${API_URL}/cases`),
        fetch(`${API_URL}/volunteers`),
      ]);

      if (!casesRes.ok)      throw new Error(`Cases API failed: ${casesRes.status}`);
      if (!volunteersRes.ok) throw new Error(`Volunteers API failed: ${volunteersRes.status}`);

      const casesData      = await casesRes.json();
      const volunteersData = await volunteersRes.json();

      // Handle both { data: [] } and plain [] responses
      setCases(     Array.isArray(casesData)      ? casesData      : casesData.data      ?? []);
      setVolunteers(Array.isArray(volunteersData) ? volunteersData : volunteersData.data ?? []);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // ─── Add Case (was missing try/catch + res.ok check) ───────────
  const addCase = async (newCase) => {
    try {
      const res = await fetch(`${API_URL}/cases`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(newCase),
      });

      const data = await res.json();

      // ✅ This was missing — without it, a 400/500 looks like success
      if (!res.ok) {
        throw new Error(data.message || `Server error: ${res.status}`);
      }

      console.log("Created case:", data);
      setCases((prev) => [data.data ?? data, ...prev]); // ✅ fixed corrupted reference
    } catch (err) {
      console.error("Add case error:", err);
      throw err; // re-throw so the form can catch it and show the error toast
    }
  };

  // ─── Add Volunteer ─────────────────────────────────────────────
  const addVolunteer = async (newVolunteer) => {
    try {
      console.log("Sending volunteer:", newVolunteer);
      const res = await fetch(`${API_URL}/volunteers`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(newVolunteer),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || `Failed to register volunteer: ${res.status}`);
      }

      console.log("Volunteer created:", data);
      setVolunteers((prev) => [data.data ?? data, ...prev]); // ✅ fixed corrupted reference
    } catch (err) {
      console.error("Volunteer API error:", err);
      throw err;
    }
  };

  // ─── Assign Volunteer ──────────────────────────────────────────
  const assignVolunteerToCase = (caseId, volunteerId) => {
    setCases((prev) =>
      prev.map((c) =>                                        // ✅ fixed corrupted reference
        String(c.id ?? c._id) === String(caseId)            // ✅ also handles MongoDB _id
          ? { ...c, status: "In Progress", assignedTo: volunteerId }
          : c
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        cases,
        volunteers,
        loading,
        addCase,
        addVolunteer,
        assignVolunteerToCase,
        refetchData: fetchData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppData = () => useContext(AppContext);
