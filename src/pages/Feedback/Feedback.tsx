import BreadCrumb from "../../components/BreadCrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDateWords } from "@/utils/formatDate";
import FeedbackAPI, {
  FeedbackForm,
  FeedbackFormStatus,
  FeedbackStatusResponse,
} from "@/apis/FeedbackAPI";
import Form from "./Form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

function Feedback() {
  const [data, setData] = useState<FeedbackStatusResponse[]>([]);
  const [formData, setForm] = useState<FeedbackForm | null>(null);

  const getStatus = () => {
    FeedbackAPI.getStatus().then((data) => setData(data));
  };
  useEffect(() => {
    getStatus();
  }, []);

  useEffect(() => {
    FeedbackAPI.getForms().then((data) => {
      console.log(JSON.stringify(data, null, 2));
      setForm(data.data.form);
    });
  }, []);

  const submitForm = async (
    course_feedback_entry_id: number,
    sections: FeedbackForm
  ) => {
    console.log(sections);
    await FeedbackAPI.submitForm(course_feedback_entry_id, sections).then(
      (data) => {
        console.log(data);
      }
    );
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-blue-50 p-8 pt-6 w-full">
      <BreadCrumb previousPages={[]} currentPageName={"Feedback"} />
      <h1 className="font-bold text-xl text-blue-600 mb-5 mt-5">
        Rate your experience
      </h1>
      <Accordion
        type="single"
        collapsible
        className="w-full bg-white px-5 py-1"
      >
        {data.map((course: any) => (
          <AccordionItem value={course.course_name} className="w-full">
            <AccordionTrigger className="hover:no-underline">
              <span className="font-bold text-base px-2">
                {course.course_name}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                {course.forms_data.forms.map((form: FeedbackFormStatus) => (
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <p className="p-2">{form.week_label}</p>
                      <Separator orientation="vertical" />
                      <p className="p-2 color-gray">
                        {form.is_filled && form.filled_on
                          ? `Submitted on ${formatDateWords(
                              new Date(form.filled_on)
                            )}`
                          : `Submit before ${formatDateWords(
                              new Date(form.end_date)
                            )}`}
                      </p>
                    </div>

                    {form.is_filled ? (
                      <p className="text-blue-600 mr-8 text-base">Submitted</p>
                    ) : (
                      <>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant={"primary"}>Give Feedback</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[70VW]">
                            {formData && (
                              <Form
                                close={() => {}}
                                submit={(submissionData: FeedbackForm) =>
                                  submitForm(
                                    form.entry_form_id,
                                    submissionData
                                  ).then(() => {
                                    window.location.reload();
                                  })
                                }
                                formData={formData}
                              />
                            )}
                          </DialogContent>
                        </Dialog>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default Feedback;
