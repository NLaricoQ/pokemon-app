import { Navigate, Outlet } from "react-router-dom";
import useUserName from "../hooks/useUserName";

const ProtectedRoute = () => {
  const { userName } = useUserName();
  return <>{userName ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedRoute;
