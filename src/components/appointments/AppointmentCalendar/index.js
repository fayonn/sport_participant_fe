import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import {useEffect, useState} from "react";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {TableCell, TableContainer, TableRow} from "@mui/material";
import AppointmentService from "../../../services/AppointmentService";
import {useSelector} from "react-redux";
import {gymBrandsSelector} from "../../../store/slices/gymBrandsSlice";
import {locationsSelector} from "../../../store/slices/locationsSlice";
import styles from "./AppointmentCalendar.module.css"
import {appointmentsSelector} from "../../../store/slices/appointmentsSlice";


// Додати момент, що якщо вибирається старт то задізейблити години до старт, якщо енд то після енд
export const AppointmentCalendar = (
  {
    onChange,
    appointment,
  }) => {
  const [availableHours, setAvailableHours] = useState([]);
  const {currentGymBrand} = useSelector(gymBrandsSelector)
  const {currentLocation} = useSelector(locationsSelector)
  const {appointments} = useSelector(appointmentsSelector)

  useEffect(() => {
    if (currentGymBrand && currentLocation) {
      AppointmentService.getAppointmentAvailableHours({
        gymBrandId: currentGymBrand.id,
        locationId: currentLocation.id,
        date: appointment.date.format('YYYY-MM-DD'),
        coachId: appointment.employeeId,
      }).then(({data}) => {
        setAvailableHours(data)
      })
    }
  }, [appointment.employeeId, currentGymBrand, currentLocation, appointment.date, appointments])

  const handleDateChange = (date) => {
    onChange({
      ...appointment,
      date: date,
      start: null,
      end: null,
    })
  };

  const handleHourChange = (e) => {
    e.preventDefault()
    if (e.target.name === "Start") onChange({...appointment, start: e.target.value})
    if (e.target.name === "End") onChange({...appointment, end: e.target.value})
  }

  const formTable = (label) => {
    const rows = []

    const multiple = Math.floor(availableHours.length / 4)
    for (let i = 0; i < multiple; i += 1) {
      rows.push([...availableHours.slice(i * 4, i * 4 + 4)])
    }
    rows.push([...availableHours.slice(multiple * 4, availableHours.length)])

    return (
      <>
        <p>{label}</p>
        <TableContainer>
          {rows.map((row, index) => {
            return (
              <TableRow key={index}>
                {row.map((x, index) => {
                    return (
                      <TableCell key={index}>
                        <button
                          value={moment().set({
                            hour: x.time[0],
                            minute: x.time[1],
                          }).format('HH:mm')}
                          name={label}
                          onClick={handleHourChange}
                          disabled={!x.isAvailable}
                        >
                          {x.time[0] + ":" + x.time[1]}
                        </button>
                      </TableCell>
                    )
                  }
                )}
              </TableRow>
            )
          })}
        </TableContainer>
      </>
    )
  }

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker value={appointment.date} onChange={handleDateChange}/>
        <div className={styles.timeContainer}>
          <div className={styles.timeContainerItem}>
            {formTable("Start")}
          </div>
          <div className={styles.timeContainerItem}>
            {formTable("End")}
          </div>
        </div>
      </LocalizationProvider>
    </div>
  );
}