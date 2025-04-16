import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

interface CourseFormFieldsProps {
  initialTitle?: string;
  initialCode?: string;
  initialDuration?: number;
  initialDescription?: string;
  onFieldChange: (field: string, value: string | number) => void;
  showError: boolean;
  codeError: string;
}

const CourseFormFields = ({
  initialTitle = "",
  initialCode = "",
  initialDuration = 1,
  initialDescription = "",
  onFieldChange,
  showError,
  codeError,
}: CourseFormFieldsProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [code, setCode] = useState(initialCode);
  const [duration, setDuration] = useState(initialDuration);
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    setTitle(initialTitle);
    setCode(initialCode);
    setDuration(initialDuration);
    setDescription(initialDescription);
  }, [initialTitle, initialCode, initialDuration, initialDescription]);

  const handleFieldChange = (
    value: string | number,
    setter: (value: any) => void,
    fieldName: string
  ) => {
    setter(value);
    onFieldChange(fieldName, value);
  };

  return (
    <>
      {showError && (
        <p className="text-red-500 text-sm">
          Please fill in all required fields marked with *
        </p>
      )}
      <div className="grid w-full items-center gap-1.5">
        <Label>Title*</Label>
        <Input
          placeholder=""
          value={title}
          onChange={(e) => handleFieldChange(e.target.value, setTitle, "title")}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 align-top">
        <div className="flex flex-col">
          <div className="grid w-full items-center gap-1.5">
            <Label>Course Code*</Label>
            <Input
              placeholder="SQL-1"
              value={code}
              onChange={(e) =>
                handleFieldChange(e.target.value, setCode, "code")
              }
            />
          </div>
          <p className="text-red-500 text-sm h-5">{codeError || " "}</p>
        </div>
        <div className="flex flex-col">
          <div className="grid w-full items-center gap-1.5">
            <Label>Course Duration (in hr.)*</Label>
            <Input
              type="number"
              id="duration"
              placeholder=""
              min={1}
              value={duration}
              onChange={(e) =>
                handleFieldChange(
                  Number(e.target.value),
                  setDuration,
                  "duration"
                )
              }
            />
          </div>
          <p className="text-red-500 text-sm h-5">&nbsp;</p>
        </div>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>Description</Label>
        <Textarea
          placeholder=""
          value={description}
          onChange={(e) =>
            handleFieldChange(e.target.value, setDescription, "description")
          }
        />
      </div>
    </>
  );
};

export default CourseFormFields;
