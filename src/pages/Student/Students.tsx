import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import BreadCrumb from "../../components/BreadCrumb";
import { useDebounce } from "../../hooks/useDebounce";
import LiveClassAPI, { GetStudentsResponse } from "../../apis/LiveClassAPI";

const breadcrumbPreviousPages = [
  {
    name: "Home",
    route: "/",
  },
];

const TableRowSkeleton = () => (
  <TableRow>
    <TableCell>
      <Skeleton className="h-4 w-6" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[250px]" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[200px]" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[150px]" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[100px]" />
    </TableCell>
  </TableRow>
);

const Students = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [studentsData, setStudentsData] = useState<GetStudentsResponse | null>(
    null
  );

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const students = await LiveClassAPI.getStudentList();
        setStudentsData(students);
      } catch (error) {
        setError("Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = useCallback((query: string) => {
    setSearchText(query);
  }, []);

  const handleSearchClick = useCallback(() => {
    setSearchQuery(debouncedSearchText);
  }, [debouncedSearchText]);

  const filteredStudents = useMemo(() => {
    if (!studentsData) return [];
    const query = searchQuery.trim().toLowerCase();
    return studentsData.students.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query)
    );
  }, [studentsData, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#EFF6FF] p-8 pt-6">
      {/* Breadcrumb */}
      <BreadCrumb
        previousPages={breadcrumbPreviousPages}
        currentPageName="Students"
      />

      {/* Description */}
      <div className="flex justify-between items-center bg-white gap-5 mb-5 p-3 mt-4">
        <h2 className="font-bold text-xl text-blue-600">
          List of all students
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search students..."
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-[300px]"
            />
            <Button variant={"primary"} onClick={handleSearchClick}>
              Search
            </Button>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 mb-5">{error}</p>}

      {loading ? (
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-bold">#</TableHead>
                <TableHead className="font-bold">Name</TableHead>
                <TableHead className="font-bold">Email</TableHead>
                <TableHead className="font-bold">Course</TableHead>
                <TableHead className="font-bold">Batch ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRowSkeleton key={index} />
              ))}
            </TableBody>
          </Table>
        </div>
      ) : filteredStudents.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-bold">#</TableHead>
                <TableHead className="font-bold">Name</TableHead>
                <TableHead className="font-bold">Email</TableHead>
                <TableHead className="font-bold">Course</TableHead>
                <TableHead className="font-bold">Batch ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <span
                      className="text-blue-600 font-bold cursor-pointer hover:underline"
                      onClick={() => navigate(`/students/${row.id}`)}
                    >
                      {row.name}
                    </span>
                  </TableCell>
                  <TableCell className="font-bold">{row.email}</TableCell>
                  <TableCell className="font-bold">
                    {row.course_title}
                  </TableCell>
                  <TableCell className="font-bold">{row.batch_id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        !error && (
          <div className="text-center bg-white p-5 mt-5">
            <p className="text-red-500 font-bold">No Students Found</p>
          </div>
        )
      )}
    </div>
  );
};

export default Students;
