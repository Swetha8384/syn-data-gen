import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const typeOptions = [
  "STRING",
  "BYTES",
  "INTEGER",
  "FLOAT",
  "NUMERIC",
  "BIGNUMERIC",
  "BOOLEAN",
  "TIMESTAMP",
  "DATE",
  "TIME",
  "DATETIME",
  "GEOGRAPHY",
  "RECORD",
  "JSON",
  "RANGE",
];

const DropdownCell = ({ row, column, updateData }) => {
  const [type, setType] = useState("STRING");
  const handleChange = (event) => {
    const newValue = event.target.value;
    updateData(row.index, column.id, newValue);
  };

  return (
    <Select value={type} onValueChange={(value) => setType(value)}>
      <SelectTrigger id="type">
        <SelectValue
          placeholder="STRING" // Placeholder displayed when no value is selected
        />
      </SelectTrigger>
      <SelectContent position="popper">
        {typeOptions.map((each) => (
          <SelectItem key={each} value={each}>
            {each}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DropdownCell;
