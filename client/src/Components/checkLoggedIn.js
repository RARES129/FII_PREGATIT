// checkLoggedIn.js
import { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const LoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // Include withCredentials: true pentru a trimite cookie-urile cu cererea
        const response = await axios.get(
          "http://localhost:4000/users/isLoggedIn"
        );
        setIsLoggedIn(response.data); // Setează isLoggedIn pe baza răspunsului
      } catch (error) {
        console.error("Eroare la verificarea stării de conectare:", error);
        setIsLoggedIn(false); // Setează isLoggedIn la false în caz de eroare
      }
    };

    checkLoggedIn();
  }, []); // Matricea de dependență este goală, deci acest efect rulează doar o dată când componenta este montată

  return isLoggedIn; // Returnează variabila de stare
};

export default LoggedIn;
