import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DateFieldProps } from "../types";
import { useState } from "react";

export const DateField = ({
  field,
  fieldState,
  label,
  required,
  ageValidation,
}: DateFieldProps) => {
  const [dateError, setDateError] = useState<string | null>(null);

  const validateAge = (date: string): boolean => {
    if (!date || !ageValidation) return true;

    const inputDate = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - inputDate.getFullYear();
    const m = today.getMonth() - inputDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < inputDate.getDate())) {
      age--;
    }

    let isValid = true;
    let errorMessage = "";

    if (ageValidation.minAge !== undefined && age < ageValidation.minAge) {
      isValid = false;
      errorMessage = `Minimum age is ${ageValidation.minAge} years`;
    }

    if (ageValidation.maxAge !== undefined && age > ageValidation.maxAge) {
      isValid = false;
      errorMessage = `Maximum age is ${ageValidation.maxAge} years`;
    }

    setDateError(isValid ? null : errorMessage);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    field.onChange(newValue);

    if (ageValidation) {
      validateAge(newValue);
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
          type="date"
          {...field}
          onChange={handleChange}
          className={dateError ? "border-red-500" : ""}
        />
      </FormControl>
      {(fieldState.error || dateError) && (
        <FormMessage>{dateError || fieldState.error?.message}</FormMessage>
      )}
    </FormItem>
  );
};
