import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type OverallScoreProps = {
  score?: number | null;
  feedback?: string | null;
};

const CustomCircularProgress = ({
  filledValue,
  innerValue,
  textColor,
}: {
  filledValue: number;
  innerValue: string;
  textColor: string;
}) => {
  // Calculate the circumference and offset
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (filledValue / 10) * circumference;

  return (
    <div className="relative inline-flex">
      <div className="relative h-[90px] w-[90px]">
        <svg
          className="h-full w-full"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            className="stroke-slate-200"
            strokeWidth="3"
          />
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            className="stroke-blue-600"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold" style={{ color: textColor }}>
            {innerValue}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function OverallScore(props: OverallScoreProps) {
  return (
    <Card className="w-full p-5">
      <div className="flex flex-row gap-10">
        <div>
          {props.score != null ? (
            <CustomCircularProgress
              textColor="#2059EE"
              filledValue={props.score}
              innerValue={`${props.score}/10`}
            />
          ) : (
            <Skeleton className="h-[90px] w-[90px] rounded-full" />
          )}
        </div>
        <div className="flex w-full flex-col gap-2.5">
          <h3 className="text-xl font-semibold text-blue-600">
            Performance summary{" "}
            {props.score != null ? `${props.score}/10` : "?/10"}
          </h3>

          {props.feedback ? (
            <p>{props.feedback}</p>
          ) : (
            <Skeleton className="h-[100px] w-full" />
          )}
        </div>
      </div>
    </Card>
  );
}
