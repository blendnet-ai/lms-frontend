import {
  Box,
  Button,
  CardMedia,
  FormControl,
  IconButton,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import DisplayTextImage from "../Components/DisplayTextImage";
import data from "../data";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClearIcon from "@mui/icons-material/Clear";
import submitData from "../../../apis/GoogleSheetAPI";

const CustomPhoneField = styled(TextField)(() => ({
  "& input[type=number]": {
    "-moz-appearance": "textfield", // for Firefox
    "&::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "&::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
}));

const GetStarted = ({
  maxWidth = "100%",
  outerPadding = "0",
  close,
  icon = false,
}: {
  maxWidth?: string;
  outerPadding?: string | {};
  close?: () => void;
  icon?: boolean;
}) => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      category: "College/Institution",
      organisation: "",
      message: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const handleSubmitData = async (formData: any) => {
    setIsLoading(true);
    try {
      const response = await submitData(formData);

      if (response) {
        toast.success("Thanks For reaching out!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error("Error submitting data", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Error submitting data", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setIsLoading(false);
      form.reset();
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: outerPadding,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            height: "100%",
            width: "100%",
            borderRadius: "10px",
            border: "1px solid white",
            boxShadow: "0px 7px 29px 0px rgba(100, 100, 111, 0.2)",
            backgroundColor: "white",
            padding: { xs: "2rem", md: "2rem 4rem" },
            maxWidth: maxWidth,
            margin: "auto",
            gap: { xs: "2rem", md: "0" },
            position: "relative",
          }}
        >
          {/* close button  */}
          {icon && (
            <IconButton
              onClick={close}
              sx={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                color: "black",
              }}
            >
              <ClearIcon />
            </IconButton>
          )}
          {/* Left side */}
          <Box
            sx={{
              display: { xs: "flex", md: "flex" },
              flexDirection: "column",
              width: { xs: "100%", md: "50%" },
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "block" },
              }}
            >
              <DisplayTextImage
                text="Get started to power your learners with Sakshm.ai !"
                fontSize={{ xs: "1rem", md: "28px" }}
                fontWeight="600"
                textWidth={{ xs: "100%", md: "100%" }}
                marginTop={{ xs: "0rem", md: "0rem" }}
                marginBottom={{ xs: "0rem", md: "0rem" }}
                highlightWordsList={["Sakshm.ai"]}
                highlightWordsFontFamily="Samark !important"
                highlightWordsFontWeight="400"
              />
            </Box>
            {/* Illustrations  */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                marginTop: "2rem",
              }}
            >
              {data.modalData.map((data) => (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "2rem",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: "80px",
                      objectFit: "contain",
                    }}
                    image={data.image}
                    alt="landing page image"
                  />
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#142349",
                    }}
                  >
                    {data.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
          {/* Right side */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", md: "50%" },
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(handleSubmitData)}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                width: { xs: "100%", md: "80%" },
                margin: { xs: "auto", md: "auto 0 auto auto" },
              }}
            >
              {/* Name  */}
              <TextField
                label="Name*"
                size="small"
                placeholder="John Doe"
                type="text"
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              {/* Email  */}
              <TextField
                label="Email*"
                size="small"
                placeholder="johndoe@gmail.com"
                type="email"
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              {/* mobile number optional*/}
              <CustomPhoneField
                type="number"
                label="Mobile"
                placeholder="9876543210"
                size="small"
                {...register("mobile")}
              />
              {/* category  */}
              {/* <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Category"
                  name="category"
                  {...register("category")}
                >
                  <MenuItem value={"Candidate"}>Candidate</MenuItem>
                  <MenuItem value={"Company"}>Company</MenuItem>
                  <MenuItem value={"College/Institution"}>
                    College/Institution
                  </MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl> */}
              {/* Organisation/Institution name optional*/}
              <TextField
                label="Organisation/ Institution"
                size="small"
                placeholder="Organisation/ Institution"
                type="text"
                {...register("organisation")}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* <InputLabel shrink htmlFor="message">
                  How can we help you?
                </InputLabel> */}
                {/* message optional */}
                <FormControl variant="standard" size="small">
                  <OutlinedInput
                    placeholder="How can we get started?"
                    id="message"
                    multiline
                    rows={3}
                    {...register("message")}
                  />
                </FormControl>
              </Box>
              <Button
                size="large"
                variant="contained"
                type="submit"
                sx={{
                  width: "100%",
                  backgroundColor: "#2059EE",
                  color: "white",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#2059EE",
                  },
                }}
                disabled={isLoading}
              >
                <Typography
                  sx={{
                    fontWeight: "700",
                    fontSize: "18px",
                  }}
                >
                  Get in touch!
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </>
  );
};

export default GetStarted;
