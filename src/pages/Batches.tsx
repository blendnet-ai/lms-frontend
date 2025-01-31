import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BreadCrumb from "../components/BreadCrumb";
import LiveClassAPI from "../apis/LiveClassAPI";

type BatchRowProps = {
  title: string;
  id: string;
  start_date: string;
  students_count: number;
};

function BatchRow(props: BatchRowProps) {
  return (
    <Accordion type="single" collapsible className="w-full bg-white px-5 py-1">
      <AccordionItem value={props.id}>
        <AccordionTrigger className="hover:no-underline">
          <span className="font-bold text-base px-2">{props.title}</span>
        </AccordionTrigger>
        <AccordionContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-base">
                  Number of students
                </TableHead>
                <TableHead className="font-bold text-base">Batch ID</TableHead>
                <TableHead className="font-bold text-base">
                  Start Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{props.students_count}</TableCell>
                <TableCell>{props.id}</TableCell>
                <TableCell>
                  {new Date(props.start_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function Batches() {
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get("course_id");
  const [batches, setBatches] = useState<any>();

  const breadcrumbPreviousPages = [
    {
      name: "Courses",
      route: "/courses",
    },
  ];

  useEffect(() => {
    const fetchBatches = async () => {
      const batches = await LiveClassAPI.getBatchesByCourseId(courseId);
      setBatches(batches);
    };
    fetchBatches();
  }, []);

  return (
    <div className="bg-blue-50 min-h-screen w-full p-8 pt-6">
      <BreadCrumb
        previousPages={breadcrumbPreviousPages}
        currentPageName="Batches"
      />
      <h1 className="font-bold text-xl text-blue-600 mb-5 mt-5">
        Batch Details
      </h1>
      {batches &&
        batches.map((batch: any) => (
          <BatchRow
            key={batch.id}
            title={batch.title}
            id={batch.id}
            start_date={batch.start_date}
            students_count={batch.students_count}
          />
        ))}
    </div>
  );
}

export default Batches;
