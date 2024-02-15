import styles from './LocationAddingPage.module.css'
import {useDispatch, useSelector} from "react-redux";
import '../../index.css'
import {emptyLocation, locationsSelector, setCurrentLocation, setLocations} from "../../store/slices/locationsSlice";
import {LocationForm} from "../../components/locations/LocationForm";
import LocationService from "../../services/LocationService";
import {useEffect, useState} from "react";
import {useDays} from "../../utils/hooks/useDays";
import {emptyLocationSchedule, setSchedules} from "../../store/slices/locationScheduleSlice";
import moment from "moment";
import {gymBrandsSelector} from "../../store/slices/gymBrandsSlice";

export const LocationAddingPage = () => {
  const dispatch = useDispatch();
  const days = useDays()
  const {locations} = useSelector(locationsSelector)
  const [schedule, setSchedule] = useState([])
  const {currentGymBrand} = useSelector(gymBrandsSelector)
  const [locationData, setLocationData] = useState({
    ...emptyLocation,
    street: "",
    streetNumber: 0,
    capacity: 0,
    gymBrandId: currentGymBrand.id
  })

  useEffect(() => {
    const initSchedule = []
    days.forEach((x) => {
      initSchedule.push({
        ...emptyLocationSchedule,
        day: x,
        isWeekend: false,
        openTime: moment(),
        closeTime: moment().add(moment.duration(9, "hours")),
      })
    })
    setSchedule(initSchedule)
  }, [])

  const handleSubmit = () => {
    LocationService.saveLocation(locationData.gymBrandId, locationData)
      .then(({data}) => {
        dispatch(setLocations([...locations, data]))
        dispatch(setCurrentLocation(data))
        LocationService.saveLocationSchedule(data.gymBrandId, data.id, schedule)
          .then(({data}) => {
            dispatch(setSchedules(data))
          })
      })
  }

  const handleChange = (location, schedule) => {
    setLocationData(location)
    setSchedule(schedule)
  }

  return (
    <div className="container">
      <LocationForm
        onChange={handleChange}
        onSubmit={handleSubmit}
        location={locationData}
        schedule={schedule}
      />
    </div>
  )
}