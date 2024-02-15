import api from "../../utils/axiosClient";

class UserService {
  getUser(id) {
    return api.get(`/users/${id}`)
  }
}

export default new UserService();