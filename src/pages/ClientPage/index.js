import {ClientList} from "../../components/clients/ClientList";
import {ClientForm} from "../../components/clients/ClientForm";
import {useState} from "react";
import {clientsSelector, emptyClient, setClients} from "../../store/slices/clientsSlice";
import ClientService from "../../services/ClientService";
import {useDispatch, useSelector} from "react-redux";
import {gymBrandsSelector} from "../../store/slices/gymBrandsSlice";
import {locationsSelector} from "../../store/slices/locationsSlice";
import {HealthSupplier} from "../../utils/constants/healthSupplier";
import styles from './ClientPage.module.css'
import {GENDER} from "../../utils/constants/gender";

export const ClientPage = () => {
  const dispatch = useDispatch();
  const {currentGymBrand} = useSelector(gymBrandsSelector)
  const {currentLocation} = useSelector(locationsSelector)
  const {clients} = useSelector(clientsSelector)
  const [client, setClient] = useState({
    ...emptyClient,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    country: "",
    city: "",
    phoneNumber: "",
    isDisabled: false,
    gender: GENDER.MALE
  })
  const [healthSupplier, setHealthSupplier] = useState(HealthSupplier.NONE)

  const handleChange = (data) => {
    setClient(data)
  }

  const handleSubmit = () => {
    ClientService.save({
      gymBrandId: currentGymBrand.id,
      client: {
        ...client,
        locationIds: [currentLocation.id],
        dob: client.dob.format('YYYY-MM-DD')
      },
      healthSupplier: healthSupplier,
    })
      .then(({data}) => {
        dispatch(setClients([...clients, data]))
      })
  }

  return (
    <div style={{display: "flex"}}>
      <ClientList/>
      <ClientForm
        client={client}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onChangeHealthSupplier={setHealthSupplier}
        healthSupplier={healthSupplier}
      />
    </div>
  );
}