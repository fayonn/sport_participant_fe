import {useDispatch, useSelector} from "react-redux";
import {DropDownList} from "../../styled/DropDownList";
import {roomsSelector, setRooms} from "../../../store/slices/roomsSlice";
import RoomService from "../../../services/RoomService";
import {gymBrandsSelector} from "../../../store/slices/gymBrandsSlice";
import {locationsSelector} from "../../../store/slices/locationsSlice";
import {useEffect} from "react";

// todo Поперероблювати видалення в стор
export const RoomList = (
  {
    current,
    onChange,
    showAddOption,
    showDeleteOption,
  }) => {
  const {rooms} = useSelector(roomsSelector)
  const {currentGymBrand} = useSelector(gymBrandsSelector)
  const {currentLocation} = useSelector(locationsSelector)
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    RoomService.delete({
      gymBrandId: currentGymBrand.id,
      locationId: currentLocation.id,
      roomId: id,
    })
      .then(() => {
        dispatch(setRooms(rooms.filter(item => item.id !== id)))
      })
  }

  return (
    <div>
      <p>Rooms</p>
      <DropDownList
        values={rooms.map(x => [x.id, x.name])}
        selected={[current.id, current.name]}
        onChange={onChange}
        showAddOption={showAddOption}
        onDelete={handleDelete}
        showDeleteOption={showDeleteOption}
      />
    </div>
  )
}