import { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const useAdmin = (shouldCheck) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoadingAdmin, setIsLoadingAdmin] = useState(true);

  useEffect(() => {
    if (!shouldCheck) {
      setIsLoadingAdmin(false);
      return;
    }

    const checkAdmin = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users/isAdmin");
        setIsAdmin(response.data);
      } catch (error) {
        console.error("Error checking admin status", error);
        setIsAdmin(false);
      } finally {
        setIsLoadingAdmin(false);
      }
    };

    checkAdmin();
  }, [shouldCheck]);

  return { isAdmin, isLoadingAdmin };
};

export default useAdmin;
