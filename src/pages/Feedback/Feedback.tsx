import FeedbackAPI, { FeedbackForm } from "@/apis/FeedbackAPI";
import Form from "@/Form/Form";

function Feedback() {
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

  const fetchFormData = async () => {
    const response = await FeedbackAPI.getForms();
    return response.data.form;
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-blue-50 p-8 pt-6">
      <Form
        fetchFormData={fetchFormData}
        onSubmit={submitForm}
        title="Rate your experience below"
        description="Please fill the form below to continue!"
        formLayoutStyles="grid grid-cols-1 gap-8"
      />
    </div>
  );
}

export default Feedback;
