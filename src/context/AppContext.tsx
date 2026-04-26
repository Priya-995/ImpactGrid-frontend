import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(null);

const API_URL = "http://localhost:3000/api";

export const AppProvider = ({ children }) => {
  const [cases, setCases] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const casesRes = await fetch(`${API_URL}/cases`);
      const volunteersRes = await fetch(`${API_URL}/volunteers`);

      console.log("cases status:", casesRes.status);
      console.log("volunteers status:", volunteersRes.status);

      if (!casesRes.ok) throw new Error("Cases API failed");
      if (!volunteersRes.ok) throw new Error("Volunteers API failed");

      const casesData = await casesRes.json();
      const volunteersData = await volunteersRes.json();

      console.log("casesData:", casesData);
      console.log("volunteersData:", volunteersData);

      setCases(Array.isArray(casesData) ? casesData : casesData.data || []);
      setVolunteers(
        Array.isArray(volunteersData) ? volunteersData : volunteersData.data || []
      );
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addCase = async (newCase) => {
    const res = await fetch(`${API_URL}/cases`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCase),
    });

    const data = await res.json();
    console.log("created case:", data);

    setCases((prev) => [data.data || data, ...prev]);
  };

 const addVolunteer = async (newVolunteer) => {
  try {
    console.log("Sending volunteer:", newVolunteer);

    const res = await fetch(`${API_URL}/volunteers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVolunteer),
    });

    const data = await res.json();

    console.log("Volunteer API status:", res.status);
    console.log("Volunteer API response:", data);

    if (!res.ok) {
      throw new Error(data.message || "Failed to register volunteer");
    }

    setVolunteers((prev) => [data.data || data, ...prev]);
  } catch (err) {
    console.error("Volunteer API error:", err);
    throw err;
  }
};
  const assignVolunteerToCase = (caseId, volunteerId) => {
    setCases((prev) =>
      prev.map((c) =>
        String(c.id) === String(caseId)
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