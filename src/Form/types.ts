import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";

export interface FieldProps {
  field: ControllerRenderProps<any, any>;
  fieldState: ControllerFieldState;
  label: string;
  required?: boolean;
}

export interface FormField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
  min?: number;
  max?: number;
  validate?: (value: any) => boolean | string;
  minAge?: number;
  maxAge?: number;
}

export interface FormSection {
  title?: string;
  fields: FormField[];
}

export interface FormConfig {
  sections: FormSection[];
}

export interface AgeValidationConfig {
  minAge?: number;
  maxAge?: number;
}

export interface DateFieldProps extends FieldProps {
  ageValidation?: AgeValidationConfig;
}
