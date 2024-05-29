import { dividerClasses } from "@mui/material";
import Header from "../../components/Header";
import { HomeHeaderContent } from "../Home";
import { useEffect, useState } from "react";
import "./../../styles/eval/EvalSubmitted.css";
import { auth } from "../../configs/firebase";
import { useNavigate } from "react-router-dom";

export default function EvalSubmitted() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleHomeBtnClick = () => {
    navigate("/evaluation");
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user?.displayName) setName(user?.displayName);
    });
  }, []);

  return (
    <div className="EvalSubmitted">
      <Header
        content={
          <HomeHeaderContent
            heading={`Hi ${name},`}
            content="Your test has been submitted"
            profile={name.at(0)}
          />
        }
      />
      <div className="EvalSubmitted-content">
        <img
          className="EvalSubmitted-illustrations"
          src="/illustrations/eval-submitted.svg"
          alt=""
        />
        <div className="EvalSubmitted-heading">Thank you,</div>
        <div className="EvalSubmitted-des">
          Your test has been submitted. Your result will come soon
        </div>
        <button onClick={handleHomeBtnClick}>Home</button>
      </div>
    </div>
  );
}
