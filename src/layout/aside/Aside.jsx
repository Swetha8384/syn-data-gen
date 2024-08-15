import CardWithForm from "@/components/schema/cardwithform";
import { useTheme } from "@/components/theme-provider";
// import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp, Settings } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Layout";
// eslint-disable-next-line no-unused-vars

/**
 * Function to create an aside component which will expand or collapse based on the value of `params.expanded`.
 *
 * @param {Object} params - An object containing parameters.
 * @param {boolean} params.expanded - A boolean indicating whether the aside component is expanded.
 * @param {function} params.setExpanded - A function to set the expanded state of the aside component.
 * @returns {ReactElement} Returns a React element representing the aside component.
 * * @example
 * //Render a button with the text "Click Me"
 * <Aside expanded={true} setExpanded={()=>{}} />
 *
 */
function Aside({ expanded, setExpanded }) {
  const [currentLink, setCurrentLink] = useState("dashboard");
  const { setTheme, theme } = useTheme();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
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

  const handleChange = (e) => {
    console.log(e.target.value, "Aside");
    setPrompt(e.target.value); // Update the prompt in context
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-10 hidden transition-all duration-300 sm:flex flex-col border-r bg-background overflow-auto ${
        expanded ? "w-1/4" : "w-14"
      }`}
    >
      <nav className="flex flex-col items-start gap-4 px-5 sm:py-5">
        <div
          href="#"
          className={`group flex h-9 w-full shrink-0 items-center  justify-center gap-2 rounded-full bg-transparent text-lg font-semibold  md:h-8 md:w-8 md:text-base ${
            expanded ? "justify-start" : "justify-center"
          }`}
        >
          {theme == "dark" ? (
            <img
              src={"./labs_for_dark.png"}
              alt="Miracle labs logo"
              className="h-8 ml-20 transition-all group-hover:rotate-12 aspect-square"
            />
          ) : (
            <img
              src={"./labs_symbol.png"}
              alt="Miracle labs logo"
              className="h-8 transition-all group-hover:rotate-12 aspect-square"
            />
          )}
          <span className={expanded ? " text-nowrap" : "sr-only "}>
            Miracle Labs
          </span>
        </div>
        <div className="flex justify-start">
          <Label className="text-xl text-left" htmlFor="prompt">
            Prompt
          </Label>
        </div>
        <Separator className="bg-blue-300" />

        <div className="grid w-full gap-1.5">
          <Label className="text-md" htmlFor="message">
            Enter Your Prompt
          </Label>
          <Textarea
            value={prompt}
            className=""
            placeholder="Type your prompt here."
            id="message"
            onChange={handleChange}
          />
        </div>

        {/* Second Layout */}

        <Collapsible
          open={isOpenConfig}
          onOpenChange={setIsOpenConfig}
          className="w-full space-y-1"
        >
          <div className="flex items-center justify-between space-x-2">
            <div className="flex justify-start">
              <Label className="text-xl text-left" htmlFor="Configuarations">
                BigQuery Configuarations
              </Label>
            </div>

            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 w-9">
                {!isOpenConfig ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          {isOpenConfig && <Separator className="mx-1 bg-blue-300" />}
          <CollapsibleContent className="mx-2 space-y-2">
            <div className="grid w-full gap-1.5 my-5">
              <Label className="text-md" htmlFor="message">
                Project ID
              </Label>
              <Input
                value={projectID}
                onChange={(e) => setProjectID(e.target.value)}
              />
            </div>
            <div className="grid w-full gap-1.5 my-5">
              <Label className="text-md" htmlFor="message">
                Dataset ID
              </Label>
              <Input
                value={datasetID}
                onChange={(e) => setDatasetID(e.target.value)}
              />
            </div>
            <div className="grid w-full gap-1.5 my-5">
              <Label className="text-md" htmlFor="message">
                Table ID
              </Label>
              <Input
                value={tableID}
                onChange={(e) => setTableID(e.target.value)}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Third Layout */}

        <Collapsible
          open={isSchemaOpen}
          onOpenChange={setIsSchemaOpen}
          className="w-full"
        >
          <div className="flex items-center justify-between space-x-2">
            <div className="flex justify-start">
              <Label className="text-xl text-left" htmlFor="Configuarations">
                Upload Schema Guidelines
              </Label>
            </div>

            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 w-9">
                {!isSchemaOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          {isSchemaOpen && <Separator className="mx-1 mt-1 bg-blue-300" />}
          <CollapsibleContent className="">
            <CardWithForm />
          </CollapsibleContent>
        </Collapsible>

        {/* <TooltipProvider>
<Tooltip>
<TooltipTrigger asChild>
<div
href="#"
onClick={() => {
  setCurrentLink("dashboard");
  navigate("/");
}}
className={`flex h-9 w-full  items-center  ${
  expanded ? " justify-start " : " justify-center "
} ${
  currentLink == "dashboard"
    ? " text-foreground"
    : "text-muted-foreground"
} rounded-lg  cursor-pointer transition-colors hover:text-foreground md:h-8 gap-2`}
>
{expanded ? (
  <div className="flex items-center justify-start w-full gap-2 leading-none">
    <Home className="w-5 h-5" />
    <span>Dashboard</span>
  </div>
) : (
  <>
    <Home className="w-5 h-5" />
    <span className="sr-only">Dashboard</span>
  </>
)}
</div>
</TooltipTrigger>

<TooltipContent side="right">Dashboard</TooltipContent>
</Tooltip>
</TooltipProvider>
<TooltipProvider>
<Tooltip>
<TooltipTrigger asChild>
<div
href="#"
onClick={() => {
  setCurrentLink("otherPart");
  navigate("/other");
}}
className={`flex h-9 w-full  items-center  ${
  expanded ? "justify-start" : "justify-center"
} ${
  currentLink == "otherPart"
    ? " text-foreground"
    : "text-muted-foreground"
} rounded-lg cursor-pointer transition-colors hover:text-foreground md:h-8 gap-2`}
>
{expanded ? (
  <div className="flex items-center justify-start w-full gap-2 leading-none">
    <SquarePlus className="w-5 h-5" />
    <span>Other part</span>
  </div>
) : (
  <>
    <SquarePlus className="w-5 h-5" />
    <span className="sr-only">Other part</span>
  </>
)}
</div>
</TooltipTrigger>

<TooltipContent side="right">Other part</TooltipContent>
</Tooltip>
</TooltipProvider> */}
      </nav>
      <nav className="flex flex-col items-center gap-4 px-2 mx-3 mt-auto sm:py-5">
        {/* <TooltipProvider>
<Tooltip>
<TooltipTrigger asChild>
<div
href="#"
onClick={() => {
  setExpanded(!expanded);
}}
className={`flex h-9 group w-full  items-center  ${
  expanded ? "justify-start" : "justify-center"
} rounded-lg  cursor-pointer text-muted-foreground transition-colors hover:text-foreground md:h-8 gap-2`}
>
<div
  className={`flex w-full items-center justify-start gap-5 leading-none ${
    !expanded && " justify-center"
  }`}
>
  <ArrowLeftFromLine
    className={`h-5 w-5 transition-all ${
      expanded
        ? "rotate-180 group-hover:rotate-0"
        : "group-hover:rotate-180"
    }`}
  />
  <span className={`${!expanded ? "sr-only" : "not-sr-only"}`}>
    {expanded ? "collapse" : "expand"}
  </span>
</div>
</div>
</TooltipTrigger>
{expanded ? (
<TooltipContent side="right">Collapse</TooltipContent>
) : (
<TooltipContent side="right">Expand</TooltipContent>
)}
</Tooltip>
</TooltipProvider> */}
        <Dialog>
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
        </Dialog>
      </nav>
    </aside>
  );
}

export default Aside;
