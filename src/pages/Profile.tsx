import { auth } from "../configs/firebase";
import "./../styles/Profile.css";

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

  return (
    <div className="Profile">
      <img className="profile-img" src={getProfileImage()} />
      <h2>{getName()}</h2>
      <div>{getEmail()}</div>
      <div>{getPhone()}</div>
    </div>
  );
}

export default Profile;
