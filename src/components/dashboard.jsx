import { UserContext } from "@/layout/Layout";
import { useContext, useState } from "react";
import Table from "./table";
import { useTheme } from "./theme-provider";
import { Separator } from "./ui/separator";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const { setTheme, theme } = useTheme();
  const { isEnableGenData } = useContext(UserContext);
  return (
    <div className="flex flex-col items-center w-full h-full bg-background">
      <div className="flex flex-col items-center w-full mt-5 text-center">
        <h1 className="text-3xl">
          {!isEnableGenData ? "Schema Generator" : "Table Data Generator"}
        </h1>
        <Separator className="mt-2 bg-blue-300 w-[90%]" />
      </div>
      <div className="flex justify-end w-full my-4 mr-28">
        {/* <Button
          onClick={() => {
            setIsLoading(!isLoading);
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Please wait
            </>
          ) : (
            "Generate Schema"
          )}
        </Button> */}
      </div>
      <Table isLoading={isLoading} setIsLoading={setIsLoading} />
    </div>
  );
}
