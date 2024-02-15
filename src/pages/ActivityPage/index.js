import {ActivityForm} from "../../components/activities/ActivityForm";
import {useDispatch, useSelector} from "react-redux";
import {activitiesSelector, setActivities} from "../../store/slices/activitiesSlice";
import {gymBrandsSelector} from "../../store/slices/gymBrandsSlice";
import {locationsSelector} from "../../store/slices/locationsSlice";
import ActivityService from "../../services/ActivityService";
import {ActivityList} from "../../components/activities/ActivityList";
import {useEffect, useState} from "react";

export const ActivityPage = () => {
  const {activities} = useSelector(activitiesSelector)
  const {currentGymBrand} = useSelector(gymBrandsSelector)
  const {currentLocation} = useSelector(locationsSelector)
  const [currentActivity, setCurrentActivity] = useState(null)

  const dispatch = useDispatch()

  const handleSubmit = (data) => {
    ActivityService.save({
      gymBrandId: currentGymBrand.id,
      locationId: currentLocation.id,
      activity: {...data, locationId: currentLocation.id},
    })
      .then(({data}) => {
        dispatch(setActivities([...activities, data]))
      })
  }

  const handleChangeActivity = (activity) => {
    setCurrentActivity(activities.filter(x => x.id === activity[0])[0])
  }

  useEffect(() => {
    setCurrentActivity(activities.length > 0 ? activities[0] : null)
  }, [activities])

  useEffect(() => {
    if (currentGymBrand.id && currentLocation.id) {
      ActivityService.getAllByLocationId({
        gymBrandId: currentGymBrand.id,
        locationId: currentLocation.id,
      }).then(({data}) => {
        dispatch(setActivities(data))
        setCurrentActivity(data[0])
      })
    }
    else {
      dispatch(setActivities([]))
      setCurrentActivity(null)
    }
  }, [currentLocation.id])

  return (
    <div>
      <ActivityForm
        onSubmit={handleSubmit}
      />
      {activities.length > 0 && currentActivity && (
        <ActivityList
          current={currentActivity}
          onChange={handleChangeActivity}
          showAddOption={false}
          showDeleteOption={true}
        />
      )}
    </div>
  )
}