import {DropDownList} from "../../styled/DropDownList";
import {useDispatch, useSelector} from "react-redux";
import {emptyLocation, locationsSelector, setCurrentLocation, setLocations} from "../../../store/slices/locationsSlice";
import {useNavigate} from "react-router-dom";
import {useUserRoles} from "../../../utils/hooks/useUserRoles";
import {useHasAuthority} from "../../../utils/hooks/useHasAuthority";
import {ROLE} from "../../../store/slices/rolesSlice";
import {gymBrandsSelector} from "../../../store/slices/gymBrandsSlice";
import LocationService from "../../../services/LocationService";
import RoomService from "../../../services/RoomService";
import {setRooms} from "../../../store/slices/roomsSlice";
import ClientService from "../../../services/ClientService";
import {setClients} from "../../../store/slices/clientsSlice";
import ActivityService from "../../../services/ActivityService";
import {setActivities} from "../../../store/slices/activitiesSlice";

export const LocationNavList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasAuthority = useHasAuthority(useUserRoles())
  const {currentGymBrand} = useSelector(gymBrandsSelector)
  const {locations, currentLocation} = useSelector(locationsSelector)

  const addLocation = () => {navigate("/locations")}

  const handleDelete = (id) => {
    LocationService.delete({
      gymBrandId: currentGymBrand.id,
      locationId: id
    })
      .then(() => {
        const locs = locations.filter(item => item.id !== id)
        dispatch(setLocations(locs))
        if (currentGymBrand.id === id) {
          if (locs.length > 0) dispatch(setCurrentLocation(locs[0]))
          else setCurrentLocation(emptyLocation)
        }
      })
  }

  const handleLocationListOnChange = (item) => {
    const current = locations.filter(x => x.id === item[0])[0]
    dispatch(setCurrentLocation(current))

    // todo gymbrandId?
    RoomService.getAllByLocationId({
      gymBrandId: currentGymBrand.id,
      locationId: current.id,
    }).then(({data}) => {
      dispatch(setRooms(data))
    })
    // todo gymbrandId?
    ClientService.getAllByLocationId({
      gymBrandId: currentGymBrand.id,
      locationId: current.id,
    }).then(({data}) => {
      dispatch(setClients(data))
    })
    // todo gymbrandId?
    ActivityService.getAllByLocationId({
      gymBrandId: currentGymBrand.id,
      locationId: current.id,
    }).then(({data}) => {
      dispatch(setActivities(data))
    })
  }

  return (
    <div>
      {(hasAuthority([ROLE.OWNER, ROLE.ADMIN]) && locations.length > 0) ? (
        <DropDownList
          onChange={handleLocationListOnChange}
          values={locations.map(item => ([item.id, item.street + " " + item.streetNumber]))}
          selected={[currentLocation.id, currentLocation.street + " " + currentLocation.streetNumber]}
          showAddOption={hasAuthority([ROLE.OWNER, ROLE.ADMIN])}
          labelAddOption={"Add location"}
          handleAdd={addLocation}
          onDelete={handleDelete}
          showDeleteOption={hasAuthority([ROLE.OWNER, ROLE.ADMIN])}
        />
      ) : (hasAuthority([ROLE.OWNER, ROLE.ADMIN])) ? (
        <button onClick={addLocation}>
          <p>Add location</p>
        </button>
      ) : locations.length > 0 ? (
        <p>{currentLocation.street + " " + currentLocation.streetNumber}</p>
      ) : (
        <p>NO LOCATION</p>
      )
      }
    </div>
  )
}