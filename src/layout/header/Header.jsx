import { useTheme } from "@/components/theme-provider";
import fordLogo from "../../assets/ford.svg";

function Header() {
  const { theme } = useTheme();
  return (
    <div className="w-full h-16 bg-gray-100 shadow-md">
      <div className="container flex justify-between h-full">
        <h1 className="text-xl font-semibold">Schema Generator</h1>
        <img src={fordLogo} alt="Logo" className="w-30 h-30" />
      </div>
    </div>
  );
}

export default Header;
