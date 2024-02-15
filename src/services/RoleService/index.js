import api from "../../utils/axiosClient";

class RoleService {
  getRoles(user_id) {
    return api
      .get(`/users/${user_id}/roles`)
      .catch(err => {
        console.log(err)
      })
  }

  getListRoles() {
    return api
      .get(`/roles`)
      .catch(err => {
        console.log(err)
      })
  }
}

export default new RoleService();