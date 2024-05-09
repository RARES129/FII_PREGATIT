import { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const LoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/users/isLoggedIn"
        );
        setIsLoggedIn(response.data);
      } catch (error) {
        console.error("Eroare la verificarea stării de conectare:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  return { isLoggedIn, isLoading };
};

export default LoggedIn;
