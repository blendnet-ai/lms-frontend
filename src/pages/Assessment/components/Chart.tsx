import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  PolarRadiusAxis,
} from "recharts";
import { CategoryPerformance } from "@/apis/EvalAPI";

interface PerformanceProps {
  data: CategoryPerformance[] | null;
}

export const PerformanceChart = ({ data }: PerformanceProps) => {
  const chartData =
    data && data.length > 0
      ? data?.map((item) => ({
          category: item.category,
          score: item.score * 10,
          fullMark: 100,
        }))
      : [
          {
            category: "Speaking",
            score: 0,
            fullMark: 100,
          },
          {
            category: "Writing",
            score: 0,
            fullMark: 100,
          },
          {
            category: "Reading",
            score: 0,
            fullMark: 100,
          },
          {
            category: "Listening",
            score: 0,
            fullMark: 100,
          },
        ];

  return (
    <div className="w-full h-[500px] max-w-[1000px]">
      <ResponsiveContainer>
        <RadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="category" />
          <PolarRadiusAxis angle={90} domain={[0, 100]} />
          <Radar
            dataKey="score"
            stroke="#1976d2"
            fill="#1976d2"
            name="Score"
            fillOpacity={0.6}
            dot={{
              fill: "#2059EE",
              stroke: "#2059EE",
              strokeWidth: 4,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
