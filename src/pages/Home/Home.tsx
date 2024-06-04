import Header from "../../components/Header/Header";
import "./Home.css";
import { auth } from "../../configs/firebase";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HamburgerMenu from "../../components/HamburgerMenu/HamburgerMenu";
import OnboardingAPI from "../../apis/OnboardingAPI";
import { images } from "../../assets";
import useUserData from "../../hooks/useUserData";
import formatName from "../../utils/formatName";

type HomeHeaderContentProps = {
  heading: string;
  content: string;
  profile?: string;
};

export function HomeHeaderContent(props: HomeHeaderContentProps) {
  return (
    <div className="home-header">
      <HamburgerMenu />
      <div className="home-header-text-container">
        <h1>{props.heading}</h1>
        <div className="home-header-text">{props.content}</div>
      </div>
      <div className="profle-container-outer">
        <div className="profle-container">{props.profile}</div>
      </div>
    </div>
  );
}

function Home() {
  const { state } = useLocation();

  const { name } = useUserData();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let hasOnboarded = await OnboardingAPI.getOnboardingStatus();

      if (state) {
        hasOnboarded = hasOnboarded || state.hasOnboarded;
      }

      if (!hasOnboarded) {
        navigate("/onboarding");
      }
    })();
  }, []);

  const navigateToEval = () => {
    navigate(`/evaluation`);
  };

  const navigateToReport = () => {
    navigate(`/report`);
  };

  return (
    <div className="Home">
      <Header
        content={
          <HomeHeaderContent
            heading={`Hi ${name && formatName(name, true, false, 0, 0, 0, 1)},`}
            content="Let’s start learning"
            profile={name ? name.charAt(0).toUpperCase() : ""}
          />
        }
      />
      <img
        className="home-illustraion"
        src={images.homeImage}
        alt=""
        // style={{ width: "24px" }}
      />
      <h2 className="home-text">Get one step closer to your dream job!</h2>
      <div className="home-button-container">
        <button onClick={navigateToEval}>Start evaluation</button>
        <button onClick={navigateToReport}>View your report</button>
      </div>
    </div>
  );
}

export default Home;
