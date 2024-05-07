import { useState, useEffect } from "react";
import axios from "axios";

const LoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/users/isLoggedIn"
        );
        if (response.data === true) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoggedIn();
  }, [isLoggedIn]); // Re-run effect when isLoggedIn changes

  return isLoggedIn;
};

export default LoggedIn;
