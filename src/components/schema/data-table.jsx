import { UserContext } from "@/layout/Layout";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Loader2, Trash } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import API from "../../services/API";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import EditableCell from "./Editable";

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
  const [hasIncompleteFields, setHasIncompleteFields] = useState(false);

  useEffect(() => {
    // Iterate through schemaData and check if any object has an empty field
    const hasEmptyFields = schemaData.some((schema) => {
      return !schema.name || !schema.type || !schema.description;
    });
    console.log(hasEmptyFields);

    // Set the flag based on the result
    setHasIncompleteFields(hasEmptyFields);
  }, [schemaData]);

  const handleDeleteRow = (index) => {
    const updatedData = schemaData.filter((_, i) => i !== index);
    setSchemaData(updatedData);
  };

  const handleClick = () => {
    console.log("Generate Schema");
    setIsLoading(true);

    const apiCall = isEnableGenData ? GenerateDataAPI : GenerateSchemaAPI;

    apiCall().finally(() => {
      setIsLoading(false);
    });
  };

  const handleInsert = () => {
    setIsInsertLoading(true);

    const apiCall = InsertSchemaAPI;

    apiCall().finally(() => {
      setIsInsertLoading(false);
    });
  };

  const Data = schemaData.map((schema) => {
    return {
      ColumnName: schema.name,
      Type: schema.type,
      Description: schema.description,
    };
  });

  const GenerateSchemaAPI = async () => {
    console.log("GenerateSchemaAPI");
    let data = {
      prompt: prompt,
      schema_responses: Data,
    };
    console.log(data, "------------");
    return API.post
      .generateSchema(data)
      .then((response) => {
        const transformedData = response.data.map((item) => ({
          name: item.ColumnName,
          type: item.Type,
          description: item.Description,
        }));
        setSchemaData(transformedData);
        toast("Schema Generated Successfully", {
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const InsertSchemaAPI = async () => {
    let data = {
      project_id: projectID,
      dataset_id: datasetID,
      table_id: tableID,
      json_data: [
        schemaData.map((schema) => {
          return {
            ColumnName: schema.name,
            Type: schema.type,
            Description: schema.description,
          };
        }),
      ],
    };
    return API.post
      .insertSchema(data)
      .then((response) => {
        toast(response.data.message, {
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        });
        setIsEnableGenData(true);
      })
      .catch((error) => {
        console.error(error);
        toast("An error occurred while inserting the schema.");
      });
  };

  const GenerateDataAPI = async () => {
    let data = {
      prompt: prompt,
      schema_responses: [
        schemaData.map((schema) => {
          return {
            ColumnName: schema.name,
            Type: schema.type,
            Description: schema.description,
          };
        }),
      ],
    };
    return API.post
      .generateSchemaData(data)
      .then((response) => {
        setSchemaData(response.data);
        toast(response.data.message, {
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        });
        setIsEnableGenData(false);
      })
      .catch((error) => {
        console.error(error);
        toast("An error occurred while generating data for schema.");
      });
  };

  // Dynamically generate columns based on schemaData keys
  const dynamicColumns =
    schemaData.length > 0
      ? Object.keys(schemaData[0]).map((key) => ({
          accessorKey: key,
          header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the header
          cell: EditableCell,
        }))
      : [];

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
      cell: (props) => <span>{props.row.index + 1}</span>,
    },
    ...dynamicColumns, // Spread the dynamically generated columns here
    {
      id: "actions",
      header: "Actions",
      cell: (props) => (
        <Button
          variant="outline"
          onClick={() => handleDeleteRow(props.row.index)}
          className="justify-center text-red-500"
        >
          <Trash className="w-4 h-4 opacity-50" />
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: schemaData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const anyRowSelected = table.getSelectedRowModel().rows;

  return (
    <div className="p-2 mx-auto overflow-x-auto rounded-md">
      <div className="overflow-x-auto max-h-96">
        {" "}
        {/* Adjust max-h-96 as per your needs */}
        <table className="min-w-full border border-gray-300">
          {schemaData.length > 0 && (
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-gray-300">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-md capitalize px-3.5 py-2 border-r border-gray-300"
                      style={{ width: header.getSize() || "auto" }}
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
            </thead>
          )}

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-300">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="capitalize px-3.5 py-2 border-r border-gray-300"
                  >
                    <div className="max-w-xs truncate" title={cell.getValue()}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-row justify-end mt-2 space-x-3">
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
        {schemaData.length > 0 && (
          <>
            {!isEnableGenData && (
              <Button onClick={handleInsert}>Insert Schema</Button>
            )}

            <Button disabled={isLoading} onClick={handleClick}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isEnableGenData ? "Generate Data" : "Generate Schema"}
            </Button>
          </>
        )}
        {/* {schemaData.length > 0 && (
          <>
            {!hasIncompleteFields ? (
              <Button disabled={isInsertLoading} onClick={handleInsert}>
                {isInsertLoading && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Insert Schema
              </Button>
            ) : (
              <Button disabled={isLoading} onClick={handleClick}>
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isEnableGenData ? "Generate Data" : "Generate Schema"}
              </Button>
            )}
          </>
        )} */}
      </div>
    </div>
  );
}
