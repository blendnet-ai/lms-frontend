import Header from "../components/Header";
import "./../styles/Home.css";
import { auth } from "./../configs/firebase";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HamburgerMenu from "../components/HamburgerMenu";
import OnboardingAPI from "../apis/OnboardingAPI";
import { images } from "../assets";

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
  const [name, setName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user?.displayName) setName(user?.displayName);
    });
  }, []);

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
            heading={`Hi ${name},`}
            content="Let’s start learning"
            profile={name.at(0)}
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
