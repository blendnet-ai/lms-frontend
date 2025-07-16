import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { ROUTES } from "../../configs/routes";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  ChevronDown,
  ChevronUp,
  Filter,
  X,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const breadcrumbPreviousPages = [
  {
    name: "Home",
    route: ROUTES.HOME,
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
    <TableCell>
      <Skeleton className="h-4 w-[100px]" />
    </TableCell>
  </TableRow>
);

const Students = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [studentsData, setStudentsData] = useState<GetStudentsResponse | null>(
    null
  );
  const [showFilters, setShowFilters] = useState(false);

  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const initialPageSize = parseInt(searchParams.get("pageSize") || "25", 10);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [selectedBatchIds, setSelectedBatchIds] = useState<string[]>([]);
  const [loginStatusFilter, setLoginStatusFilter] = useState<string>("all");
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);

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

  const uniqueBatchIds = useMemo(() => {
    if (!studentsData  || !Array.isArray(studentsData.students)) return [];
    const batchIds = studentsData.students.map((student) => student.batch_id);
    return [...new Set(batchIds)].filter(Boolean).sort();
  }, [studentsData]);

  const toggleBatchIdSelection = useCallback((batchId: string) => {
    setSelectedBatchIds((prev) =>
      prev.includes(batchId)
        ? prev.filter((id) => id !== batchId)
        : [...prev, batchId]
    );
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedBatchIds([]);
    setLoginStatusFilter("all");
    setSearchText("");
    setSearchQuery("");
  }, []);

  const toggleStudentSelection = useCallback((studentId: number) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", currentPage.toString());
    params.set("pageSize", pageSize.toString());
    setSearchParams(params);
  }, [currentPage, pageSize, setSearchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedBatchIds, loginStatusFilter]);

  const filteredStudents = useMemo(() => {
    if (!studentsData || !Array.isArray(studentsData.students)) return [];

    return studentsData.students.filter((student) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query);

      const matchesBatchId =
        selectedBatchIds.length === 0 ||
        selectedBatchIds.includes(String(student.batch_id));

      let matchesLoginStatus = true;
      if (loginStatusFilter === "never") {
        matchesLoginStatus = !student.last_login;
      } else if (loginStatusFilter === "has_logged_in") {
        matchesLoginStatus = !!student.last_login;
      }

      return matchesSearch && matchesBatchId && matchesLoginStatus;
    });
  }, [studentsData, searchQuery, selectedBatchIds, loginStatusFilter]);

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredStudents.slice(startIndex, startIndex + pageSize);
  }, [filteredStudents, currentPage, pageSize]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredStudents.length / pageSize)),
    [filteredStudents, pageSize]
  );

  const goToPage = useCallback(
    (page: number) => {
      const validPage = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(validPage);
    },
    [totalPages]
  );

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const changePageSize = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (selectedStudents.length === paginatedStudents.length) {
      setSelectedStudents((prev) =>
        prev.filter(
          (id) => !paginatedStudents.some((student) => student.id === id)
        )
      );
    } else {
      const currentPageIds = paginatedStudents.map((student) => student.id);
      const newSelected = [
        ...new Set([...selectedStudents, ...currentPageIds]),
      ];
      setSelectedStudents(newSelected);
    }
  }, [paginatedStudents, selectedStudents]);

  const exportSelectedToCSV = useCallback(() => {
    if (selectedStudents.length === 0) return;

    const selectedStudentData = filteredStudents.filter((student) =>
      selectedStudents.includes(student.id)
    );

    const headers = [
      "Name",
      "Email",
      "Course",
      "Batch ID",
      "Last Login",
      "Status",
    ];
    const csvContent = [
      headers.join(","),
      ...selectedStudentData.map((student) =>
        [
          `"${student.name || "N/A"}"`,
          `"${student.email}"`,
          `"${student.course_title}"`,
          `"${student.batch_id}"`,
          `"${
            student.last_login
              ? new Date(student.last_login).toLocaleString()
              : "Never"
          }"`,
          `"${student.status}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `students_export_${new Date().toISOString().split("T")[0]}.csv`.replace(
        ".csv",
        `_at_${new Date()
          .toISOString()
          .replace(/[:.]/g, "-")
          .replace("T", "_")
          .slice(0, 19)}.csv`
      )
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [selectedStudents, filteredStudents]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedBatchIds.length > 0) count++;
    if (loginStatusFilter !== "all") count++;
    return count;
  }, [selectedBatchIds, loginStatusFilter]);

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
            <Button
              variant={"primary"}
              onClick={() => navigate(ROUTES.STUDENTS.ADD)}
            >
              Add Students
            </Button>
            <Button
              variant={"primary"}
              onClick={() => navigate(ROUTES.LECTURERS.ADD)}
            >
              Add Lecturers
            </Button>
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
            <Button
              variant={"outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1"
            >
              <Filter size={16} />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="destructive" className="ml-1">
                  {activeFilterCount}
                </Badge>
              )}
              {showFilters ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </Button>
            {selectedStudents.length > 0 && (
              <Button
                variant="default"
                onClick={exportSelectedToCSV}
                className="flex items-center gap-1"
              >
                <Download size={16} />
                Export {selectedStudents.length} Selected
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white p-4 mb-4 rounded-md border">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-lg">Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-red-500 flex items-center"
            >
              <X size={16} className="mr-1" /> Reset Filters
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Batch ID's</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto border p-2 rounded-md">
                {uniqueBatchIds.length > 0 ? (
                  uniqueBatchIds.map((batchId) => (
                    <div key={batchId} className="flex items-center space-x-2">
                      <Checkbox
                        id={`batch-${batchId}`}
                        checked={selectedBatchIds.includes(String(batchId))}
                        onCheckedChange={() =>
                          toggleBatchIdSelection(String(batchId))
                        }
                      />
                      <Label htmlFor={`batch-${batchId}`}>{batchId}</Label>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No batch IDs available
                  </p>
                )}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Login Status</h4>
              <RadioGroup
                value={loginStatusFilter}
                onValueChange={setLoginStatusFilter}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="login-all" />
                  <Label htmlFor="login-all">All Students</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="login-never" />
                  <Label htmlFor="login-never">Never Logged In</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="has_logged_in" id="login-has" />
                  <Label htmlFor="login-has">Has Logged In</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 mb-5">{error}</p>}

      {/* Results Summary */}
      {!loading && !error && (
        <div className="bg-blue-50 p-2 mb-4 rounded-md text-sm">
          <span className="font-medium">
            Showing {paginatedStudents.length} of {filteredStudents.length}{" "}
            students
            {activeFilterCount > 0 && " (filtered)"}
            {selectedStudents.length > 0 &&
              `, ${selectedStudents.length} selected`}
            {` (Page ${currentPage} of ${totalPages})`}
          </span>
        </div>
      )}

      {loading ? (
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="w-10">
                  <Checkbox disabled />
                </TableHead>
                <TableHead className="font-bold">#</TableHead>
                <TableHead className="font-bold">Name</TableHead>
                <TableHead className="font-bold">Email</TableHead>
                <TableHead className="font-bold">Course</TableHead>
                <TableHead className="font-bold">Batch ID</TableHead>
                <TableHead className="font-bold">Last Login</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 6 }).map((_, index) => (
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
                <TableHead className="w-10">
                  <Checkbox
                    checked={
                      paginatedStudents.length > 0 &&
                      paginatedStudents.every((student) =>
                        selectedStudents.includes(student.id)
                      )
                    }
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead className="font-bold">#</TableHead>
                <TableHead className="font-bold">Name</TableHead>
                <TableHead className="font-bold">Email</TableHead>
                <TableHead className="font-bold">Course</TableHead>
                <TableHead className="font-bold">Batch ID</TableHead>
                <TableHead className="font-bold">Last Login</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedStudents.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedStudents.includes(row.id)}
                      onCheckedChange={() => toggleStudentSelection(row.id)}
                    />
                  </TableCell>
                  <TableCell>
                    {(() => {
                      const color = {
                        bgClass:
                          row.status === "Active"
                            ? "bg-green-500"
                            : "bg-red-500",
                      };
                      return (
                        <div
                          className={`h-3 w-3 rounded-full ${
                            color.bgClass || ""
                          }`}
                        />
                      );
                    })()}
                  </TableCell>
                  <TableCell>
                    <span
                      className="text-blue-600 font-bold cursor-pointer hover:underline"
                      onClick={() => navigate(`/students/${row.id}`)}
                    >
                      {row.name || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell className="font-bold">{row.email}</TableCell>
                  <TableCell className="font-bold">
                    {row.course_title}
                  </TableCell>
                  <TableCell className="font-bold">{row.batch_id}</TableCell>
                  <TableCell className="font-bold">
                    {row.last_login ? (
                      new Date(row.last_login).toLocaleString()
                    ) : (
                      <span className="text-red-500">Never</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between px-4 py-3 bg-white border-t">
            <div className="flex items-center gap-2">
              <Label htmlFor="pageSize">Show:</Label>
              <select
                id="pageSize"
                className="border p-1 rounded text-sm"
                value={pageSize}
                onChange={(e) => changePageSize(Number(e.target.value))}
              >
                {[10, 25, 50, 100].map((size) => (
                  <option
                    key={size}
                    value={size}
                    selected={size === 25 && !searchParams.get("pageSize")}
                  >
                    {size}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-500">entries</span>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
                Previous
              </Button>

              <div className="flex items-center gap-1 mx-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNumber}
                      variant={
                        currentPage === pageNumber ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => goToPage(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  );
                })}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <span className="mx-1">...</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
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
