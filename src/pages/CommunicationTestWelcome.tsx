import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./../styles/CommunicationTestWelcome.css";
import { HomeHeaderContent } from "./Home";
import { auth } from "../configs/firebase";

function CommunicationTestWelcome() {
  const [name, setName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user?.displayName) setName(user?.displayName);
    });
  }, []);

  return (
    <div className="CommunicationTestWelcome">
      <Header
        content={
          <HomeHeaderContent
            heading={`Hi ${name},`}
            content="Welcome to communication test"
            profile={name.at(0)}
          />
        }
      />
      <div className="comm-test-wel-content">
        <img
          className="comm-test-wel-illustration"
          src={`/illustrations/communication-skills.svg`}
          alt=""
        />
        <div className="comm-test-wel-content-heading">
          Welcome to your Communication test
        </div>
        <div className="comm-test-wel-content-des">
          <div className="comm-test-wel-content-des-inner">
            This test will have total 4 sections. Speaking, reading writing,
            reading, listening. each section will have 20 questions. 30 mins for
            each section.
          </div>
        </div>
        <button>Take a test</button>
      </div>
    </div>
  );
}

export default CommunicationTestWelcome;
