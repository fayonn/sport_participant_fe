import styles from './GymBrandAddingPage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {GymBrandForm} from "../../components/gymBrands/GymBrandForm";
import GymBrandService from "../../services/GymBrandService";
import {gymBrandsSelector, setCurrentGymBrand, setGymBrands} from "../../store/slices/gymBrandsSlice";
import '../../index.css'
import LocationService from "../../services/LocationService";
import {emptyLocation, setCurrentLocation, setLocations} from "../../store/slices/locationsSlice";

export const GymBrandAddingPage = () => {
  const dispatch = useDispatch();
  const {gymBrands} = useSelector(gymBrandsSelector)

  const handleSubmit = (data) => {
    GymBrandService.saveGymBrand(data)
      .then(({data}) => {
        dispatch(setGymBrands([...gymBrands, data]))
        dispatch(setCurrentGymBrand(data))
        LocationService.getAllByGymBrandId(data.id)
          .then(({data}) => {
            dispatch(setLocations(data))
            if (data.length > 0) dispatch(setCurrentLocation(data[0]))
            else dispatch(setCurrentLocation(emptyLocation))
          })
          .catch((err) => {
            console.log(err)
          })
      })
  }

  return (
    <div className="container">
      <GymBrandForm onSubmit={handleSubmit}/>
    </div>
  )
}