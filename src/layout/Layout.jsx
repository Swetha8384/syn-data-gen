import Dashboard from "@/components/dashboard";
import { useTheme } from "@/components/theme-provider";
import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";
export const UserContext = createContext();
/**
 * layout component to generate our basic layout of our application
 * @returns {void}
 */
function Layout() {
  const { setTheme, theme } = useTheme();
  const [expanded, setExpanded] = useState(true);
  const [prompt, setPrompt] = useState(
    "You are an AI assistant generate a descriptions based on the schema details Provided."
  );
  const [schemaData, setSchemaData] = useState([]);
  const [projectID, setProjectID] = useState("fresh-span-400217");
  const [datasetID, setDatasetID] = useState("Insurance_claims");
  const [tableID, setTableID] = useState("new_use_case");
  const [isEnableGenData, setIsEnableGenData] = useState(false);
  return (
    <UserContext.Provider
      value={{
        schemaData,
        setSchemaData,
        prompt,
        setPrompt,
        projectID,
        setProjectID,
        datasetID,
        setDatasetID,
        tableID,
        setTableID,
        isEnableGenData,
        setIsEnableGenData,
      }}
    >
      <div className="flex flex-col w-full h-full transition-all">
        {/* Header */}
        <Header />

        {/* Main Content Area */}
        <div className="flex w-full h-full">
          {/* <Aside expanded={expanded} setExpanded={setExpanded} /> */}
          <div className="flex flex-col w-3/4 h-full p-4 ml-[25%]">
            <div className="w-full h-full">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route
                  path="/other"
                  element={<div>Other Content</div>}
                  schemaData={schemaData}
                  setSchemaData={setSchemaData}
                />
              </Routes>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default Layout;
