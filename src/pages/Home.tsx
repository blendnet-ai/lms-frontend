import Header from "../components/Header";
import "./../styles/Home.css";
import { auth } from "./../configs/firebase";
import { useEffect, useState } from "react";

export function HomeHeaderContent() {
  const [name, setName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user?.displayName) setName(user?.displayName);
    });
  }, []);

  return (
    <div className="home-header">
      <div className="home-header-text-container">
        <h1>Hi {name},</h1>
        <div className="home-header-text">Lets start learning</div>
      </div>
      <div className="profle-container">{name.at(0)}</div>
    </div>
  );
}
function Home() {
  return (
    <div className="Home">
      <Header content={<HomeHeaderContent />} />
      <img
        className="home-illustraion"
        src="/illustrations/home.svg"
        alt=""
        // style={{ width: "24px" }}
      />
      <h2 className="home-text">Get one step closer to your dream job!</h2>
      <div className="home-button-container">
        <button>Start evaluation</button>
        <button disabled className="button-disabled">
          View your report
        </button>
      </div>
    </div>
  );
}

export default Home;
