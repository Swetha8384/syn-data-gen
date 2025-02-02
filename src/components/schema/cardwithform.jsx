import { UserContext } from "@/layout/Layout";
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

function CardWithForm() {
  const { schemaData, setSchemaData } = useContext(UserContext);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const AddSchema = () => {
    if (name && type) {
      const newField = { name, type, description };
      setSchemaData((prevSchemaData) => {
        const updatedFields = prevSchemaData.filter(
          (field) => field.name !== name
        );
        updatedFields.push(newField);
        return updatedFields;
      });

      // Clear the input fields after adding
      setName("");
      setType("");
      setDescription("");
    }
  };

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-row items-start w-full gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label className="mb-2" htmlFor="name">
                  Name<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Name of your project"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="mb-2" htmlFor="type">
                  Type<span className="text-red-500">*</span>
                </Label>
                <Select
                  value={type}
                  onValueChange={(value) => setType(value)}
                  required
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="String">String</SelectItem>
                    <SelectItem value="Int">Int</SelectItem>
                    <SelectItem value="Float">Float</SelectItem>
                    <SelectItem value="Double">Double</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-row items-start w-full gap-4 mt-3">
              <div className="flex flex-col w-full space-y-1.5">
                <Label className="mb-2" htmlFor="description">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Type your message here."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end">
              {" "}
              <Button className="mt-5 w-min" onClick={() => AddSchema()}>
                Add
              </Button>
            </div>
          </form>
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export default CardWithForm;
