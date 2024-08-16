import Table from "@/components/table";
import { useState } from "react";

export default function RightPanel() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col items-center w-full h-full">
      <Table isLoading={isLoading} setIsLoading={setIsLoading} />
    </div>
  );
}
