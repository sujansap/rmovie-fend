import { createContext, useContext, useState, useMemo } from "react";

const LanguageContext = createContext();
const LANUAGE_KEY = "language";
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem(LANUAGE_KEY) || "en"
  );

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem(LANUAGE_KEY, newLanguage);
  };

  const value = useMemo(
    () => ({ language, changeLanguage }),
    [language, changeLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
