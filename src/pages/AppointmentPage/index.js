import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {appointmentsSelector, emptyAppointment, setAppointments} from "../../store/slices/appointmentsSlice";
import AppointmentService from "../../services/AppointmentService";
import {gymBrandsSelector} from "../../store/slices/gymBrandsSlice";
import {locationsSelector} from "../../store/slices/locationsSlice";
import moment from "moment";
import EmployeeService from "../../services/EmployeeService";
import {employeesSelector, setEmployees} from "../../store/slices/employeeSlice";
import {AppointmentForm} from "../../components/appointments/AppointmentForm";
import {EmployeeList} from "../../components/employees/EmployeeList";
import {AppointmentList} from "../../components/appointments/AppointmentList";
import {RoomList} from "../../components/rooms/RoomList";
import {ActivityList} from "../../components/activities/ActivityList";
import RoomService from "../../services/RoomService";
import {roomsSelector, setRooms} from "../../store/slices/roomsSlice";
import ActivityService from "../../services/ActivityService";
import {activitiesSelector, setActivities} from "../../store/slices/activitiesSlice";
import {useHasAuthority} from "../../utils/hooks/useHasAuthority";
import {useUserRoles} from "../../utils/hooks/useUserRoles";
import {ROLE} from "../../store/slices/rolesSlice";
import {userSelector} from "../../store/slices/userSlice";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers";
import ClientService from "../../services/ClientService";
import {clientsSelector, setClients} from "../../store/slices/clientsSlice";
import {DropDownList} from "../../components/styled/DropDownList";


