import { useEffect } from "react";
import { useUser } from "../context/UserContext";
const Login = () => {
  const { login } = useUser();

  useEffect(() => {
    login();
  }, []);

  return <div>login</div>;
};

export default Login;
