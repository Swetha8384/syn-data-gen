import { useEffect, useState } from "react";
import { Input } from "../ui/input";

const EditableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  // Sync local state with the external initialValue when it changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    // Update the table data directly when value changes
    table.options.meta?.updateData(row.index, column.id, newValue);
  };

  return (
    <Input
      value={value}
      onChange={onChange} // Use the updated onChange function
      variant="filled"
      size="sm"
      w="85%"
      overflow="hidden"
    />
  );
};

export default EditableCell;
