import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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

const renderField = (field: any, index: number, control: any) => {
  const commonProps = {
    label: field.label,
    control,
    key: `${index}`,
    value: field.value,
  };

  switch (field.type) {
    case "select":
      return (
        <Controller
          name={field.name}
          {...commonProps}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {field.placeholder}
              </Typography>
              <FormControl fullWidth variant="outlined" error={!!error}>
                <InputLabel>{field.label}</InputLabel>
                <Select
                  value={field.value}
                  onChange={(e: SelectChangeEvent) => onChange(e.target.value)}
                  label={field.label}
                  required={field.required}
                  sx={{ minWidth: "400px" }}
                >
                  {field.options?.map((option: any) => (
                    <MenuItem key={option.id} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {error && (
                  <Typography color="error">{error.message}</Typography>
                )}
              </FormControl>
            </Box>
          )}
        />
      );
    case "file-upload":
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {field.placeholder}
          </Typography>

          <Button
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{
              backgroundColor: "#fff",
              border: "1px solid #2059EE",
              padding: "10px 20px",
              width: "fit-content",
            }}
          >
            Upload file
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => console.log(e.target.files)}
              required={field.required}
            />
          </Button>
        </Box>
      );
    case "display-text":
      return <Typography>{field.placeholder}</Typography>;
    default:
      return <TextField {...commonProps} />;
  }
};

export default renderField;
