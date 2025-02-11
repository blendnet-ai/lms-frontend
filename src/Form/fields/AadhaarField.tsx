import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldProps } from "../types";
import { useState } from "react";

export const AadhaarField = ({
  field,
  fieldState,
  label,
  required,
}: FieldProps) => {
  const [adhaarError, setAdhaarError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = e.target.value.replace(/\D/g, "").slice(0, 12);
    field.onChange(sanitizedValue);

    if (sanitizedValue.length !== 12) {
      setAdhaarError("Beneficiary ID must be exactly 12 digits long");
    } else {
      setAdhaarError(null);
    }
  };

  return (
    <FormItem className="flex flex-col gap-2">
      <FormLabel className="text-base font-bold">
        {label}
        {required && "*"}
      </FormLabel>
      <FormControl>
        <Input
          type="tel"
          placeholder="Aadhaar number"
          {...field}
          onChange={handleChange}
          className={adhaarError || fieldState.error ? "border-red-500" : ""}
        />
      </FormControl>
      {(fieldState.error || adhaarError) && (
        <FormMessage>{adhaarError || fieldState.error?.message}</FormMessage>
      )}
    </FormItem>
  );
};
