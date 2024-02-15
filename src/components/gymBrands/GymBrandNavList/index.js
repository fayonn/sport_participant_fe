import {DropDownList} from "../../styled/DropDownList";
import {useDispatch, useSelector} from "react-redux";
import {gymBrandsSelector, setCurrentGymBrand, setGymBrands} from "../../../store/slices/gymBrandsSlice";
import LocationService from "../../../services/LocationService";
import {emptyLocation, setCurrentLocation, setLocations} from "../../../store/slices/locationsSlice";
import {useNavigate} from "react-router-dom";
import {ROLE} from "../../../store/slices/rolesSlice";
import {useHasAuthority} from "../../../utils/hooks/useHasAuthority";
import {useUserRoles} from "../../../utils/hooks/useUserRoles";
import {setEmployees} from "../../../store/slices/employeeSlice";
import EmployeeService from "../../../services/EmployeeService";
import GymBrandService from "../../../services/GymBrandService";
import ClientService from "../../../services/ClientService";
import {setClients} from "../../../store/slices/clientsSlice";
import {setStatistics} from "../../../store/slices/statistacsSlice";

export const GymBrandNavList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasAuthority = useHasAuthority(useUserRoles())
  const {gymBrands, currentGymBrand} = useSelector(gymBrandsSelector)

  const addGymBrand = () => {
    navigate("/gym-brands")
  }

  const handleDelete = (id) => {
    GymBrandService.delete({
      gymBrandId: currentGymBrand.id,
    })
      .then(() => {
        const brands = gymBrands.filter(item => item.id !== id)
        dispatch(setGymBrands(brands))
        if (currentGymBrand.id === id) {
          handleGymBrandListOnChange([brands[0].id])
        }
      })
  }

  const handleGymBrandListOnChange = (item) => {
    dispatch(setStatistics(null))
    dispatch(setCurrentLocation(emptyLocation))
    const current = gymBrands.filter(x => x.id === item[0])[0]
    dispatch(setCurrentGymBrand(current))
    LocationService.getAllByGymBrandId(current.id)
      .then(({data}) => {
        dispatch(setLocations(data))
        if (data.length > 0) {
          dispatch(setCurrentLocation(data[0]))
          ClientService.getAllByLocationId({
            gymBrandId: current.id,
            locationId: data[0].id,
          })
            .then(({data}) => {
              dispatch(setClients(data))
            })
        }
        else {
          dispatch(setCurrentLocation(emptyLocation))
          dispatch(setClients([]))
        }
      })
      .catch((err) => {
        console.log(err)
      })
    EmployeeService.getAll(current.id)
      .then(({data}) => {
        dispatch(setEmployees(data))
      })
  }

  return (
    <div>
      {(hasAuthority([ROLE.OWNER]) && gymBrands.length > 0) ? (
        <DropDownList
          onChange={handleGymBrandListOnChange}
          values={gymBrands.map(item => ([item.id, item.name]))}
          selected={[currentGymBrand.id, currentGymBrand.name]}
          showAddOption={hasAuthority([ROLE.OWNER])}
          labelAddOption={"Add gym brand"}
          handleAdd={addGymBrand}
          onDelete={handleDelete}
          showDeleteOption={hasAuthority([ROLE.OWNER])}
        />
      ) : hasAuthority([ROLE.OWNER]) ? (
        <button onClick={addGymBrand}>
          <p>Add gym brand</p>
        </button>
      ) : gymBrands.length > 0 ? (
        <p>{currentGymBrand.name}</p>
      ) : (
        <p>NO GYM BRAND</p>
      )
      }
    </div>
  )
}