export const AppointmentPage = () => {
  const {appointments} = useSelector(appointmentsSelector)
  const {currentGymBrand} = useSelector(gymBrandsSelector)
  const {currentLocation} = useSelector(locationsSelector)
  const {employees} = useSelector(employeesSelector)
  const {rooms} = useSelector(roomsSelector)
  const {activities} = useSelector(activitiesSelector)
  const hasAuthority = useHasAuthority(useUserRoles())
  const {user} = useSelector(userSelector)
  const {clients} = useSelector(clientsSelector)

  const dispatch = useDispatch()

  const [currentEmployee, setCurrentEmployee] = useState(null)
  const [currentRoom, setCurrentRoom] = useState(null)
  const [currentActivity, setCurrentActivity] = useState(null)
  const [currentClient, setCurrentClient] = useState(null)
  const [appointment, setAppointment] = useState({
    ...emptyAppointment,
    title: "",
    text: "",
    date: moment(),
  });

  useEffect(() => {
    if (currentGymBrand.id) {
      EmployeeService.getAll(currentGymBrand.id)
        .then(({data}) => {
          dispatch(setEmployees(data))
          setCurrentEmployee(data.length > 0 ? data[0] : null)
        })
    }
    else {
      dispatch(setEmployees([]))
      setCurrentEmployee(null)
    }
  }, [currentGymBrand])

  useEffect(() => {
    if (currentLocation.id) {
      ActivityService.getAllByLocationId({
        gymBrandId: currentGymBrand.id,
        locationId: currentLocation.id,
      }).then(({data}) => {
        dispatch(setActivities(data))
        setCurrentActivity(data.length > 0 ? data[0] : null)
      })

      RoomService.getAllByLocationId({
        gymBrandId: currentGymBrand.id,
        locationId: currentLocation.id,
      }).then(({data}) => {
        dispatch(setRooms(data))
        setCurrentRoom(data.length > 0 ? data[0] : null)
      })

      ClientService.getAllByLocationId({
        gymBrandId: currentGymBrand.id,
        locationId: currentLocation.id,
      })
        .then(({data}) => {
          dispatch(setClients(data))
          setCurrentClient(data.length > 0 ? data[0] : null)
        })
    }
    else {
      dispatch(setActivities([]))
      setCurrentActivity(null)
      dispatch(setRooms([]))
      setCurrentRoom(null)
    }
  }, [currentLocation])

  useEffect(() => {
    if (currentGymBrand.id && currentLocation.id){
      EmployeeService.getAll(currentGymBrand.id)
        .then(({data}) => {
          dispatch(setEmployees(data))

          if (data.length === 0) {
            alert("Add employee!")
            return
          }

          setCurrentEmployee(data[0])

          const isCoach = hasAuthority([ROLE.COACH])
          const coachId = isCoach ? user.id : data[0].id

          AppointmentService.getAllByDateAndCoachId({
            gymBrandId: currentGymBrand.id,
            locationId: currentLocation.id,
            date: moment().format('YYYY-MM-DD'),
            coachId: coachId,
          }).then(({data}) => {
            dispatch(setAppointments(data))
          })
        })
        .then(() => {
          RoomService.getAllByLocationId({
            gymBrandId: currentGymBrand.id,
            locationId: currentLocation.id,
          })
            .then(({data}) => {
              dispatch(setRooms(data))
              setCurrentRoom(data[0])
            })
        })
        .then(() => {
          ActivityService.getAllByLocationId({
            gymBrandId: currentGymBrand.id,
            locationId: currentLocation.id,
          })
            .then(({data}) => {
              dispatch(setActivities(data))
              setCurrentActivity(data[0])
            })
        })
        .then(() => {
          ClientService.getAllByLocationId({
            gymBrandId: currentGymBrand.id,
            locationId: currentLocation.id,
          })
            .then(({data}) => {
              dispatch(setClients(data))
              setCurrentClient(data[0])
            })
        })
    }
  }, [])

  useEffect(() => {
    setAppointment({
      ...appointment,
      employeeId: currentEmployee?.id,
      activityId: currentActivity?.id,
      roomId: currentRoom?.id,
      locationId: currentLocation?.id,
      clientId: currentClient?.id,
    })
  }, [currentEmployee, currentRoom, currentActivity, currentLocation])

  const handleChangeEmployee = (employee) => {
    const e = employees.filter(x => x.id === employee[0])[0]
    setCurrentEmployee(e)
    setAppointment({...appointment, employeeId: e.id})
    AppointmentService.getAllByDateAndCoachId({
      gymBrandId: currentGymBrand.id,
      locationId: currentLocation.id,
      date: appointment.date.format('YYYY-MM-DD'),
      coachId: e.id,
    }).then(({data}) => {
      dispatch(setAppointments(data))
    })
  }

  const handleChangeRoom = (room) => {
    const r = rooms.filter(x => x.id === room[0])[0]
    setCurrentRoom(r)
    setAppointment({...appointment, roomId: r.id})
  }

  const handleChangeActivity = (activity) => {
    const a = activities.filter(x => x.id === activity[0])[0]
    setCurrentActivity(a)
    setAppointment({...appointment, activityId: a.id})
  }

  const handleChangeClient = (client) => {
    const c = clients.filter(x => x.id === client[0])[0]
    setCurrentClient(c)
    setAppointment({...appointment, clientId: c.id})
  }

  useEffect(() => {
    if (currentEmployee) {
      AppointmentService.getAllByDateAndCoachId({
        gymBrandId: currentGymBrand.id,
        locationId: currentLocation.id,
        date: appointment.date.format('YYYY-MM-DD'),
        coachId: currentEmployee.id,
      }).then(({data}) => {
        dispatch(setAppointments(data))
      })
    }
  }, [appointment.date])

  const handleSubmit = () => {
    const formattedAppointment = {
      ...appointment,
      date: appointment.date.format('YYYY-MM-DD'),
    }

    AppointmentService.saveAppointment(
      currentGymBrand.id,
      currentLocation.id,
      formattedAppointment,
    ).then(({data}) => {
      dispatch(setAppointments([...appointments, data]))
    })
  }

  const [date, setDate] = useState(moment())

  const coachPage = () => {
    return (
      <div>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker value={date} onChange={(d) => setDate(d)}/>
        </LocalizationProvider>

        <AppointmentList/>
      </div>
    )
  }

  useEffect(() => {
    if (hasAuthority([ROLE.COACH])) {
      AppointmentService.getAllByDateAndCoachId({
        gymBrandId: currentGymBrand.id,
        locationId: currentLocation.id,
        date: date.format('YYYY-MM-DD'),
        coachId: user.id,
      }).then(({data}) => {
        dispatch(setAppointments(data))
      })
    }
  }, [date])

  const fullAccessPage = () => {
    return (
      <div>
        {currentEmployee && currentRoom && currentActivity && currentClient && (
          <>
            <AppointmentForm
              onSubmit={handleSubmit}
              onChange={(data) => {setAppointment(data)}}
              appointment={appointment}
            />

            <EmployeeList
              current={currentEmployee}
              onChange={handleChangeEmployee}
              showDeleteOption={false}
            />

            <RoomList
              current={currentRoom}
              onChange={handleChangeRoom}
            />

            <ActivityList
              current={currentActivity}
              onChange={handleChangeActivity}
            />

            <p>Clients</p>
            <DropDownList
              values={clients.map(x => [x.id, x.firstname + " " + x.lastname])}
              selected={[currentClient.id, currentClient.firstname + " " + currentClient.lastname]}
              onChange={handleChangeClient}
              showAddOption={false}
              showDeleteOption={false}
            />

            <AppointmentList/>
          </>
        )}
      </div>
    )
  }

  return (
    <>
      {hasAuthority([ROLE.OWNER, ROLE.ADMIN, ROLE.RECEPTIONIST])
        ? fullAccessPage()
        : hasAuthority([ROLE.COACH])
          ? coachPage()
          : "No permissions"
      }
    </>
  );
}