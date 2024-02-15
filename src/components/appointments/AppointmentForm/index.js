import {AppointmentCalendar} from "../AppointmentCalendar";
import {LabeledInput} from "../../styled/LabeledInput";

export const AppointmentForm = (
  {
    onSubmit,
    onChange,
    appointment,
  }) => {

  const handleAppointmentChange = (e) => {
    onChange({
      ...appointment,
      [e.target.name]: e.target.value
    })
  }

  const handleAppointmentDateTimeChange = (data) => {onChange(data)}

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(appointment)
  }

  return (
    <form onSubmit={handleSubmit}>
      <LabeledInput id="title" name="title" type="text" value={appointment.title}
                    onChange={handleAppointmentChange} labelText="Title: " required={true}
      />

      <LabeledInput id="text" name="text" type="text" value={appointment.text}
                    onChange={handleAppointmentChange} labelText="Text: " required={true}
      />

      <AppointmentCalendar
        onChange={handleAppointmentDateTimeChange}
        appointment={appointment}
      />

      <button type="submit">Create appointment</button>
    </form>
  );
}