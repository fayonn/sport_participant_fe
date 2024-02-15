import api from "../../utils/axiosClient";


class LocationService {

  getAllByGymBrandId(gymBrandId) {
    return api
      .get(`/gym_brands/${gymBrandId}/locations`)
      .catch((err) => {
        console.log(err)
      })
  }

  saveLocation(gymBrandId, location) {
    return api
      .post(`/gym_brands/${gymBrandId}/locations`, location)
      .catch((err) => {
        console.log(err)
      })
  }

  saveLocationSchedule(gymBrandId, locationId, schedules) {
    return api
      .post(`/gym_brands/${gymBrandId}/locations/${locationId}/schedules`, schedules)
      .catch((err) => {
        console.log(err)
      })
  }

  delete({gymBrandId, locationId}) {
    return api
      .delete(`/gym_brands/${gymBrandId}/locations/${locationId}`)
      .catch((err) => {
        console.log(err)
      })
  }
}

export default new LocationService();