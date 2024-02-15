import {useState, useEffect} from "react";
import {LabeledInput} from "../../styled/LabeledInput";
import {List, ListSubheader} from "@mui/material";
import {LocationScheduleListItem} from "../LocationScheduleListItem";


export const LocationForm = ({onSubmit, onChange, location, schedule}) => {
  const [locationData, setLocationData] = useState(location)
  const [scheduleList, setScheduleList] = useState(schedule)

  useEffect(() => {
    setScheduleList(schedule)
  }, [schedule])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(locationData)
  }

  const handleLocationChange = (e) => {
    const data = {
      ...locationData,
      [e.target.name]: e.target.value
    }
    setLocationData(data)
    onChange(data, scheduleList)
  }

  const handleScheduleChange = (data) => {
    const res = schedule.map(x => {
      if (x.day === data.day) return data
      return x
    })
    onChange(locationData, res)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <LabeledInput id="street" name="street" type="text" value={locationData.street}
                        onChange={handleLocationChange} labelText="Street: " required={true}
          />

          <LabeledInput id="streetNumber" name="streetNumber" type="number" value={locationData.streetNumber}
                        onChange={handleLocationChange} labelText="Street number: " required={true}
          />

          <LabeledInput id="capacity" name="capacity" type="number" value={locationData.capacity}
                        onChange={handleLocationChange} labelText="Capacity of the location: " required={true}
          />
        </div>

        <List
          subheader={<ListSubheader>Schedule</ListSubheader>}
          sx={{borderStyle: "solid", borderWidth: "1px", borderColor: "#ff0000", marginTop: 1}}
        >
          {scheduleList.map(x => (<LocationScheduleListItem onChange={handleScheduleChange} key={x.day} item={x}/>))}
        </List>

        <button type="submit">Create</button>
      </form>
    </div>
  )
}