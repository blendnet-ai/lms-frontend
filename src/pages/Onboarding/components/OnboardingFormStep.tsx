import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormConfig } from "@/Form/types";
import { useFormConfiguration } from "@/Form/hooks/useFormConfiguration";
import { FormFieldRenderer } from "@/Form/components/FormFieldRenderer";

interface OnboardingFormProps {
  fetchFormData: () => Promise<FormConfig>;
  onSubmit: (data: any) => Promise<void>;
  title?: string;
  description?: string;
}

export const OnboardingFormStep = ({
  fetchFormData,
  onSubmit,
  title = "Onboarding Form",
  description = "Please fill the onboarding form below to continue!",
}: OnboardingFormProps) => {
  const methods = useForm();
  const { formData, isLoading, error, validateForm } = useFormConfiguration({
    fetchFormData,
    form: methods,
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
            <div key={sectionIndex} className="grid grid-cols-2 gap-8">
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
