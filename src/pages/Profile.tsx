import { signOut } from "firebase/auth";
import { auth } from "../configs/firebase";
import { useNavigate } from "react-router-dom";

type Props = {
  signOut: () => Promise<void>;
};
function Profile() {
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <button onClick={logOut}> Sign Out</button>
    </div>
  );
}

export default Profile;
