import Dashboard from "@/components/dashboard";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import LeftPanel from "./leftPanel/leftPanel";

/**
 * layout component to generate our basic layout of our application
 * @returns {void}
 */
function Layout() {
  return (
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
  );
}

export default Layout;
