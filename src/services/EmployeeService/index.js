import api from "../../utils/axiosClient";

class EmployeeService {
  save(gymBrandId, employee) {
    return api
      .post(`/gym_brands/${gymBrandId}/employees`, employee)
      .catch((err) => {
        console.log(err)
      })
  }

  getAll(gymBrandId) {
    return api
      .get(`/gym_brands/${gymBrandId}/employees`)
      .catch((err) => {
        console.log(err)
      })
  }

  delete({gymBrandId, employeeId}) {
    return api
      .delete(`/gym_brands/${gymBrandId}/employees/${employeeId}`)
      .catch((err) => {
        console.log(err)
      })
  }
}

export default new EmployeeService();