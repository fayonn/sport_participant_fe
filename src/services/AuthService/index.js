import api from "../../utils/axiosClient";
import LocalStorageService from "../LocalStorageService";

class AuthService {
  constructor() {
    this.localStorageService = LocalStorageService
  }

  registerOwner(owner) {
    return api
      .post("/auth/register", owner)
      .then(({data}) => {
        this.localStorageService.setValue('token', data?.accessToken)
        this.localStorageService.setValue('refreshToken', data?.refreshToken)
      })
      .catch(err => {
        console.log(err)
      })
  }

  login(email, password) {
    return api
      .post('/auth/login', {email: email, password: password})
      .then(({data}) => {
        this.localStorageService.setValue('token', data?.accessToken)
        this.localStorageService.setValue('refreshToken', data?.refreshToken)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export default new AuthService();