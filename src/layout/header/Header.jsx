import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import fordLogo from "../../assets/ford.svg";

function Header() {
  const { theme } = useTheme();
  return (
    <div className="w-full h-16 bg-gray-100 shadow-md">
      <div className="flex items-center justify-between h-full">
        {/* Left-aligned text */}
        <div className="flex justify-start flex-1">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">side</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Centered text */}
        <div className="flex justify-center flex-1">
          <h1 className="text-xl font-semibold">Schema Generator</h1>
        </div>

        {/* Right-aligned logo */}
        <div className="flex justify-end flex-1">
          <img src={fordLogo} alt="Logo" className="w-28 h-28" />
        </div>
      </div>
    </div>
  );
}

export default Header;
