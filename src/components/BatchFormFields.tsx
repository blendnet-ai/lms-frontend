import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import LiveClassAPI from "@/apis/LiveClassAPI";
import AccountsAPI from "@/apis/AccountsAPI";

interface BatchFormFieldsProps {
  initialTitle?: string;
  initialStartDate?: string;
  initialEndDate?: string;
  initialLecturerId?: string;
  onFieldChange: (field: string, value: string) => void;
  showError: boolean;
}

interface Lecturer {
  first_name: string;
  last_name: string;
  lecturer_id: number;
}

const BatchFormFields = ({
  initialTitle = "",
  initialStartDate = "",
  initialEndDate = "",
  initialLecturerId = "",
  onFieldChange,
  showError,
}: BatchFormFieldsProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [lecturerId, setLecturerId] = useState(initialLecturerId);
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [courseProvider, setCourseProvider] = useState<any>(null);
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    setTitle(initialTitle);
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
    setLecturerId(initialLecturerId);
  }, [initialTitle, initialStartDate, initialEndDate, initialLecturerId]);

  useEffect(() => {
    const fetchCourseProvider = async () => {
      try {
        const data = await LiveClassAPI.getCourseProvider();
        setCourseProvider(data);
      } catch (error) {
        console.error("Failed to fetch course provider", error);
      }
    };
    fetchCourseProvider();
  }, []);

  useEffect(() => {
    const fetchLecturers = async () => {
      if (courseProvider?.id) {
        try {
          const data = await AccountsAPI.getLecturers(courseProvider.id);
          setLecturers(data.lecturers);
        } catch (error) {
          console.error("Failed to fetch lecturers", error);
        }
      }
    };
    fetchLecturers();
  }, [courseProvider]);

  const handleFieldChange = (
    value: string,
    setter: (value: string) => void,
    fieldName: string
  ) => {
    setter(value);
    onFieldChange(fieldName, value);

    // Validate dates when either start or end date changes
    if (fieldName === "start_date" || fieldName === "end_date") {
      const start = fieldName === "start_date" ? value : startDate;
      const end = fieldName === "end_date" ? value : endDate;

      if (start && end && new Date(start) >= new Date(end)) {
        setDateError("End date must be after start date");
        onFieldChange("end_date", ""); // Clear end date if invalid
        if (fieldName === "end_date") {
          setter(""); // Clear end date input
        }
      } else {
        setDateError("");
      }
    }
  };

  useEffect(() => {
    console.log("lecturerId", lecturerId);
  }, [lecturerId]);

  return (
    <>
      {showError && (
        <p className="text-red-500 text-sm">
          Please fill in all required fields marked with *
        </p>
      )}
      {dateError && <p className="text-red-500 text-sm">{dateError}</p>}
      <div className="grid w-full items-center gap-1.5">
        <Label>Title*</Label>
        <Input
          placeholder=""
          value={title}
          onChange={(e) => handleFieldChange(e.target.value, setTitle, "title")}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label>Start Date*</Label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) =>
              handleFieldChange(e.target.value, setStartDate, "start_date")
            }
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label>End Date*</Label>
          <Input
            type="date"
            value={endDate}
            min={startDate || undefined}
            onChange={(e) =>
              handleFieldChange(e.target.value, setEndDate, "end_date")
            }
          />
        </div>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>Lecturer*</Label>
        <Select
          value={lecturerId}
          onValueChange={(value) =>
            handleFieldChange(value, setLecturerId, "lecturer_id")
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a lecturer" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {lecturers.map((lecturer) => (
                <SelectItem
                  key={lecturer.lecturer_id}
                  value={lecturer.lecturer_id.toString()}
                >
                  {lecturer.first_name} {lecturer.last_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default BatchFormFields;
