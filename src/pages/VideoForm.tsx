import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { getModuleRoute, ROUTES } from "@/configs/routes";
import BreadCrumb from "@/components/BreadCrumb";
import { Label } from "@/components/ui/label";
import CourseAPI from "@/apis/CourseAPI";
import AzureBlobAPI from "@/apis/AzureBlobAPI";

const VideoForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [order, setOrder] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = new URLSearchParams(window.location.search);
  const courseId = searchParams.get("courseId");
  const moduleId = searchParams.get("moduleId");
  const courseName = searchParams.get("courseName");

  const breadcrumbPreviousPages = [
    {
      name: "Courses",
      route: ROUTES.COURSES,
    },
    {
      name: courseName ?? "",
      route: getModuleRoute(courseName ?? "", courseId ?? ""),
    },
  ];

  const allowedFileTypes = [
    "video/mp4",
    "video/x-matroska",
    "video/x-ms-wmv",
    "video/3gpp",
    "video/x-f4v",
    "video/x-msvideo",
    "audio/mpeg",
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (!allowedFileTypes.includes(selectedFile.type)) {
      setError(
        "Please upload a valid video file (mp4, mkv, wmv, 3gp, f4v, avi, mp3)"
      );
      return;
    }

    setFile(selectedFile);
    setError("");
  };

  const handleSubmit = async () => {
    if (!title || !file) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const blob_url = await CourseAPI.uploadMaterial(
        order,
        title,
        courseId ?? "",
        moduleId ?? "",
        "video"
      );

      const uploaded = await AzureBlobAPI.uploadFile(blob_url, file, file.type);

      if (!uploaded) {
        setError("Failed to upload video. Please try again.");
        return;
      }

      navigate(getModuleRoute(courseName ?? "", courseId ?? ""));
    } catch (error) {
      console.error("Error uploading video:", error);
      setError("Failed to upload video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToVideos = () => {
    navigate(getModuleRoute(courseName ?? "", courseId ?? ""));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] w-full p-8 pt-6">
      <BreadCrumb
        previousPages={breadcrumbPreviousPages}
        currentPageName={"Video Form"}
      />
      <h2 className="text-2xl font-bold mt-4">Add New Video</h2>
      <Card className="mt-4 p-4 flex flex-col gap-4">
        <div className="grid grid-cols-6 gap-4 align-top">
          <div className="flex flex-col col-span-1">
            <div className="grid w-full items-center gap-1.5">
              <Label>Order*</Label>
              <Input
                type="number"
                placeholder="1"
                min={1}
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="flex flex-col col-span-5">
            <div className="grid w-full items-center gap-1.5">
              <Label>Title*</Label>
              <Input
                placeholder=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Video File*</label>
          <div className="flex justify-between items-center max-w-md border border-dashed border-blue-600 p-2 rounded-lg">
            <span className="text-sm text-gray-500">
              {file ? file.name : "No file selected"}
            </span>
            <Button
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 rounded-lg"
              asChild
            >
              <label>
                <span className="text-sm">Choose File</span>
                <input
                  type="file"
                  className="sr-only"
                  accept=".mp4,.mkv,.wmv,.3gp,.f4v,.avi,.mp3"
                  onChange={handleFileChange}
                />
              </label>
            </Button>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Valid video formats: mp4, mkv, wmv, 3gp, f4v, avi, mp3
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-between">
          <Button variant="primary" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Uploading..." : "Upload"}
          </Button>
          <Button variant="outline" onClick={navigateToVideos}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default VideoForm;
