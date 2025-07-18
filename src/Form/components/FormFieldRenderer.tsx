import { Controller } from "react-hook-form";
import { FormField } from "../types";
import { TextField } from "../fields/TextField";
import { DateField } from "../fields/DateField";
import { PhoneField } from "../fields/PhoneField";
import { SelectField } from "../fields/SelectField";
import { AadhaarField } from "../fields/AadhaarField";
import { NumberField } from "../fields/NumberField";
import { RadioField } from "../fields/RadioField";
import { StarRatingField } from "../fields/StarRatingField";

interface FormFieldRendererProps {
  field: FormField;
  control: any;
}

export const FormFieldRenderer = ({
  field,
  control,
}: FormFieldRendererProps) => {
  const renderField = (fieldProps: any) => {
    switch (field.type) {
      case "text":
        return <TextField {...fieldProps} />;
      case "date":
        const ageValidation =
          field.minAge !== undefined || field.maxAge !== undefined
            ? {
                minAge: field.minAge,
                maxAge: field.maxAge,
              }
            : undefined;

        return <DateField {...fieldProps} ageValidation={ageValidation} />;
      case "phone":
        return <PhoneField {...fieldProps} />;
      case "select":
        return <SelectField {...fieldProps} options={field.options || []} />;
      case "number-adhaar":
        return <AadhaarField {...fieldProps} />;
      case "number":
        const numberValidation =
          field.min !== undefined || field.max !== undefined
            ? {
                min: field.min,
                max: field.max,
              }
            : undefined;

        return <NumberField {...fieldProps} validation={numberValidation} />;
      case "radio":
        return <RadioField {...fieldProps} options={field.options || []} />;
      case "star-rating":
        return (
          <StarRatingField {...fieldProps} options={field.options || []} />
        );
      default:
        return <div />;
    }
  };

  return (
    <Controller
      name={field.name}
      control={control}
      rules={{
        required: field.required
          ? field.type === "radio"
            ? `${field.label} is required*`
            : field.type === "star-rating"
            ? "Please select a rating*"
            : "This field is required*"
          : false,
        validate: field.validate,
      }}
      render={({ field: controllerField, fieldState }) =>
        renderField({
          field: controllerField,
          fieldState,
          label: field.label,
          required: field.required,
        })
      }
    />
  );
};
