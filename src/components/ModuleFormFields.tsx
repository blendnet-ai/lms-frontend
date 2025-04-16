import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

interface ModuleFormFieldsProps {
  initialTitle?: string;
  initialOrder?: number;
  onFieldChange: (field: string, value: string | number) => void;
  showError: boolean;
}

const ModuleFormFields = ({
  initialTitle,
  initialOrder,
  onFieldChange,
  showError,
}: ModuleFormFieldsProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [order, setOrder] = useState(initialOrder);

  useEffect(() => {
    setTitle(initialTitle);
    setOrder(initialOrder);
  }, [initialTitle, initialOrder]);

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
      <div className="grid grid-cols-6 gap-4 align-top">
        <div className="flex flex-col col-span-1">
          <div className="grid w-full items-center gap-1.5">
            <Label>Order*</Label>
            <Input
              type="number"
              placeholder="1"
              min={1}
              value={order}
              onChange={(e) =>
                handleFieldChange(
                  Number(e.target.value),
                  setOrder,
                  "order_in_course"
                )
              }
            />
          </div>
        </div>
        <div className="flex flex-col col-span-5">
          <div className="grid w-full items-center gap-1.5">
            <Label>Title*</Label>
            <Input
              placeholder=""
              value={title}
              onChange={(e) =>
                handleFieldChange(e.target.value, setTitle, "title")
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ModuleFormFields;
