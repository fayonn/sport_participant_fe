import api from "../../utils/axiosClient";


class RoomService {

  getAllByLocationId({gymBrandId, locationId}) {
    return api
      .get(`/gym_brands/${gymBrandId}/locations/${locationId}/rooms`)
      .catch(err => {
        console.log(err)
      })
  }

  save({gymBrandId, locationId, room}) {
    return api
      .post(`/gym_brands/${gymBrandId}/locations/${locationId}/rooms`, room)
      .catch((err) => {
        console.log(err)
      })
  }

  delete({gymBrandId, locationId, roomId}) {
    return api
      .delete(`/gym_brands/${gymBrandId}/locations/${locationId}/rooms/${roomId}`)
      .catch((err) => {
        console.log(err)
      })
  }
}

export default new RoomService();