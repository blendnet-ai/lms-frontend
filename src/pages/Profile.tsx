import { signOut } from "firebase/auth";
import { auth } from "../configs/firebase";
import "./../styles/Profile.css";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Textarea } from "@mui/joy";
import UserDataAPI, { GetUserDataResponse } from "../apis/UserDataAPI";
import { Edit } from "@mui/icons-material";

function Profile() {
  const getProfileImage = (): string => {
    let profileImg = auth.currentUser?.photoURL;
    if (profileImg) {
      return profileImg;
    } else return "";
  };

  const getName = (): string => {
    let name = auth.currentUser?.displayName;
    if (name) {
      return name;
    } else return "";
  };

  const navigate = useNavigate();
  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const getEmail = (): string => {
    let email = auth.currentUser?.email;
    if (email) {
      return email;
    } else return "";
  };
  const getPhone = (): string => {
    let phoneNumber = auth.currentUser?.phoneNumber;
    if (phoneNumber) {
      return phoneNumber;
    } else return "";
  };

  const [data, setData] = useState<GetUserDataResponse | null>(null);

  const [gender, setGender] = useState<string>("");
  const [city, setCity] = useState<string | null>("");
  const [country, setCountry] = useState<string>("");
  const [interests, setInterests] = useState<string>("");
  const [languages, setLanguages] = useState<string>("");

  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const data = await UserDataAPI.getUserData();
      setData(data);
      if (data.gender) setGender(data.gender);
      if (data.city) setCity(data.city);
      if (data.country) setCountry(data.country);
      if (data.interests) setInterests(data.interests);
      if (data.languages) setLanguages(data.languages);
    })();
  }, []);

  const handleCancel = async () => {
    if (data) {
      if (data.gender) setGender(data.gender);
      else setGender("");
      if (data.city) setCity(data.city);
      else setCity("");
      if (data.country) setCountry(data.country);
      else setCountry("");
      if (data.interests) setInterests(data.interests);
      else setInterests("");
      if (data.languages) setLanguages(data.languages);
      else setLanguages("");
    }

    setIsEditing(false);
  };

  const handleSave = async () => {
    const newData = {
      gender: gender,
      city: city,
      country: country,
      interests: interests,
      languages: languages,
    };

    UserDataAPI.updateUserData(newData);
    setIsEditing(false);
  };

  const handleEditing = () => {
    setIsEditing(true);
  };

  return (
    <div className="Profile">
      {data && (
        <>
          <img className="profile-img" src={getProfileImage()} />
          <h2>{getName()}</h2>
          <div>{getEmail()}</div>
          <div>{getPhone()}</div>
          {!isEditing && (
            <Button
              startIcon={<Edit />}
              sx={{
                borderRadius: 10,
                textTransform: "none",
                alignSelf: "flex-end",
              }}
              variant="contained"
              onClick={handleEditing}
            >
              Edit
            </Button>
          )}

          {isEditing && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
                gap: "10px",
              }}
            >
              <Button
                sx={{
                  borderRadius: 10,
                  textTransform: "none",
                  width: "90%",
                }}
                variant="contained"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                sx={{
                  borderRadius: 10,
                  textTransform: "none",
                  width: "90%",
                }}
                variant="outlined"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          )}

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <div className="edit-form-item">Gender</div>
            </Grid>
            <Grid item xs={6}>
              <div className="edit-form-item">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  label="Age"
                  color="primary"
                  onChange={(event) => setGender(event.target.value)}
                  size="small"
                  disabled={!isEditing}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"other"}>Other</MenuItem>
                </Select>
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className="edit-form-item">City</div>
            </Grid>
            <Grid item xs={6}>
              <div className="edit-form-item">
                <TextField
                  size="small"
                  id="standard-basic"
                  disabled={!isEditing}
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className="edit-form-item">Country</div>
            </Grid>
            <Grid item xs={6}>
              <div className="edit-form-item">
                <TextField
                  size="small"
                  id="standard-basic"
                  disabled={!isEditing}
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className="edit-form-item">Interests</div>
            </Grid>
            <Grid item xs={6}>
              <div className="edit-form-item container">
                <Textarea
                  minRows={3}
                  disabled={!isEditing}
                  value={interests}
                  onChange={(event) => setInterests(event.target.value)}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className="edit-form-item">Languages</div>
            </Grid>
            <Grid item xs={6}>
              <div className="edit-form-item container">
                <Textarea
                  minRows={3}
                  value={languages}
                  disabled={!isEditing}
                  onChange={(event) => setLanguages(event.target.value)}
                />
              </div>
            </Grid>
          </Grid>
        </>
      )}
      {!data && <CircularProgress />}

      <Button variant="contained" onClick={logOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Profile;
