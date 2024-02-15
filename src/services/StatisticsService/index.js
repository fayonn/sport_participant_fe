import api from "../../utils/axiosClient";


class StatisticsService {
  get({gymBrandId, locationId}) {
    return api
      .get(`/gym_brands/${gymBrandId}/locations/${locationId}/statistics`)
      .catch((err) => {
        console.log(err)
      })
  }
}

export default new StatisticsService();