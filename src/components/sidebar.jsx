import { ChevronsUpDown, Settings } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";

function Sidebar() {
  const { setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-1/4 p-4 bg-gray-100">
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
      <span>Miracle Labs</span>

      <div className="flex justify-start">
        <Label className="text-xl text-left" htmlFor="prompt">
          Prompt
        </Label>
      </div>
      <Separator className="bg-blue-300" />

      <div className="grid w-full gap-1.5 my-5">
        <Label className="text-md" htmlFor="message">
          Enter Your Prompt
        </Label>
        <Textarea
          className=""
          placeholder="Type your prompt here."
          id="message"
        />
      </div>

      {/* Second Layout */}
      <div className="flex justify-start">
        <Label className="text-xl text-left" htmlFor="Configuarations">
          BigQuery Configuarations
        </Label>
      </div>
      <Separator className="mb-5 bg-blue-300" />
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full space-y-1"
      >
        <div className="flex items-center justify-between px-2 space-x-2">
          <h4 className="font-semibold text-md">Configurations</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 w-9">
              <ChevronsUpDown className="w-4 h-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="space-y-2">
          <div className="grid w-full gap-1.5 my-5">
            <Label className="text-md" htmlFor="message">
              Project ID
            </Label>
            <Input />
          </div>
          <div className="grid w-full gap-1.5 my-5">
            <Label className="text-md" htmlFor="message">
              Dataset ID
            </Label>
            <Input />
          </div>
          <div className="grid w-full gap-1.5 my-5">
            <Label className="text-md" htmlFor="message">
              Table ID
            </Label>
            <Input />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Third Layout */}
      <div className="flex justify-start">
        <Label className="text-xl text-left" htmlFor="Configuarations">
          Upload Schema Guidelines
        </Label>
      </div>
      <Separator className="mb-5 bg-blue-300" />
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full space-y-1"
      >
        <div className="flex items-center justify-between px-2 space-x-2">
          <h4 className="font-semibold text-md">Add Field Details</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 w-9">
              <ChevronsUpDown className="w-4 h-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="space-y-2">
          <div className="grid w-full gap-1.5 my-5">
            <Label className="text-md" htmlFor="message">
              Project ID
            </Label>
            <Input />
          </div>
          <div className="grid w-full gap-1.5 my-5">
            <Label className="text-md" htmlFor="message">
              Dataset ID
            </Label>
            <Input />
          </div>
          <div className="grid w-full gap-1.5 my-5">
            <Label className="text-md" htmlFor="message">
              Table ID
            </Label>
            <Input />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Dialog>
        <DialogTrigger asChild>
          <div
            href="#"
            className={`flex h-9 w-full  items-center  ${
              true ? "justify-start" : "justify-center"
            } rounded-lg  cursor-pointer text-muted-foreground transition-colors hover:text-foreground md:h-8 gap-2`}
          >
            {true ? (
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
    </div>
  );
}

export default Sidebar;
