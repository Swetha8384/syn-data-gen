import CardWithForm from "@/components/schema/cardwithform";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useContext, useState } from "react";
import { UserContext } from "../Layout";

function LeftPanel() {
  const [isOpenConfig, setIsOpenConfig] = useState(false);
  const [isSchemaOpen, setIsSchemaOpen] = useState(false);
  const {
    prompt,
    setPrompt,
    projectID,
    setProjectID,
    datasetID,
    setDatasetID,
    tableID,
    setTableID,
  } = useContext(UserContext);

  const handleChange = (e) => setPrompt(e.target.value);

  return (
    <div className="flex flex-col w-full space-y-4">
      {/* Prompt Section */}
      <div className="h-full">
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
      </div>

      {/* BigQuery Configurations Section */}
      <CollapsibleSection
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
      </CollapsibleSection>

      {/* Schema Guidelines Section */}
      <CollapsibleSection
        isOpen={isSchemaOpen}
        setIsOpen={setIsSchemaOpen}
        title="Upload Schema Guidelines"
      >
        <CardWithForm />
      </CollapsibleSection>
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
