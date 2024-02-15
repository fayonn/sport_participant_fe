import api from "../../utils/axiosClient";

class MedicalHistoryService {
  get({gymBrandId, clientId}) {
    return api
      .get(`/gym_brands/${gymBrandId}/clients/${clientId}/medical_history`)
  }
}

export default new MedicalHistoryService();