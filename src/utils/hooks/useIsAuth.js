import LocalStorageService from "../../services/LocalStorageService";

export const useIsAuth = () => {
  return !!LocalStorageService.getValue("token");
}