import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface EngagementProps {
  total_learning_time: number;
  last_login_date: string;
  last_login_time: string;
}

const EngagementStats = (props: EngagementProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold p-2 bg-white border-b">
        Engagement Stats
      </h2>

      <div className="bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-base">
                Last Login Date
              </TableHead>
              <TableHead className="font-bold text-base">
                Last Login Time
              </TableHead>
              <TableHead className="font-bold text-base">
                Total Learning Time
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{props?.last_login_date}</TableCell>
              <TableCell>{props?.last_login_time} PM</TableCell>
              <TableCell>{Math.round(props?.total_learning_time)} Hr</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EngagementStats;
