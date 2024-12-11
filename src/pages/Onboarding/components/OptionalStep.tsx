import { useState } from "react";
import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  IconButton,
  LinearProgress,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { icons } from "../../../assets";
import CloseIcon from "@mui/icons-material/Close";
import { OnboardingStepProps } from "../OnboardingLms";
import LMSAPI from "../../../apis/LmsAPI";
import axios from "axios";

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
      const sasUrl = await LMSAPI.getSasUrlToUploadResume();

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
    <Box sx={styles.container}>
      {isLoading && <CircularProgress sx={styles.loading} />}
      {/* Title */}
      <Typography sx={styles.title}>Additional Details (optional)</Typography>
      <Typography sx={styles.subtitle}>Upload your resume here*</Typography>

      {/* File Upload */}
      <Box component="label" sx={styles.uploadBox}>
        <Typography sx={styles.uploadHint}>
          Only support .png, .pdf, and zip files
        </Typography>
        <Button component="label" sx={styles.uploadButton}>
          <Typography sx={styles.uploadButtonText}>Upload</Typography>
          <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
        </Button>
      </Box>

      {/* Uploaded File Display */}
      {uploadedFile && (
        <Box sx={styles.fileBox}>
          <Box sx={styles.fileDetails}>
            <CardMedia component="img" sx={styles.fileIcon} image={icons.pdf} />
            <Typography sx={styles.fileName}>{uploadedFile.name}</Typography>
            <IconButton onClick={resetFileState} sx={styles.closeButton}>
              <CloseIcon sx={styles.closeIcon} />
            </IconButton>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={styles.progressBar}
          />
        </Box>
      )}

      {/* Error Message */}
      {error && !uploadedFile && (
        <Typography sx={styles.errorText}>{error}</Typography>
      )}

      {/* LinkedIn Profile Link */}
      <Box sx={styles.linkedInBox}>
        <Typography sx={styles.linkedInLabel}>
          Add your LinkedIn profile link (optional)
        </Typography>
        <TextField
          variant="outlined"
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
          sx={styles.linkedInInput}
        />
      </Box>

      {/* Action Buttons */}
      <Box sx={styles.actionButtonsBox}>
        <Button onClick={handleSkip} sx={styles.skipButton}>
          Skip
        </Button>
        <Button onClick={handleSubmit} sx={styles.submitButton}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default OptionalStep;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

// Styles Object
const styles = {
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: "40px 60px",
  },
  title: {
    fontSize: "26px",
    marginBottom: "8px",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "16px",
    marginBottom: "16px",
  },
  uploadBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "400px",
    border: "1px dashed #2059EE",
    padding: "8px",
    borderRadius: "10px",
  },
  uploadHint: {
    fontSize: "12px",
    color: "gray",
    marginRight: "8px",
  },
  uploadButton: {
    backgroundColor: "#2059EE",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: "#2059EE",
    },
  },
  uploadButtonText: {
    fontSize: "12px",
    color: "#fff",
    textTransform: "none",
  },
  fileBox: {
    display: "flex",
    flexDirection: "column",
    padding: "12px",
    backgroundColor: "#fff",
    maxWidth: "400px",
    border: "1px solid #E7E7E7",
    borderRadius: "10px",
    mt: "20px",
  },
  fileDetails: {
    display: "flex",
    alignItems: "center",
  },
  fileIcon: {
    width: "30px",
    height: "30px",
  },
  fileName: {
    fontSize: "12px",
    marginLeft: "8px",
    color: "#000",
    fontWeight: "bold",
  },
  closeButton: {
    marginLeft: "auto",
  },
  closeIcon: {
    color: "#000",
    fontSize: "12px",
  },
  progressBar: {
    height: "5px",
    borderRadius: "5px",
    marginTop: "8px",
    backgroundColor: "#E7E7E7",
  },
  errorText: {
    fontSize: "12px",
    color: "red",
    marginTop: "16px",
  },
  linkedInBox: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    width: "100%",
    maxWidth: "400px",
  },
  linkedInLabel: {
    fontSize: "16px",
    marginBottom: "16px",
  },
  linkedInInput: {
    width: "100%",
  },
  actionButtonsBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    maxWidth: "400px",
  },
  skipButton: {
    marginTop: "20px",
    backgroundColor: "#EFF6FF",
    border: "1px solid #2059EE",
    color: "#2059EE",
    "&:hover": {
      backgroundColor: "#EFF6FF",
    },
  },
  submitButton: {
    marginTop: "20px",
    backgroundColor: "#2059EE",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#1747C8",
    },
  },
};
