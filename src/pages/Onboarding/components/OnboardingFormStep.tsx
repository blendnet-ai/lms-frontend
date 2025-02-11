import LMSAPI from "@/apis/LmsAPI";
import Form from "@/Form/Form";

export const OnboardingFormStep = ({
  onComplete,
}: {
  onComplete: () => void;
}) => {
  const fetchFormData = async () => {
    const response = await LMSAPI.getOnboardingForm();
    return response.data;
  };

  const handleSubmit = async (transformedData: any) => {
    try {
      const resp = await LMSAPI.submitOnboardingForm({
        sections: transformedData,
      });

      if (resp) {
        onComplete();
      }
    } catch (error) {
      console.error("Error submitting onboarding form", error);
    }
  };
  return (
    <Form
      fetchFormData={fetchFormData}
      onSubmit={handleSubmit}
      title="Onboarding Form"
      description="Please fill the onboarding form below to continue!"
    />
  );
};
