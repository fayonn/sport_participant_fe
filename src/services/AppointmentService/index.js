import api from "../../utils/axiosClient";


class AppointmentService {

  getAppointmentAvailableHours({gymBrandId, locationId, date, coachId}) {
    return api
      .get(`/gym_brands/${gymBrandId}/locations/${locationId}/appointments_available_hours?date=${date}&coachId=${coachId}`)
      .catch(err => {
        console.log(err)
      })
  }

  saveAppointment(gymBrandId, locationId, appointment) {
    return api
      .post(`/gym_brands/${gymBrandId}/locations/${locationId}/appointments`, appointment)
      .catch((err) => {
        console.log(err)
      })
  }

  getAllByDateAndCoachId({gymBrandId, locationId, date, coachId}) {
    return api
      .get(`/gym_brands/${gymBrandId}/locations/${locationId}/appointments?date=${date}&coachId=${coachId}`)
      .catch(err => {
        console.log(err)
      })
  }

  delete({gymBrandId, locationId, appointmentId}) {
    return api
      .delete(`/gym_brands/${gymBrandId}/locations/${locationId}/appointments/${appointmentId}`)
      .catch((err) => {
        console.log(err)
      })
  }
}

export default new AppointmentService();