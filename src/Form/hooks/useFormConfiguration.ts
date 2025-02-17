import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormConfig } from "../types";

interface UseFormConfigurationProps {
  fetchFormData: () => Promise<FormConfig>;
  form: UseFormReturn<any>;
  initialFormData?: FormConfig;
}

export const useFormConfiguration = ({
  fetchFormData,
  form,
  initialFormData,
}: UseFormConfigurationProps) => {
  const [formData, setFormData] = useState<FormConfig>(
    initialFormData || { sections: [] }
  );
  const [isLoading, setIsLoading] = useState(!initialFormData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialFormData) return;

    const loadFormData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchFormData();
        setFormData(data);
        setError(null);
      } catch (err) {
        setError("Failed to load form configuration");
        console.error("Failed to fetch form data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFormData();
  }, [fetchFormData, initialFormData]);

  const validateForm = () => {
    const values = form.getValues();
    let hasError = false;

    formData.sections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.validate) {
          const isValid = field.validate(values[field.name]);
          if (isValid !== true) {
            form.setError(field.name, {
              type: "custom",
              message:
                typeof isValid === "string"
                  ? isValid
                  : `Invalid ${field.label}`,
            });
            hasError = true;
          }
        }
      });
    });

    return !hasError;
  };

  return {
    formData,
    isLoading,
    error,
    validateForm,
  };
};
