import {rolesSelector} from "../../store/slices/rolesSlice";
import {useSelector} from "react-redux";

export const useUserRoles = () => {
  const {roles} = useSelector(rolesSelector)
  return roles.map(role => role.name);
}