import * as React from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "../ui/time-picker-input";
interface TimePickerDemoProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  disabled?: boolean;
}

export function TimePicker({ date, setDate, disabled }: TimePickerDemoProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-2 w-full bg-white p-2 px-3 rounded-lg shadow-sm">
      {/* Duration Label  */}
      <Label htmlFor="start-time">
        <span className={`text-base ${disabled ? "text-gray-500" : ""}`}>
          Duration
        </span>
        <Clock
          className={`h-4 w-4 inline-block ml-2 ${
            disabled ? "text-gray-500" : ""
          }`}
        />
      </Label>

      <div className="flex gap-2 ml-6">
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
          disabled={disabled}
        />
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
          disabled={disabled}
        />
        <TimePickerInput
          picker="seconds"
          date={date}
          setDate={setDate}
          ref={secondRef}
          onLeftFocus={() => minuteRef.current?.focus()}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
