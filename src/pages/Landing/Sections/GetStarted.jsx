import {
  Box,
  Button,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DisplayTextImage from "../Components/DisplayTextImage";
import { images } from "../../../assets";
import data from "../data";
import "../landing.css";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomPhoneField = styled(TextField)(({ theme }) => ({
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

const GetStarted = ({ maxWidth = "100%", outerPadding = "0" }) => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      category: "",
      organisation: "",
      message: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const submitData = async (formData) => {
    const urlGoogleSheets =
      "https://script.google.com/macros/s/AKfycbxSC6R8AY_BRVdqHF2myilmtX6hIW86UZHntAjpi1kXUpJZEf_-Q_9lSNjTg31aZHE1/exec";

    try {
      setIsLoading(true);
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }

      const response = await fetch(urlGoogleSheets, {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        setIsLoading(false);
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
        alert("Error submitting data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting data");
      setIsLoading(false);
    }

    form.reset();
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
          backgroundImage: `url(${images.backgroundLanding})`,
          padding: outerPadding,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "100%",
            borderRadius: "10px",
            backgroundColor: "white",
            padding: { xs: "2rem", md: "2rem 4rem" },
            maxWidth: maxWidth,
            margin: "auto",
          }}
        >
          {/* Left side */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              width: "50%",
            }}
          >
            <DisplayTextImage
              text="Get Started to power your students with Sakshm.ai!"
              fontSize={{ xs: "1rem", md: "28px" }}
              fontWeight="600"
              textWidth={{ xs: "100%", md: "100%" }}
              marginTop={{ xs: "0rem", md: "0rem" }}
              marginBottom={{ xs: "0rem", md: "0rem" }}
              highlightWords={["Sakshm.ai!"]}
              highlightWordsFontFamily="Samark !important"
            />
            {/* Illustrations  */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                marginTop: "2rem",
              }}
            >
              {data.modalData.map((data, idx) => (
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
              onSubmit={handleSubmit(submitData)}
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
                name="name"
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
                name="email"
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
                name="mobile"
                label="Mobile Number"
                placeholder="9876543210"
                size="small"
                {...register("mobile")}
              />
              {/* category  */}
              <FormControl fullWidth size="small">
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
              </FormControl>
              {/* Organisation/Institution name optional*/}
              <TextField
                label="Organisation/ Institution name"
                name="organisation"
                size="small"
                placeholder="Organisation/ Institution name"
                type="text"
                {...register("organisation")}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <InputLabel shrink htmlFor="message">
                  How can we help you?
                </InputLabel>
                {/* message optional */}
                <FormControl variant="standard" size="small">
                  <OutlinedInput
                    placeholder="Message"
                    name="message"
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
