import { useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const Logout = () => {
  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.post("http://localhost:4000/users/logout");
        window.location.href = "/login";
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    handleLogout();
  }, []);

  return null;
};

export default Logout;
