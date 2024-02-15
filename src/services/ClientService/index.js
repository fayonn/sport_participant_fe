import api from "../../utils/axiosClient";


class ClientService {

  getAllByLocationId({gymBrandId, locationId}) {
    return api
      .get(`/gym_brands/${gymBrandId}/clients?location_id=${locationId}`)
      .catch(err => {
        console.log(err)
      })
  }

  save({gymBrandId, client, healthSupplier}) {
    return api
      .post(`/gym_brands/${gymBrandId}/clients?health_supplier=${healthSupplier}`, client)
      .catch((err) => {
        console.log(err)
      })
  }

  delete({gymBrandId, clientId}) {
    return api
      .delete(`/gym_brands/${gymBrandId}/clients/${clientId}`)
      .catch((err) => {
        console.log(err)
      })
  }
}

export default new ClientService();