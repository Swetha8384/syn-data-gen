import Dashboard from "@/components/dashboard";
import { useTheme } from "@/components/theme-provider";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { createContext, useState } from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import LeftPanel from "./leftPanel/leftPanel";
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
          <ResizablePanelGroup
            direction="horizontal"
            className="max-w-full border rounded-lg"
          >
            <ResizablePanel defaultSize={25}>
              <div className="flex items-start justify-start p-6 overflow-y-auto">
                <LeftPanel />
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              <div className="flex h-[200px] items-center justify-center p-6">
                <Dashboard />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default Layout;
