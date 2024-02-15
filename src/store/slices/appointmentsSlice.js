import {createSlice} from "@reduxjs/toolkit";

export const emptyAppointment = {
  id: null,
  title: null,
  text: null,
  locationId: null,
  date: null,
  start: null,
  end: null,
  roomId: null,
  activityId: null,
  employeeId: null,
  clientId: null,
  status: null,
}

export const appointmentsInitState = {
  appointments: {
    appointments: [],
    currentAppointment: emptyAppointment
  },
  isLoading: false,
  error: false,
}

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: appointmentsInitState,
  reducers: {
    setLoading: (state, {payload}) => {
      state.isLoading = true;
    },
    setError: (state) => {
      state.error = true;
    },
    setAppointments: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.appointments.appointments = action.payload
    },
    setCurrentAppointment: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.appointments.currentAppointment = action.payload
    },
  },
});

export const {setLoading, setError, setAppointments, setCurrentAppointment} = appointmentsSlice.actions;
export const appointmentsSelector = (state) => state.appointments.appointments;
export default appointmentsSlice.reducer;