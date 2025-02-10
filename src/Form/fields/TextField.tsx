import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldProps } from "../types";

export const TextField = ({
  field,
  fieldState,
  label,
  required,
}: FieldProps) => (
  <FormItem className="flex flex-col gap-2">
    <FormLabel className="text-base font-bold">
      {label}
      {required && "*"}
    </FormLabel>
    <FormControl>
      <Input placeholder={label} type="text" {...field} />
    </FormControl>
    {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
  </FormItem>
);
