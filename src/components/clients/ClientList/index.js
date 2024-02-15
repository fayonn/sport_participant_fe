import {useDispatch, useSelector} from "react-redux";
import {clientsSelector, setClients} from "../../../store/slices/clientsSlice";
import {ClientListItem} from "../ClientListItem";
import {locationsSelector} from "../../../store/slices/locationsSlice";
import {useEffect} from "react";
import ClientService from "../../../services/ClientService";
import {gymBrandsSelector} from "../../../store/slices/gymBrandsSlice";

export const ClientList = () => {
  const {clients} = useSelector(clientsSelector)
  const {currentGymBrand} = useSelector(gymBrandsSelector)
  const {currentLocation} = useSelector(locationsSelector)
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentGymBrand.id && currentLocation.id) {
      ClientService.getAllByLocationId({
        gymBrandId: currentGymBrand.id,
        locationId: currentLocation.id,
      })
        .then(({data}) => {
          dispatch(setClients(data))
        })
    }
    else {dispatch(setClients([]))}
  }, [currentLocation.id])

  const handleDelete = (id) => {
    ClientService.delete({
      gymBrandId: currentGymBrand.id,
      clientId: id
    }).then(() => {
      dispatch(setClients(clients.filter(item => item.id !== id)))
    })
  }

  return (
    <div style={{flexBasis: "60%"}}>
      {clients.map(x => (
        <ClientListItem
          key={x.id}
          client={x}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}