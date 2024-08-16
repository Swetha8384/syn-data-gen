import { UserContext } from "@/App";
import { useTheme } from "@/components/theme-provider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useContext } from "react";
import fordLogo from "../../assets/ford.svg";

function Header() {
  const { isEnableGenData } = useContext(UserContext);
  const { theme } = useTheme();
  return (
    <div className="w-full h-16 bg-gray-100 shadow-md">
      <div className="flex items-center justify-between h-full">
        {/* Left-aligned text */}
        <div className="flex justify-start flex-1 ml-5">
          <Sheet>
            <SheetTrigger asChild>
              <Menu />
            </SheetTrigger>
            <SheetContent side="left">
              {/* <SheetHeader>
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
              </SheetFooter> */}
            </SheetContent>
          </Sheet>
        </div>

        {/* Centered text */}
        <div className="flex justify-center flex-1">
          <h1 className="text-3xl">Synthetic Data Generator</h1>
        </div>

        {/* Right-aligned logo */}
        <div className="flex justify-end flex-1">
          <img src={fordLogo} alt="Logo" className="w-24 h-24" />
        </div>
      </div>
    </div>
  );
}

export default Header;
