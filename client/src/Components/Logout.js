import { useState } from "react";
import axios from "axios";

const Logout = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:4000/users/logout");
      if (response.status === 200) {
        setIsLoggedOut(true);
      }
    } catch (error) {
      console.error("Error logging out:", error);
      setIsLoggedOut(false);
    }
  };

  handleLogout();
};

export default Logout;
