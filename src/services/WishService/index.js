import api from "../../utils/axiosClient";


class WishService {

  save(wish, gymBrandName) {
    return api
      .post(`/wishes?gymBrandName=${gymBrandName}`, wish)
      .catch((err) => {
        console.log(err)
      })
  }

  update({gymBrandId, wishId, wish}) {
    return api
      .put(`/gym_brands/${gymBrandId}/wishes/${wishId}`, wish)
      .catch((err) => {
        console.log(err)
      })
  }

  get(id) {
    return api
      .get(`/wishes/${id}`)
      .catch((err) => {
        console.log(err)
      })
  }

  // getAll({status, page, size}) {
  //   return api
  //     .get(`/wishes?status=${status}&page=${page}&size=${size}`)
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  getAll({gymBrandId, page, size}) {
    return api
      .get(`/gym_brands/${gymBrandId}/wishes?page=${page}&size=${size}`)
      .catch((err) => {
        console.log(err)
      })
  }
}

export default new WishService();