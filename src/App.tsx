import React, { useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Learning from "./pages/Learning";

function App() {
  const [urlInputValue, setURLInputValue] = useState("");
  const [validURL, setValidURL] = useState(
    "https://www.youtube.com/watch?v=wjZofJX0v4M"
  );

  const validateAndSetURL = (url: string) => {
    if (isValidYoutubeUrl(url)) {
      setValidURL(url);
    }
  };

  return (
    <div className="App">
      {validURL == "" && (
        <div>
          <TextField
            id="outlined-basic"
            label="Youtube Video URL"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setURLInputValue(event.target.value);
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              validateAndSetURL(urlInputValue);
            }}
          >
            Done
          </Button>
        </div>
      )}
      {validURL != "" && <Learning url={validURL} />}
    </div>
  );
}

function isValidYoutubeUrl(url: string) {
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=)[\w-]{11}$/;

  return youtubeRegex.test(url);
}

export default App;
