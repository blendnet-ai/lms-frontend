import * as React from "react";
import { Label } from "@/components/ui/label";
import { Period } from "../ui/utils/time-picker-utils";
import { TimePickerInput } from "../ui/time-picker-input";
import { TimePeriodSelect } from "../ui/PeriodSelect";
import { Clock } from "lucide-react";

interface TimePickerDemoProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  disabled?: boolean;
}

export function TimePickerAMPM({
  date,
  setDate,
  disabled,
}: TimePickerDemoProps) {
  const [period, setPeriod] = React.useState<Period>("PM");

  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);
  const periodRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div className="flex items-center  w-full bg-white p-2 px-3 rounded-lg shadow-sm">
      {/* Start Time Label  */}
      <Label htmlFor="start-time">
        <span className={`text-base ${disabled ? "text-gray-500" : ""}`}>
          Start Time
        </span>
        <Clock
          className={`h-4 w-4 inline-block ml-2 ${
            disabled ? "text-gray-500" : ""
          }`}
        />
      </Label>

      {/* Start Time Input */}
      <div className="flex gap-2 ml-auto">
        <TimePickerInput
          picker="12hours"
          period={period}
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
          disabled={disabled}
        />
        <TimePickerInput
          picker="minutes"
          id="minutes12"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
          disabled={disabled}
        />
        <TimePickerInput
          picker="seconds"
          id="seconds12"
          date={date}
          setDate={setDate}
          ref={secondRef}
          onLeftFocus={() => minuteRef.current?.focus()}
          onRightFocus={() => periodRef.current?.focus()}
          disabled={disabled}
        />
        <TimePeriodSelect
          period={period}
          setPeriod={setPeriod}
          date={date}
          setDate={setDate}
          ref={periodRef}
          onLeftFocus={() => secondRef.current?.focus()}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
