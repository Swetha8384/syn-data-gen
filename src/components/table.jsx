import { useEffect, useState } from "react";
import { columns } from "./columns";
import DataTable from "./schema/data-table";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

function Table({ isLoading, setIsLoading }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getData();
      setData(result);
      setIsLoading(false);
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount.
  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}

export default Table;
