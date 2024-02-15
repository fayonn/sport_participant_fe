import {useDispatch, useSelector} from "react-redux";
import {gymBrandsSelector} from "../../store/slices/gymBrandsSlice";
import {locationsSelector} from "../../store/slices/locationsSlice";
import {roomsSelector, setRooms} from "../../store/slices/roomsSlice";
import {RoomForm} from "../../components/rooms/RoomForm";
import RoomService from "../../services/RoomService";
import {RoomList} from "../../components/rooms/RoomList";
import {useState, useEffect} from "react";

export const RoomPage = () => {
  const {rooms} = useSelector(roomsSelector)
  const {currentGymBrand} = useSelector(gymBrandsSelector)
  const {currentLocation} = useSelector(locationsSelector)
  const [currentRoom, setCurrentRoom] = useState(null)
  const dispatch = useDispatch()

  const handleSubmit = (data) => {
    RoomService.save({
      gymBrandId: currentGymBrand.id,
      locationId: currentLocation.id,
      room: {...data, locationId: currentLocation.id},
    })
      .then(({data}) => {
        dispatch(setRooms([...rooms, data]))
    })
  }

  const handleChangeRoom = (room) => {
    setCurrentRoom(rooms.filter(x => x.id === room[0])[0])
  }

  useEffect(() => {
    setCurrentRoom(rooms.length > 0 ? rooms[0] : null)
  }, [rooms])

  useEffect(() => {
    if (currentGymBrand.id && currentLocation.id) {
      RoomService.getAllByLocationId({
        gymBrandId: currentGymBrand.id,
        locationId: currentLocation.id,
      }).then(({data}) => {
        dispatch(setRooms(data))
        setCurrentRoom(data[0])
      })
    }
    else {
      dispatch(setRooms([]))
      setCurrentRoom(null)
    }
  }, [currentLocation.id])

  return (
    <div>
      <RoomForm
        onSubmit={handleSubmit}
      />
      {rooms.length > 0 && currentRoom && (
        <RoomList
          current={currentRoom}
          onChange={handleChangeRoom}
          showAddOption={false}
          showDeleteOption={true}
        />
      )}
    </div>
  )
}