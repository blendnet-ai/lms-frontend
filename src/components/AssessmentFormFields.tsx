import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface QuestionCounts {
  objective: number;
  listening: number;
  speaking: number;
  reading: number;
  writing: number;
}

interface AssessmentFormFieldsProps {
  onFieldChange: (
    field: string,
    value: string | number | QuestionCounts
  ) => void;
  showError: boolean;
  nameError?: string;
  formData: {
    name: string;
    module_id: string;
    duration: number;
    start_date: string;
    end_date: string;
    due_date: string;
    assessment_type: string;
    question_counts: QuestionCounts;
  };
  isEditMode?: boolean;
}

const AssessmentFormFields = ({
  onFieldChange,
  showError,
  nameError,
  formData,
  isEditMode = false,
}: AssessmentFormFieldsProps) => {
  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Title*</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onFieldChange("name", e.target.value)}
          className={cn(showError && !formData.name && "border-red-500")}
        />
        {showError && !formData.name && (
          <p className="text-sm text-red-500">Assessment name is required</p>
        )}
        {nameError && <p className="text-sm text-red-500">{nameError}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="duration">Duration (mins)*</Label>
        <Input
          id="duration"
          type="number"
          min="1"
          value={formData.duration}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (value < 1) return;
            onFieldChange("duration", value);
          }}
          className={cn(
            showError &&
              (!formData.duration || formData.duration < 1) &&
              "border-red-500"
          )}
        />
        {showError && (!formData.duration || formData.duration < 1) && (
          <p className="text-sm text-red-500">
            Duration must be at least 1 minute
          </p>
        )}
      </div>

      {!isEditMode && (
        <>
          <div className="flex flex-col gap-2">
            <Label>Assessment Type*</Label>
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="objective"
                  name="assessmentType"
                  value="objective"
                  checked={formData.assessment_type === "objective"}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onFieldChange("assessment_type", "objective");
                      onFieldChange("question_counts", {
                        objective: 1,
                        listening: 0,
                        speaking: 0,
                        reading: 0,
                        writing: 0,
                      });
                    }
                  }}
                  className="mr-2"
                />
                <Label htmlFor="objective">Objective</Label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="lsrw"
                  name="assessmentType"
                  value="lsrw"
                  checked={formData.assessment_type === "lsrw"}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onFieldChange("assessment_type", "lsrw");
                      onFieldChange("question_counts", {
                        objective: 0,
                        listening: 1,
                        speaking: 1,
                        reading: 1,
                        writing: 1,
                      });
                    }
                  }}
                  className="mr-2"
                />
                <Label htmlFor="lsrw">LSRW</Label>
              </div>
            </div>
          </div>

          {formData.assessment_type === "objective" && (
            <div className="mt-4">
              <Label htmlFor="objective-count">Number of Questions</Label>
              <Input
                id="objective-count"
                type="number"
                min="1"
                value={formData.question_counts.objective}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value <= 0) {
                    return;
                  }
                  onFieldChange("question_counts", {
                    ...formData.question_counts,
                    objective: value,
                    listening: 0,
                    speaking: 0,
                    reading: 0,
                    writing: 0,
                  });
                }}
                className="mt-2"
              />
              {formData.question_counts.objective <= 0 && (
                <p className="text-sm text-red-500">
                  Number of questions must be greater than 0
                </p>
              )}
            </div>
          )}

          {formData.assessment_type === "lsrw" && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="listening-count">Listening Questions</Label>
                <Input
                  id="listening-count"
                  type="number"
                  min="0"
                  value={formData.question_counts.listening}
                  onChange={(e) =>
                    onFieldChange("question_counts", {
                      ...formData.question_counts,
                      listening: parseInt(e.target.value),
                    })
                  }
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="speaking-count">Speaking Questions</Label>
                <Input
                  id="speaking-count"
                  type="number"
                  min="0"
                  value={formData.question_counts.speaking}
                  onChange={(e) =>
                    onFieldChange("question_counts", {
                      ...formData.question_counts,
                      speaking: parseInt(e.target.value),
                    })
                  }
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="reading-count">Reading Questions</Label>
                <Input
                  id="reading-count"
                  type="number"
                  min="0"
                  value={formData.question_counts.reading}
                  onChange={(e) =>
                    onFieldChange("question_counts", {
                      ...formData.question_counts,
                      reading: parseInt(e.target.value),
                    })
                  }
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="writing-count">Writing Questions</Label>
                <Input
                  id="writing-count"
                  type="number"
                  min="0"
                  value={formData.question_counts.writing}
                  onChange={(e) =>
                    onFieldChange("question_counts", {
                      ...formData.question_counts,
                      writing: parseInt(e.target.value),
                    })
                  }
                  className="mt-2"
                />
              </div>
              {formData.question_counts.listening +
                formData.question_counts.speaking +
                formData.question_counts.reading +
                formData.question_counts.writing <=
                0 && (
                <p className="text-sm text-red-500 col-span-2">
                  Total number of LSRW questions must be greater than 0
                </p>
              )}
            </div>
          )}
        </>
      )}

      <div className="flex gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <Label htmlFor="start_date">Start Date</Label>
          <Input
            id="start_date"
            type="datetime-local"
            value={formData.start_date}
            onChange={(e) => onFieldChange("start_date", e.target.value)}
            className={cn(
              showError && !formData.start_date && "border-red-500"
            )}
          />
          {showError && !formData.start_date && (
            <p className="text-sm text-red-500">Start date is required</p>
          )}
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <Label htmlFor="end_date">End Date</Label>
          <Input
            id="end_date"
            type="datetime-local"
            value={formData.end_date}
            min={formData.start_date}
            onChange={(e) => onFieldChange("end_date", e.target.value)}
            className={cn(showError && !formData.end_date && "border-red-500")}
          />
          {showError && !formData.end_date && (
            <p className="text-sm text-red-500">End date is required</p>
          )}
          {formData.end_date &&
            formData.start_date &&
            new Date(formData.end_date) <= new Date(formData.start_date) && (
              <p className="text-sm text-red-500">
                End date must be after start date
              </p>
            )}
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <Label htmlFor="due_date">Due Date</Label>
          <Input
            id="due_date"
            type="datetime-local"
            value={formData.due_date}
            min={formData.end_date}
            onChange={(e) => onFieldChange("due_date", e.target.value)}
            className={cn(showError && !formData.due_date && "border-red-500")}
          />
          {showError && !formData.due_date && (
            <p className="text-sm text-red-500">Due date is required</p>
          )}
          {formData.due_date &&
            formData.end_date &&
            new Date(formData.due_date) <= new Date(formData.end_date) && (
              <p className="text-sm text-red-500">
                Due date must be after end date
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentFormFields;
