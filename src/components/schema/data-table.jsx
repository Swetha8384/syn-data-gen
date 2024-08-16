import { UserContext } from "@/App";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import API from "../../services/API";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import EditableCell from "./Editable";
import DropdownCell from "./dropdowncell";

export default function DataTable() {
  const {
    schemaData,
    setSchemaData,
    prompt,
    projectID,
    datasetID,
    tableID,
    isEnableGenData,
    setIsEnableGenData,
  } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isInsertLoading, setIsInsertLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [hasIncompleteFields, setHasIncompleteFields] = useState(false);

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
    },

    {
      accessorKey: "Sno",
      header: "Sno",
      cell: ({ row }) => <span>{row.original.Sno}</span>, // Use row.original.Sno for the value
    },
    { accessorKey: "name", header: "Name", cell: EditableCell },
    { accessorKey: "type", header: "Type", cell: DropdownCell },
    { accessorKey: "description", header: "Description", cell: EditableCell },
  ];

  // Check for empty fields whenever schemaData changes
  useEffect(() => {
    const hasEmptyFields = schemaData.some(
      (schema) => !schema.name || !schema.type || !schema.description
    );
    setHasIncompleteFields(hasEmptyFields);
  }, [schemaData]);

  // Handle deleting a row
  const handleDeleteRow = (index) => {
    const updatedData = schemaData.filter((_, i) => i !== index);
    setSchemaData(updatedData);
  };

  // Handle adding a new row
  const handleAddRow = () => {
    setSchemaData((prevData) => {
      const newRow = {
        Sno: prevData.length + 1, // Set Sno for the new row
        name: "",
        type: "",
        description: "",
      };
      console.log(newRow);
      console.log(...prevData, newRow);
      return [...prevData, newRow];
    });
  };
  // Handle API calls based on the button clicked
  const handleClick = async () => {
    setIsLoading(true);
    const apiCall = isEnableGenData ? GenerateDataAPI : GenerateSchemaAPI;

    try {
      await apiCall();
    } finally {
      setIsLoading(false);
    }
  };

  const handleInsert = async () => {
    setIsInsertLoading(true);
    try {
      await InsertSchemaAPI();
    } finally {
      setIsInsertLoading(false);
    }
  };

  // Define the updateData function
  const updateData = (rowIndex, columnId, value) => {
    setSchemaData((old) => {
      const newData = [...old];
      newData[rowIndex][columnId] = value; // Update the specific cell
      return newData; // Return the new data array to trigger re-render
    });
  };

  // API functions
  const GenerateSchemaAPI = async () => {
    const data = {
      prompt: prompt,
      schema_responses: schemaData.map(({ name, type, description }) => ({
        ColumnName: name,
        Type: type,
        Description: description,
      })),
    };

    try {
      const response = await API.post.generateSchema(data);
      const transformedData = response.data.map((item) => ({
        name: item.ColumnName,
        type: item.Type,
        description: item.Description,
      }));
      setSchemaData(transformedData);
      toast.success("Schema Generated Successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const InsertSchemaAPI = async () => {
    const data = {
      project_id: projectID,
      dataset_id: datasetID,
      table_id: tableID,
      json_data: schemaData.map(({ name, type, description }) => ({
        ColumnName: name,
        Type: type,
        Description: description,
      })),
    };

    try {
      const response = await API.post.insertSchema(data);
      toast(response.data.message);
      setIsEnableGenData(true);
    } catch (error) {
      console.error(error);
      toast("An error occurred while inserting the schema.");
    }
  };

  const GenerateDataAPI = async () => {
    const data = {
      prompt: prompt,
      schema_responses: schemaData.map(({ name, type, description }) => ({
        ColumnName: name,
        Type: type,
        Description: description,
      })),
    };

    try {
      const response = await API.post.generateSchemaData(data);
      setSchemaData(response.data);
      toast(response.data.message);
      setIsDataLoaded(true);
    } catch (error) {
      console.error(error);
      toast("An error occurred while generating data for schema.");
    }
  };

  const table = useReactTable({
    data: schemaData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData, // Pass the updateData function here
    },
  });

  const anyRowSelected = table.getSelectedRowModel().rows;

  return (
    <div className="p-2 mx-auto overflow-x-auto rounded-md">
      <div className="my-2 overflow-x-auto overflow-y-auto border">
        <table className="w-full overflow-y-auto text-left border border-gray-300">
          <thead>
            <tr className="border-b border-gray-300">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-md capitalize px-3.5 py-2 border-r border-gray-300 sticky"
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getCanResize() && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={`resizer ${
                            header.column.getIsResizing() ? "isResizing" : ""
                          }`}
                        />
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </tr>
          </thead>

          <tbody>
            {schemaData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-3 text-center">
                  No Rows Added
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b border-gray-300">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="capitalize px-3.5 py-2 border-r border-gray-300"
                    >
                      <div
                        className="max-w-xs truncate"
                        title={cell.getValue()}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-row justify-end mt-5 space-x-3">
        {anyRowSelected.length > 0 && (
          <Button
            variant="destructive"
            onClick={() => {
              /* Your logic here */
            }}
          >
            Delete
          </Button>
        )}

        {schemaData.length > 0 && !isEnableGenData ? (
          <>
            {hasIncompleteFields ? (
              <Button disabled={isLoading} onClick={handleClick}>
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Generate Schema
              </Button>
            ) : (
              <Button disabled={isInsertLoading} onClick={handleInsert}>
                {isInsertLoading && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Insert Schema
              </Button>
            )}
          </>
        ) : (
          isEnableGenData &&
          (isDataLoaded ? (
            <></> // or <></> if you prefer to return an empty fragment
          ) : (
            <Button disabled={isLoading} onClick={handleClick}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Generate Data
            </Button>
          ))
        )}

        {/* <Button onClick={handleAddRow} className="mb-4">
          Add Row
        </Button> */}
      </div>
    </div>
  );
}
