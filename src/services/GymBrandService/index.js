import api from "../../utils/axiosClient";


class GymBrandService {

  saveGymBrand(gymBrand) {
    return api
      .post("/gym_brands", gymBrand)
      .catch(err => {
        console.log(err)
      })
  }

  getAllUserGymBrands(userId) {
    return api
      .get(`/gym_brands?user_id=${userId}`)
      .catch((err) => {
        console.log(err)
      })
  }

  delete({gymBrandId}) {
    return api
      .delete(`/gym_brands/${gymBrandId}`)
      .catch((err) => {
        console.log(err)
      })
  }
}

export default new GymBrandService();