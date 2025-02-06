import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import MetricChip from "./Metric";
import { AssessmentResultSection, CategoryPerformance } from "@/apis/EvalAPI";

interface PerformanceOverviewProps {
  data: CategoryPerformance[] | null;
  metricsData: AssessmentResultSection[] | null;
}

const PerformanceOverview = ({
  data,
  metricsData,
}: PerformanceOverviewProps) => {
  const [selectedSection, setSelectedSection] = useState<string | null>(
    "Speaking"
  );

  const selectedSectionData = useMemo(
    () => metricsData?.find((section) => section.name === selectedSection),
    [selectedSection, metricsData]
  );

  return (
    <div className="flex flex-col gap-5 p-5 w-full">
      <h2 className="text-2xl font-bold text-black">Performance Overview</h2>

      <div className="w-[300px] border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Metric</TableHead>
              <TableHead className="font-bold">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data !== null && data.length > 0
              ? data.map((metric) => (
                  <TableRow key={metric.category}>
                    <TableCell className="font-semibold">
                      {metric.category}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {metric.score} / 10
                    </TableCell>
                  </TableRow>
                ))
              : Array.from({ length: 4 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[60px]" />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex gap-2">
        {metricsData !== null && metricsData.length > 0
          ? metricsData.map((section) => (
              <Button
                key={section.name}
                variant={selectedSection === section.name ? "default" : "light"}
                onClick={() => setSelectedSection(section.name)}
              >
                {section.name}
              </Button>
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-[150px]" />
            ))}
      </div>

      {selectedSectionData && (
        <div className="flex flex-col gap-5 w-full">
          <div className="grid grid-cols-3 gap-4">
            {selectedSectionData.metrics.map((metric) => (
              <MetricChip key={metric.name} data={metric} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceOverview;
