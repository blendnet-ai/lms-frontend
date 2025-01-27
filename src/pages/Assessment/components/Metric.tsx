import { Metric } from "@/apis/EvalAPI";
import { Card, CardContent } from "@/components/ui/card";

interface MetricProps {
  data: Metric;
}

const MetricChip = (props: MetricProps) => {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center p-4">
        <p className="text-xl font-bold text-black">{props.data.name}</p>
        <p className="text-base text-black">{props.data.obtained_score} /10</p>
      </CardContent>
    </Card>
  );
};

export default MetricChip;
