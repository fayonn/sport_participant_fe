import api from "../../utils/axiosClient";


class ActivityService {

  getAllByLocationId({gymBrandId, locationId}) {
    return api
      .get(`/gym_brands/${gymBrandId}/locations/${locationId}/activities`)
      .catch(err => {
        console.log(err)
      })
  }

  save({gymBrandId, locationId, activity}) {
    return api
      .post(`/gym_brands/${gymBrandId}/locations/${locationId}/activities/without_price`, activity)
      .catch((err) => {
        console.log(err)
      })
  }

  delete({gymBrandId, locationId, activityId}) {
    return api
      .delete(`/gym_brands/${gymBrandId}/locations/${locationId}/activities/${activityId}`)
      .catch((err) => {
        console.log(err)
      })
  }

}

export default new ActivityService();