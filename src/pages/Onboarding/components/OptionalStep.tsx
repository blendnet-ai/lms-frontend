import { useState } from "react";
import { icons } from "../../../assets";
import { X } from "lucide-react";
import { OnboardingStepProps } from "../OnboardingLms";
import LMSAPI from "../../../apis/LmsAPI";
import axios from "axios";
import EvalAPI from "../../../apis/EvalAPI";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Loading from "@/helpers/Loading";

const OptionalStep = ({ completed }: OnboardingStepProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [linkedInLink, setLinkedInLink] = useState<string>("");
  const [resumeUrl, setResumeUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // reset file and progress
  const resetFileState = () => {
    setUploadedFile(null);
    setProgress(0);
  };

  // Handle file upload to server
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    if (!file) return;

    try {
      setUploadedFile(file);
      setIsLoading(true);
      const sasUrl = await EvalAPI.getSasUrlToUploadResume();

      if (!sasUrl?.data) {
        setError("Failed to get upload URL.");
        resetFileState();
        setIsLoading(false);
        return;
      }

      setResumeUrl(sasUrl.data);

      await axios.put(sasUrl.data, file, {
        headers: {
          "Content-Type": file.type,
          "x-ms-blob-type": "BlockBlob",
        },
        onUploadProgress: ({ loaded, total }) => {
          setProgress(Math.round((loaded * 100) / (total || 1)));
        },
      });

      setProgress(100);
    } catch (uploadError) {
      console.error("Upload failed:", uploadError);
      setError("Failed to upload file. Please try again.");
      resetFileState();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!resumeUrl) {
      setError("Please upload your resume before submitting.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await LMSAPI.uploadCvDetails({
        link: resumeUrl,
        linkedin_link: linkedInLink,
        status: "filled",
      });

      if (response?.cv_link_added) {
        completed();
      } else {
        setError("Submission failed. Please try again.");
      }
    } catch (submitError) {
      console.error("CV submission failed:", submitError);
      setError("An error occurred during submission.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = async () => {
    try {
      setIsLoading(true);
      const response = await LMSAPI.uploadCvDetails({
        link: "",
        linkedin_link: "",
        status: "skipped",
      });

      if (response?.cv_link_added) {
        completed();
      } else {
        setError("Failed to skip step. Please try again.");
      }
    } catch (skipError) {
      console.error("Skipping step failed:", skipError);
    } finally {
      setIsLoading(false);
    }
  };

  const isLinkedInValid = (url: string) =>
    /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/.test(url);

  return (
    <div className="flex flex-col w-full h-full p-10">
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <Loading fullScreen />
        </div>
      )}

      <h1 className="text-2xl font-bold mb-2">Additional Details (optional)</h1>
      <h2 className="text-base mb-4">Upload your resume here*</h2>

      {/* File Upload */}
      <label className="flex justify-between items-center max-w-md border border-dashed border-blue-600 p-2 rounded-lg">
        <span className="text-sm text-gray-500">
          Only support .png, .pdf, and zip files
        </span>
        <Button
          variant="default"
          className="bg-blue-600 hover:bg-blue-700 rounded-lg"
          asChild
        >
          <label>
            <span className="text-sm">Upload</span>
            <input
              type="file"
              className="sr-only"
              onChange={handleFileUpload}
            />
          </label>
        </Button>
      </label>

      {/* Uploaded File Display */}
      {uploadedFile && (
        <Card className="p-3 max-w-md mt-5 border border-gray-200">
          <div className="flex items-center">
            <img src={icons.pdf} alt="PDF" className="w-8 h-8" />
            <span className="text-sm font-bold ml-2">{uploadedFile.name}</span>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={resetFileState}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Progress value={progress} className="h-1.5 mt-2" />
        </Card>
      )}

      {/* Error Message */}
      {error && !uploadedFile && (
        <p className="text-sm text-red-500 mt-4">{error}</p>
      )}

      {/* LinkedIn Profile Link */}
      <div className="flex flex-col mt-5 max-w-md">
        <label className="text-base mb-4">
          Add your LinkedIn profile link (optional)
        </label>
        <Input
          placeholder="https://www.linkedin.com/in/your-profile"
          value={linkedInLink}
          onChange={(e) => {
            const value = e.target.value;
            setLinkedInLink(value);
            if (value && !isLinkedInValid(value)) {
              setError("Invalid LinkedIn URL.");
            } else {
              setError("");
            }
          }}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-auto max-w-md">
        <Button
          variant="light"
          onClick={handleSkip}
          className="mt-5 bg-blue-50 border-blue-600 text-blue-600 hover:bg-blue-100"
        >
          Skip
        </Button>
        <Button
          variant="default"
          onClick={handleSubmit}
          className="mt-5 bg-blue-600 hover:bg-blue-700"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default OptionalStep;
