import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FieldProps } from "../types";

interface RadioFieldProps extends FieldProps {
  options: string[];
}

export const RadioField = ({
  field,
  fieldState,
  label,
  required,
  options,
}: RadioFieldProps) => {
  return (
    <FormItem className="flex items-start gap-8 w-full">
      <div className="flex-1">
        <FormLabel className="text-base font-medium text-gray-800">
          {label}
          {required && "*"}
        </FormLabel>
      </div>

      <div className="flex-1">
        <FormControl>
          <RadioGroup
            onValueChange={field.onChange}
            value={field.value}
            className="flex items-center gap-6"
          >
            {options.map((option) => (
              <div key={option} className="flex items-center gap-2">
                <RadioGroupItem value={option} id={`${field.name}-${option}`} />
                <Label
                  htmlFor={`${field.name}-${option}`}
                  className="text-sm font-normal"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </FormControl>
        {fieldState.error && (
          <FormMessage className="mt-1">{fieldState.error.message}</FormMessage>
        )}
      </div>
    </FormItem>
  );
};
