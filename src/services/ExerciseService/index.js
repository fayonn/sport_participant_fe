import api from "../../utils/axiosClient";


class ExerciseService {
  getAllByDisability({disability, page, size}) {
    return api
      .get(`/guides?disability=${disability}&page=${page}&size=${size}`)
      .catch((err) => {
        console.log(err)
      })
  }
}

export default new ExerciseService();