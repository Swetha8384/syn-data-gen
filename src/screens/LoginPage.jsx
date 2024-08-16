import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [projectID, setProjectID] = useState("");
  const [datasetID, setDatasetID] = useState("");
  const [tableID, setTableID] = useState("");

  const [isConnected, setIsConnected] = useState(false); // Initial state should be false

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleConnect = () => {
    navigate("/dashboard"); // Redirect to /dashboard
  };

  useEffect(() => {
    if (projectID && datasetID && tableID) {
      setIsConnected(true);
      localStorage.setItem(
        "projectDetails",
        JSON.stringify({
          projectID: projectID,
          datasetID: datasetID,
          tableID: tableID,
        })
      );
    } else {
      setIsConnected(false); // Disable the button if any field is empty
    }
  }, [projectID, datasetID, tableID]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form>
            <div className="grid items-center w-full gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label className="text-md" htmlFor="project-id">
                  Project ID
                </Label>
                <Input
                  id="project-id"
                  placeholder="Name of your project"
                  value={projectID}
                  onChange={(e) => setProjectID(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-md" htmlFor="dataset-id">
                  Dataset ID
                </Label>
                <Input
                  id="dataset-id"
                  placeholder="Name of your dataset"
                  value={datasetID}
                  onChange={(e) => setDatasetID(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-md" htmlFor="table-id">
                  Table ID
                </Label>
                <Input
                  id="table-id"
                  placeholder="Name of your table"
                  value={tableID}
                  onChange={(e) => setTableID(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={handleConnect}
            disabled={!isConnected} // Button is disabled if isConnected is false
          >
            Connect
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;
