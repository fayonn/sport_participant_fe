import {useDispatch, useSelector} from "react-redux";
import {DropDownList} from "../../styled/DropDownList";
import {activitiesSelector, setActivities} from "../../../store/slices/activitiesSlice";
import ActivityService from "../../../services/ActivityService";
import {gymBrandsSelector} from "../../../store/slices/gymBrandsSlice";
import {locationsSelector} from "../../../store/slices/locationsSlice";

export const ActivityList = (
  {
    current,
    onChange,
    showAddOption,
    showDeleteOption,
  }) => {
  const {activities} = useSelector(activitiesSelector)
  const {currentGymBrand} = useSelector(gymBrandsSelector)
  const {currentLocation} = useSelector(locationsSelector)
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    ActivityService.delete({
      gymBrandId: currentGymBrand.id,
      locationId: currentLocation.id,
      activityId: id,
    })
      .then(() => {
        const new_activities = activities.filter(item => item.id !== id)
        dispatch(setActivities(new_activities))
      })
  }

  return (
    <div>
      <p>Activities</p>
      <DropDownList
        values={activities.map(x => [x.id, x.title])}
        selected={[current.id, current.title]}
        onChange={onChange}
        showAddOption={showAddOption}
        onDelete={handleDelete}
        showDeleteOption={showDeleteOption}
      />
    </div>
  )
}