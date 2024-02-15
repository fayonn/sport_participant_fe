import {FormControlLabel, FormGroup, ListItem, ListItemText, Switch} from "@mui/material";
import {useState} from "react";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";

export const LocationScheduleListItem = ({item, onChange}) => {
  const [isWeekend, setIsWeekend] = useState(item.isWeekend);
  const [openTime, setOpenTime] = useState(item.openTime);
  const [closeTime, setCloseTime] = useState(item.closeTime);

  const handleChange = () => {
    const data = {...item, isWeekend: !isWeekend}
    setIsWeekend(!isWeekend)
    onChange(data)
  }

  return (
    <ListItem>
      <ListItemText style={{marginRight: 40}}>{item.day}</ListItemText>
      <FormGroup>
        <FormControlLabel
          control={<Switch value={isWeekend} onChange={handleChange}/>}
          label={isWeekend ? "Weekend" : "Weekday"}
          labelPlacement={"start"}
        />
      </FormGroup>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <TimePicker
          onChange={(time) => {
            setOpenTime(time)
            onChange({...item, openTime: time})
          }}
          sx={{marginLeft: 1}}
          value={openTime}
          label="Start"
        />
        <TimePicker
          onChange={(time) => {
            setCloseTime(time)
            onChange({...item, closeTime: time})
          }}
          sx={{marginLeft: 1}}
          value={closeTime}
          label="End"
        />
      </LocalizationProvider>
    </ListItem>
  )
}