import { useContext } from "react";
import { Role, UserContext } from "../App";
import CourseProviderAdminHome from "./CourseProviderAdminHome";
import OthersHome from "./OthersHome";

const Home = () => {
  const { role } = useContext(UserContext);

  if (role == Role.COURSE_PROVIDER_ADMIN) {
    return <CourseProviderAdminHome />;
  } else {
    return <OthersHome />;
  }
};

export default Home;
