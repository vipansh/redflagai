import { useEffect } from "react";
import { useUser } from "../context/UserContext";

const logout = () => {
  const { logout, loading } = useUser();
  useEffect(() => {
    console.log("calling logout function", logout);
    logout();
  }, [loading]);

  return <div>logout</div>;
};

export default logout;
