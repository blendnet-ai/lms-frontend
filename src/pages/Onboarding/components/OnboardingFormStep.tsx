import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import LMSAPI from "../../../apis/LmsAPI";
import { OnboardingStepProps } from "../OnboardingLms";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const OnboardingFormStep = (props: OnboardingStepProps) => {
  const [formData, setFormData] = useState<any[]>([]);
  const [adhaarError, setAdhaarError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const methods = useForm();
  const { control, handleSubmit, getValues } = methods;

  const validateAge = (date: string) => {
    const inputDate = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - inputDate.getFullYear();
    const m = today.getMonth() - inputDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < inputDate.getDate())) {
      age--;
    }
    return age >= 18 && age <= 30;
  };

  const onSubmit = async () => {
    const values = getValues();
    let hasError = false;

    // Add age validation in submission
    if (!values.dob) {
      setDateError("Date of birth is required");
      hasError = true;
      console.log("Error in date of birth");
    } else if (!validateAge(values.dob)) {
      setDateError("Age must be between 18 and 30 years");
      hasError = true;
    } else {
      setDateError(null);
    }

    // Check if number-adhaar is exactly 12 digits long
    if (!values.beneficiaryId) {
      setAdhaarError("Beneficiary ID is required");
      hasError = true;
    } else if (values.beneficiaryId.length !== 12) {
      setAdhaarError("Beneficiary ID must be exactly 12 digits long");
      hasError = true;
    } else {
      setAdhaarError(null);
    }

    // Check if phone number is exactly 10 digits long
    if (!values.parentGuardianPhone) {
      setPhoneError("Phone number is required");
      hasError = true;
    } else if (values.parentGuardianPhone.length !== 10) {
      setPhoneError("Phone number should be exactly 10 digits");
      hasError = true;
    } else {
      setPhoneError(null);
    }

    if (hasError) {
      return;
    }

    // Only proceed with submission if there are no errors
    const submissionData = formData.map((section) => ({
      ...section,
      fields: section.fields.map((field: { name: string | number }) => ({
        ...field,
        value: values[field.name],
      })),
    }));

    try {
      const data = await LMSAPI.submitOnboardingForm({
        sections: submissionData,
      });
      if (data) {
        props.completed();
      }
    } catch (error) {
      console.log("Failed to submit form:", error);
    }
  };

  // Fetch form data
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const resp = await LMSAPI.getOnboardingForm();
        const sections = resp?.data?.sections || []; // Safeguard against undefined
        if (Array.isArray(sections)) {
          setFormData(sections);
        } else {
          console.error("Unexpected sections data:", sections);
        }
      } catch (error) {
        console.error("Failed to fetch form data:", error);
      }
    };

    fetchForm();
  }, []);

  return (
    <div className="flex flex-col w-full h-full p-8 pt-4">
      <h1 className="text-2xl font-bold mb-2">Onboarding Form</h1>
      <p className="text-base mb-4">
        Your phone number was successfully verified. Please fill the onboarding
        form below to continue!
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4 w-full h-full"
      >
        <FormProvider {...methods}>
          {formData.map((section: any, sectionIndex: number) => (
            <div key={sectionIndex} className="grid grid-cols-2 gap-8">
              {section.fields.map((field: any, fieldIndex: number) => (
                <Controller
                  key={fieldIndex}
                  name={field.name}
                  control={control}
                  rules={{
                    required: field.required
                      ? `${field.label} is required`
                      : undefined,
                    validate: (value) => {
                      if (
                        field.type === "number" &&
                        field.min &&
                        Number(value) < field.min
                      ) {
                        return `Annual Income must be at least ${field.min}`;
                      }
                      return true;
                    },
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    switch (field.type) {
                      case "text":
                        return (
                          <FormItem className="flex flex-col gap-2">
                            <FormLabel className="text-base font-bold">
                              {field.label}*
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={field.label}
                                type={field.type}
                                value={value}
                                onChange={onChange}
                              />
                            </FormControl>
                            {error && (
                              <FormMessage>{error.message}</FormMessage>
                            )}
                          </FormItem>
                        );

                      case "date":
                        return (
                          <FormItem className="flex flex-col gap-2">
                            <FormLabel className="text-base font-bold">
                              {field.label}*
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={field.label}
                                type={field.type}
                                value={value}
                                className={
                                  !value || validateAge(value)
                                    ? ""
                                    : "border-red-500"
                                }
                                onChange={(e) => {
                                  onChange(e.target.value);
                                  if (!validateAge(e.target.value)) {
                                    setDateError(
                                      "Age must be between 18 and 30 years"
                                    );
                                  } else {
                                    setDateError(null);
                                  }
                                }}
                              />
                            </FormControl>
                            {field.name === "dob" && dateError && (
                              <FormMessage>{dateError}</FormMessage>
                            )}
                            {error && (
                              <FormMessage>{error.message}</FormMessage>
                            )}
                          </FormItem>
                        );

                      case "number":
                        return (
                          <FormItem className="flex flex-col gap-2">
                            <FormLabel className="text-base font-bold">
                              {field.label}*
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder={field.label}
                                min={field.min}
                                max={field.max}
                                value={value}
                                onChange={(e) => {
                                  onChange(e.target.value);
                                }}
                                className={error ? "border-red-500" : ""}
                              />
                            </FormControl>
                            {error && (
                              <FormMessage>{error.message}</FormMessage>
                            )}
                          </FormItem>
                        );

                      case "number-adhaar":
                        return (
                          <FormItem className="flex flex-col gap-2">
                            <FormLabel className="text-base font-bold">
                              {field.label}*
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="Adhaar number"
                                value={value}
                                onChange={(e) => {
                                  const sanitizedValue = e.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 12);
                                  onChange(sanitizedValue);
                                }}
                                className={
                                  error || adhaarError ? "border-red-500" : ""
                                }
                              />
                            </FormControl>
                            {(error || adhaarError) && (
                              <FormMessage>
                                {error ? error.message : adhaarError}
                              </FormMessage>
                            )}
                          </FormItem>
                        );

                      case "phone":
                        return (
                          <FormItem className="flex flex-col gap-2">
                            <FormLabel className="text-base font-bold">
                              {field.label}*
                            </FormLabel>
                            <div className="flex gap-2 items-center">
                              <Input value="+91" disabled className="w-20" />
                              <Input
                                type="tel"
                                placeholder="Contact phone number"
                                value={value}
                                onChange={(e) => {
                                  const sanitizedValue = e.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 10);
                                  onChange(sanitizedValue);
                                }}
                                className={
                                  error || phoneError ? "border-red-500" : ""
                                }
                              />
                            </div>
                            {(error || phoneError) && (
                              <FormMessage>
                                {error ? error.message : phoneError}
                              </FormMessage>
                            )}
                          </FormItem>
                        );

                      case "select":
                        return (
                          <FormItem className="flex flex-col gap-2">
                            <FormLabel className="text-base font-bold">
                              {field.label}*
                            </FormLabel>
                            <Select onValueChange={onChange} value={value}>
                              <SelectTrigger>
                                <SelectValue placeholder={field.label} />
                              </SelectTrigger>
                              <SelectContent>
                                {field.options.map((option: string) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {error && (
                              <FormMessage>{error.message}</FormMessage>
                            )}
                          </FormItem>
                        );

                      case "radio":
                        return (
                          <FormItem className="flex flex-row items-center gap-2">
                            <FormLabel className="text-base font-bold">
                              {field.label}
                            </FormLabel>
                            <RadioGroup
                              onValueChange={onChange}
                              value={value}
                              className="flex flex-row"
                            >
                              {field.options.map((option: string) => (
                                <div
                                  key={option}
                                  className="flex items-center space-x-2"
                                >
                                  <RadioGroupItem value={option} id={option} />
                                  <Label htmlFor={option}>{option}</Label>
                                </div>
                              ))}
                            </RadioGroup>
                            {error && (
                              <FormMessage>{error.message}</FormMessage>
                            )}
                          </FormItem>
                        );

                      default:
                        return <></>;
                    }
                  }}
                />
              ))}
            </div>
          ))}
        </FormProvider>
        <Button type="submit" className="self-start px-5 py-2.5 mt-5">
          Submit
        </Button>
      </form>
    </div>
  );
};
