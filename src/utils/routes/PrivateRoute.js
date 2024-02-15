import {Navigate, Outlet} from "react-router-dom";
import LocalStorageService from "../../services/LocalStorageService";

export const PrivateRoute = () => {
  const isAuth = LocalStorageService.getValue("token")
  return isAuth ? <Outlet/> : <Navigate to="/login" replace/>
}