import api from "../../utils/axiosClient";

class OwnerService {
  getOwner(id) {
    return api.get(`/owners/${id}`)
  }
}

export default new OwnerService();