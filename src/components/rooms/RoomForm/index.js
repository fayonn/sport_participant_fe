import {useState} from "react";
import {LabeledInput} from "../../styled/LabeledInput";
import {emptyRoom} from "../../../store/slices/roomsSlice";

export const RoomForm = (
  {
    onSubmit
  }) => {

  const [room, setRoom] = useState({
    ...emptyRoom,
    name: "",
    description: "",
    roomNumber: 0,
    capacity: 0,
  });

  const handleActivityChange = (e) => {
    setRoom({
      ...room,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(room)
  }

  return (
    <form onSubmit={handleSubmit}>
      <LabeledInput id="name" name="name" type="text" value={room.name}
                    onChange={handleActivityChange} labelText="Name: " required={true}
      />

      <LabeledInput id="description" name="description" type="text" value={room.description}
                    onChange={handleActivityChange} labelText="Description: " required={true}
      />

      <LabeledInput id="roomNumber" name="roomNumber" type="number" value={room.roomNumber}
                    onChange={handleActivityChange} labelText="Room number: " required={true}
      />

      <LabeledInput id="capacity" name="capacity" type="number" value={room.capacity}
                    onChange={handleActivityChange} labelText="Capacity: " required={true}
      />

      <button type="submit">Add room</button>
    </form>
  )
}