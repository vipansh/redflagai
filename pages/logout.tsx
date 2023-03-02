import { useEffect } from "react";
import { useUser } from "../context/UserContext";

const logout = () => {
  const { logout } = useUser();
  useEffect(() => {
    logout();
  }, []);

  return <div>logout</div>;
};

export default logout;
