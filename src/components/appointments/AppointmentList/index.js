import {useDispatch, useSelector} from "react-redux";
import {appointmentsSelector, setAppointments} from "../../../store/slices/appointmentsSlice";
import {AppointmentStatus} from "../../../utils/constants/appointmentStatus";
import {useHasAuthority} from "../../../utils/hooks/useHasAuthority";
import {useUserRoles} from "../../../utils/hooks/useUserRoles";
import {ROLE} from "../../../store/slices/rolesSlice";
import AppointmentService from "../../../services/AppointmentService";
import {gymBrandsSelector} from "../../../store/slices/gymBrandsSlice";
import {locationsSelector} from "../../../store/slices/locationsSlice";

export const AppointmentList = (
  {
    statuses = Object.values(AppointmentStatus)
  }) => {
  const {appointments} = useSelector(appointmentsSelector)
  const hasAuthority = useHasAuthority(useUserRoles())
  const {currentGymBrand} = useSelector(gymBrandsSelector)
  const {currentLocation} = useSelector(locationsSelector)
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    AppointmentService.delete({
      gymBrandId: currentGymBrand.id,
      locationId: currentLocation.id,
      appointmentId: id,
    }).then(() => {
      dispatch(setAppointments(appointments.filter(item => item.id !== id)))
    })
  }

  return (
    <div>
      {appointments.filter(x => statuses.includes(x.status)).map(x => (
        <div key={x.id} style={{border: '1px solid red', marginBottom: 5, padding: 5}}>
          <p>Title: {x.title}</p>
          <p>Text: {x.text}</p>
          <p>Status: {x.status}</p>
          <p>Date: {x.date}</p>
          <p>From {x.start} to {x.end}</p>
          { hasAuthority([ROLE.OWNER, ROLE.ADMIN, ROLE.RECEPTIONIST]) && (
            <button onClick={() => {handleDelete(x.id)}}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
}