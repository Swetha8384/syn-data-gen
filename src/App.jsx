import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useTheme } from "./components/theme-provider";
import LoginPage from "./screens/LoginPage";
import Dashboard from "./screens/dashboard/Dashboard";

export const UserContext = createContext();

function App() {
  const { setTheme, theme } = useTheme();
  const [expanded, setExpanded] = useState(true);

  const [prompt, setPrompt] = useState(
    "You are an AI assistant generate descriptions based on the schema details Provided."
  );
  const [schemaData, setSchemaData] = useState([]);

  const [isEnableGenData, setIsEnableGenData] = useState(false);

  return (
    <UserContext.Provider
      value={{
        theme,
        setTheme,
        expanded,
        schemaData,
        setSchemaData,
        prompt,
        setPrompt,
        isEnableGenData,
        setIsEnableGenData,
      }}
    >
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
