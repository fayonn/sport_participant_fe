import {LocationScheduleListItem} from "../LocationScheduleListItem";
import {List, ListSubheader} from "@mui/material";
import {useEffect, useState} from "react";

export const LocationScheduleList = ({onChange, schedule}) => {
  const [scheduleList, setScheduleList] = useState(schedule)

  const handleChange = (data) => {
    const res = schedule.map(x => {
      if (x.day === data.day) return data
      return x
    })
    onChange(res)
  }

  useEffect(() => {
    setScheduleList(schedule)
  }, [schedule])

  return (
    <List
      subheader={<ListSubheader>Schedule</ListSubheader>}
      sx={{borderStyle: "solid", borderWidth: "1px", borderColor: "#ff0000", marginTop: 1}}
    >
      {scheduleList.map(x => (<LocationScheduleListItem onChange={handleChange} key={x.day} item={x}/>))}
    </List>
  )
}