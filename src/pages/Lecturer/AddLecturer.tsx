import BULKAPI, { BulkUploadResponse } from "@/apis/BulkAPI";
import BreadCrumb from "@/components/BreadCrumb";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/configs/routes";
import { useState } from "react";
import { toast } from "sonner";

const breadcrumbPreviousPages = [
  {
    name: "Home",
    route: ROUTES.HOME,
  },
];

const AddLecturer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<BulkUploadResponse | null>(null);

  const validateFile = (file: File): boolean => {
    const allowedExtensions = ["xlsx"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      setError("Invalid file type. Only XLSX files are supported.");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setError("File size exceeds the 5MB limit.");
      return false;
    }
    return true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
    }
    event.target.value = "";
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setLoading(true);
    try {
      const resp = await BULKAPI.uploadLecturer(file);
      setData(resp);
      console.log("Upload response:", resp);
    } catch (error) {
      setError("Failed to upload the file.");
      toast.error("Error uploading file");
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#EFF6FF] p-8 pt-6">
      {/* Breadcrumb */}
      <BreadCrumb
        previousPages={breadcrumbPreviousPages}
        currentPageName={"Add Lecturers"}
      />

      {/* Description */}
      <div className="flex justify-between items-center bg-white gap-5 mb-5 p-3 mt-4">
        <h2 className="font-bold text-xl text-blue-600">
          Upload Lecturers List
        </h2>
      </div>

      {/* Upload Form Box */}
      <div className="flex flex-col bg-white gap-5 mb-5 p-5 pl-6 mt-4 w-full">
        <p className="text-base text-gray-500 w-1/2">
          Upload a XLSX file containing the list of lecturers. The file should
          contain the following columns: <br />
          <span className="font-semibold">First Name</span>,{" "}
          <span className="font-semibold">Last Name</span>,{" "}
          <span className="font-semibold">Email</span>,{" "}
          <span className="font-semibold">Course Code</span>,{" "}
          <span className="font-semibold">Batch ID</span>,{" "}
        </p>

        <label
          htmlFor="uploadFile"
          className="bg-white text-slate-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-11 mb-3 fill-gray-500"
            viewBox="0 0 32 32"
          >
            <path
              d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
              data-original="#000000"
            />
            <path
              d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
              data-original="#000000"
            />
          </svg>
          Upload file
          <input
            type="file"
            id="uploadFile"
            className="hidden"
            accept=".xlsx"
            onChange={handleFileChange}
            disabled={loading}
          />
          <p className="text-xs font-medium text-slate-400 mt-2">
            Drag and drop or browse to upload, Only XLSX files are supported.
          </p>
        </label>

        {/* Display file name or error */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* show success count and failed count only in table */}
        {data && (
          <span className="text-base font-semibold text-[#2059EE]">
            {`Upload status: ${data.data.success_count} lecturers added successfully, ${data.data.failed_count} failed.`}
          </span>
        )}

        {/* show failures entries in table */}
        {data && data.data.failed_count > 0 && (
          <div className="w-full max-w-xl">
            <div className="grid grid-cols-2 border-b-2 border-gray-200 mb-2">
              <div className="font-bold">Email</div>
              <div className="font-bold">Error Reason</div>
            </div>
            <div className="max-h-64 overflow-y-auto w-full">
              {data.data.failures.map((failure, index) => (
                <div
                  key={index}
                  className="hover:bg-gray-50 w-full grid grid-cols-2 gap-4"
                >
                  <div className="w-full">{failure.email}</div>
                  <div className="w-full">{failure.error}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button
            variant={"primary"}
            onClick={handleUpload}
            disabled={loading || !file}
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
          <Button
            variant={"light"}
            disabled={loading || !file}
            onClick={() => {
              setFile(null);
              setError(null);
              (
                document.getElementById("uploadFile") as HTMLInputElement
              ).value = "";
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddLecturer;
