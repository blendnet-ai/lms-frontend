import { Controller, FormProvider, useForm } from "react-hook-form";
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
import { FeedbackForm, FeedbackSection } from "@/apis/FeedbackAPI";
import { TextField, Typography } from "@mui/material";
import { Rating } from "@/components/ui/rating";

type FormProps = {
  close: () => void;
  submit: (submissionData: any) => void;
  formData: FeedbackForm;
};

const Form = (props: FormProps) => {
  const methods = useForm();
  const { control, handleSubmit, getValues } = methods;

  const onSubmit = async () => {
    const values = getValues();
    let hasError = false;

    // Only proceed with submission if there are no errors
    const submissionData = props.formData.sections.map(
      (section: FeedbackSection) => ({
        ...section,
        fields: section.fields.map((field: { name: string | number }) => ({
          ...field,
          value: values[field.name],
        })),
      })
    );

    props.submit(submissionData);
  };

  // Fetch form data
  //   useEffect(() => {
  //     const fetchForm = async () => {
  //       try {
  //         const resp = await LMSAPI.getOnboardingForm();
  //         const sections = resp?.data?.sections || []; // Safeguard against undefined
  //         if (Array.isArray(sections)) {
  //           setFormData(sections);
  //         } else {
  //           console.error("Unexpected sections data:", sections);
  //         }
  //       } catch (error) {
  //         console.error("Failed to fetch form data:", error);
  //       }
  //     };

  //     fetchForm();
  //   }, []);

  return (
    <div className="flex flex-col w-full h-full p-8 pt-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4 w-full h-full"
      >
        <FormProvider {...methods}>
          {props.formData.sections.map((section: any, sectionIndex: number) => (
            <div key={sectionIndex} className="w-full">
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
                      case "text-multiline":
                        return (
                          <TextField
                            className="w-full"
                            multiline
                            rows={4}
                            sx={{
                              fontWeight: error ? "inherit" : "inherit",
                              color: error ? "#d3302f" : "inherit",
                            }}
                            placeholder={field.label}
                          />
                        );
                      case "star-rating":
                        return (
                          <FormItem className="flex flex-row gap-2">
                            <Typography
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "10px",
                                width: "100%",
                                fontWeight: error ? "inherit" : "inherit",
                                color: error ? "#d3302f" : "inherit",
                                fontSize: "18px",
                              }}
                            >
                              {field.label}
                              {field.required && (
                                <span style={{ color: "red" }}> *</span>
                              )}
                            </Typography>
                            <Rating
                              // name={field.name}
                              rating={value || 0}
                              variant="yellow"
                              onRatingChange={onChange}
                              size={30}
                            />
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
                              />
                            </FormControl>

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

export default Form;
