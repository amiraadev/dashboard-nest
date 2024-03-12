import { Outlet, Navigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import { StateProps, User } from "types";

const ProtectedRoutes = () => {
  const user: User | null = useSelector((state: StateProps) => state.user);
  return <div>{user ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default ProtectedRoutes;
