import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldProps } from "../types";
import { useState } from "react";

export const PhoneField = ({
  field,
  fieldState,
  label,
  required,
}: FieldProps) => {
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = e.target.value.replace(/\D/g, "").slice(0, 10);
    field.onChange(sanitizedValue);

    if (sanitizedValue.length !== 10) {
      setPhoneError("Phone number should be exactly 10 digits");
    } else {
      setPhoneError(null);
    }
  };

  return (
    <FormItem className="flex flex-col gap-2">
      <FormLabel className="text-base font-bold">
        {label}
        {required && "*"}
      </FormLabel>
      <div className="flex gap-2 items-center">
        <Input value="+91" disabled className="w-20" />
        <Input
          type="tel"
          placeholder="Contact phone number"
          {...field}
          onChange={handleChange}
          className={phoneError || fieldState.error ? "border-red-500" : ""}
        />
      </div>
      {(fieldState.error || phoneError) && (
        <FormMessage>{phoneError || fieldState.error?.message}</FormMessage>
      )}
    </FormItem>
  );
};
