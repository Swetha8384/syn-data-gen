import { useTheme } from "@/components/theme-provider";

function Header() {
  const { theme } = useTheme();
  return (
    <div className="w-full h-16 bg-gray-100 shadow-md">
      <div className="container flex items-center justify-center h-full mx-auto">
        <h1 className="text-3xl">Schema Generator</h1>
        {/* Add more elements like navigation, user profile, etc. */}
      </div>
    </div>
  );
}

export default Header;
