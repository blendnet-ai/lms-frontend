import { FormProvider, useForm } from "react-hook-form";
import { useFormConfiguration } from "./hooks/useFormConfiguration";
import { FormConfig } from "./types";
import { FormFieldRenderer } from "./components/FormFieldRenderer";
import { Button } from "@/components/ui/button";
import { useCallback } from "react"; // Add this import

interface FormProps {
  fetchFormData?: () => Promise<FormConfig>;
  form?: FormConfig;
  onSubmit: (data: any) => Promise<void>;
  title?: string;
  description?: string;
  formLayoutStyles?: string;
}

const Form = ({
  fetchFormData,
  form,
  onSubmit,
  title = "Form",
  description = "Please fill the form below to continue!",
  formLayoutStyles = "grid grid-cols-2 gap-8",
}: FormProps) => {
  const methods = useForm();

  const memoizedFetchFormData = useCallback(
    async () => (form ? { sections: [] } : await fetchFormData!()),
    [form, fetchFormData]
  );

  if (!form && !fetchFormData) {
    return (
      <div className="text-red-500">
        Either form data or fetchFormData function must be provided
      </div>
    );
  }

  const { formData, isLoading, error, validateForm } = useFormConfiguration({
    fetchFormData: memoizedFetchFormData,
    form: methods,
    initialFormData: form,
  });

  const transformSubmissionData = (values: Record<string, any>) => {
    return formData.sections.map((section) => ({
      ...section,
      fields: section.fields.map((field) => ({
        ...field,
        value: values[field.name],
      })),
    }));
  };

  const handleSubmit = async (data: any) => {
    if (validateForm()) {
      const submissionData = transformSubmissionData(data);
      await onSubmit(submissionData);
    }
  };

  if (isLoading) {
    return <div>Loading form...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!formData) {
    return <div className="text-red-500">No form data available</div>;
  }

  return (
    <div className="flex flex-col w-full h-full p-8 pt-4">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-base mb-4">{description}</p>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4 p-4 w-full h-full"
        >
          {formData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className={formLayoutStyles}>
              {section.fields.map((field, fieldIndex) => (
                <FormFieldRenderer
                  key={`${sectionIndex}-${fieldIndex}`}
                  field={field}
                  control={methods.control}
                />
              ))}
            </div>
          ))}
          <Button type="submit" className="self-start px-5 py-2.5 mt-5">
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Form;
