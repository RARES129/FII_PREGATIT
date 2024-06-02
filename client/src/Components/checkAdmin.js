import { useState, useEffect, useRef } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoadingAdmin, setIsLoadingAdmin] = useState(true);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return;
    const checkAdmin = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users/isAdmin");
        setIsAdmin(response.data);
      } catch (error) {
        console.error("Eroare la verificarea stării de admin", error);
        setIsAdmin(false);
      } finally {
        setIsLoadingAdmin(false);
      }
    };

    checkAdmin();
    effectRan.current = true;
  }, []);

  return { isAdmin, isLoadingAdmin };
};

export default Admin;
