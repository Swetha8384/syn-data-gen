import { useState } from "react";
import { Button } from "./components/ui/button";
import Layout from "./layout/Layout";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <>
      {authenticated ? (
        <div className="w-full h-full ">
          <Layout />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          {/* <div className="w-full h-full ">
            <Layout />
          </div> */}
          <Button
            onClick={() => {
              setAuthenticated(true);
            }}
          >
            Login
          </Button>
        </div>
      )}
    </>
  );
}

export default App;
