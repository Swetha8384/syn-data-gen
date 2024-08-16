import { UserContext } from "@/App";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import API from "@/services/API";
import { ChevronDown, ChevronUp, FilePenIcon, TrashIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";

function LeftPanel() {
  const { setPrompt } = useContext(UserContext);
  const [projectId, setProjectId] = useState("");
  const [datasetId, setDatasetId] = useState("");
  const [tableList, setTablesList] = useState([]);

  const projectDetails = JSON.parse(localStorage.getItem("projectDetails"));
  const projectID = projectDetails.projectID;
  const datasetID = projectDetails.datasetID;
  const tableID = projectDetails.tableID;

  const handleChange = (e) => setPrompt(e.target.value);

  useEffect(() => {
    let data = {
      project_id: projectID,
      dataset_id: datasetID,
    };
    API.post
      .retrieveTablesList(data)
      .then((res) => {
        console.log(res.data);
        setProjectId(res.data.project);
        setDatasetId(res.data.children[0].dataset);
        setTablesList(res.data.children[0].children);
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, []);

  return (
    <div className="flex flex-col w-full space-y-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="flex items-start justify-between">
          <div className="grid gap-1">
            <CardTitle>Project and Database Details</CardTitle>
            <CardDescription>
              View and manage your project and database information.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-4 px-6">
            <div className="grid gap-2">
              <Label htmlFor="projectId">Project ID</Label>
              <Input id="projectId" defaultValue={projectId} readOnly />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="databaseId">Database ID</Label>
              <Input id="databaseId" defaultValue={datasetId} readOnly />
            </div>
          </div>
          {/* <Separator /> */}
          <div className="grid gap-1 px-6">
            <CardTitle>Tables</CardTitle>
            <CardDescription>Manage your database tables.</CardDescription>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Table Name</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-y-auto max-h-40">
                {tableList &&
                  tableList.map((tableName) => (
                    <TableRow key={tableName}>
                      <TableCell>{tableName}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="mr-2">
                          <FilePenIcon className="w-4 h-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500"
                        >
                          <TrashIcon className="w-4 h-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Prompt Section */}
      {/* <div className="h-full">
        <Label className="text-xl" htmlFor="prompt">
          Prompt
        </Label>
        <Separator className="my-2 bg-blue-300" />
        <div className="grid gap-1.5">
          <Label className="text-md" htmlFor="message">
            Enter Your Prompt
          </Label>
          <Textarea
            value={prompt}
            placeholder="Type your prompt here."
            id="message"
            onChange={handleChange}
          />
        </div>
      </div> */}

      {/* BigQuery Configurations Section */}
      {/* <CollapsibleSection
        isOpen={isOpenConfig}
        setIsOpen={setIsOpenConfig}
        title="BigQuery Configurations"
      >
        <ConfigInput
          label="Project ID"
          value={projectID}
          onChange={setProjectID}
        />
        <ConfigInput
          label="Dataset ID"
          value={datasetID}
          onChange={setDatasetID}
        />
        <ConfigInput label="Table ID" value={tableID} onChange={setTableID} />
      </CollapsibleSection> */}

      {/* Schema Guidelines Section */}
      {/* <CollapsibleSection
        isOpen={isSchemaOpen}
        setIsOpen={setIsSchemaOpen}
        title="Upload Schema Guidelines"
      >
        <CardWithForm />
      </CollapsibleSection> */}

      {/* <Dialog className="flex items-end justify-end">
        <DialogTrigger asChild>
          <div
            href="#"
            className={`flex h-9 w-full  items-center  ${
              expanded ? "justify-start" : "justify-center"
            } rounded-lg  cursor-pointer text-muted-foreground transition-colors hover:text-foreground md:h-8 gap-2`}
          >
            {expanded ? (
              <div className="flex items-center justify-start w-full gap-5 leading-none">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </div>
            ) : (
              <>
                <Settings className="w-5 h-5" />
                <span className="sr-only">Settings</span>
              </>
            )}
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Toggle Dark Mode{" "}
              <Switch
                checked={theme == "dark"}
                onCheckedChange={(e) => {
                  if (e) {
                    setTheme("dark");
                  } else {
                    setTheme("light");
                  }
                }}
              />
            </DialogTitle>
            <DialogDescription>
              Tap to switch between light and dark themes for enhanced
              visibility in low-light environments.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}

// Collapsible Section Component
function CollapsibleSection({ isOpen, setIsOpen, title, children }) {
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div className="flex items-center justify-between">
        <Label className="text-xl">{title}</Label>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="p-0 w-9">
            {isOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      {isOpen && <Separator className="my-2 bg-blue-300" />}
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}

// Config Input Component
function ConfigInput({ label, value, onChange }) {
  return (
    <div className="grid gap-1.5 my-4">
      <Label className="text-md">{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export default LeftPanel;
