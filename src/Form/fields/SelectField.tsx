import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldProps } from "../types";

interface SelectFieldProps extends FieldProps {
  options: string[];
}

export const SelectField = ({
  field,
  fieldState,
  label,
  required,
  options,
}: SelectFieldProps) => (
  <FormItem className="flex flex-col gap-2">
    <FormLabel className="text-base font-bold">
      {label}
      {required && "*"}
    </FormLabel>
    <Select onValueChange={field.onChange} value={field.value}>
      <SelectTrigger>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
  </FormItem>
);
