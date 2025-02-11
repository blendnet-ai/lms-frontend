import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NumberFieldProps } from "../types";
import { useState } from "react";

export const NumberField = ({
  field,
  fieldState,
  label,
  required,
  validation,
}: NumberFieldProps) => {
  const [numberError, setNumberError] = useState<string | null>(null);

  const validateNumber = (value: number): boolean => {
    if (!validation) return true;

    let isValid = true;
    let errorMessage = "";

    if (validation.min !== undefined && value < validation.min) {
      isValid = false;
      errorMessage = `Value must be at least ${validation.min}`;
    }

    if (validation.max !== undefined && value > validation.max) {
      isValid = false;
      errorMessage = `Value must not exceed ${validation.max}`;
    }

    setNumberError(isValid ? null : errorMessage);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    field.onChange(newValue);

    if (validation && newValue) {
      validateNumber(Number(newValue));
    }
  };

  // Format the value to display as locale string if it's a valid number
  const formatDisplayValue = (value: string) => {
    const num = Number(value);
    return !isNaN(num) ? num.toLocaleString() : value;
  };

  return (
    <FormItem className="flex flex-col gap-2">
      <FormLabel className="text-base font-bold">
        {label}
        {required && "*"}
      </FormLabel>
      <FormControl>
        <Input
          type="number"
          {...field}
          min={validation?.min}
          max={validation?.max}
          onChange={handleChange}
          className={numberError || fieldState.error ? "border-red-500" : ""}
          placeholder={
            validation
              ? `Enter a number ${
                  validation.min !== undefined ? `(min: ${validation.min})` : ""
                } ${
                  validation.max !== undefined ? `(max: ${validation.max})` : ""
                }`
              : label
          }
        />
      </FormControl>
      {(fieldState.error || numberError) && (
        <FormMessage>{numberError || fieldState.error?.message}</FormMessage>
      )}
      {field.value && !numberError && !fieldState.error && (
        <div className="text-sm text-gray-500">
          {formatDisplayValue(field.value)}
        </div>
      )}
    </FormItem>
  );
};
