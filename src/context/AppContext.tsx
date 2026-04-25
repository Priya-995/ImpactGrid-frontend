import { createContext, useContext, useState } from "react";
import { cases as initialCases, volunteers as initialVolunteers } from "@/data/mockData";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [cases, setCases] = useState(initialCases);
  const [volunteers, setVolunteers] = useState(initialVolunteers);

  const addCase = (newCase) => {
    setCases((prev) => [newCase, ...prev]);
  };

  const addVolunteer = (newVolunteer) => {
    setVolunteers((prev) => [newVolunteer, ...prev]);
  };

  return (
    <AppContext.Provider value={{ cases, volunteers, addCase, addVolunteer }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppData = () => useContext(AppContext);