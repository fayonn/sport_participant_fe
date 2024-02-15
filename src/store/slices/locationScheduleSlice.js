import {createSlice} from "@reduxjs/toolkit";

export const emptyLocationSchedule = {
  id: null,
  isWeekend: null,
  day: null,
  openTime: null,
  closeTime: null,
  locationId: null,
}

export const locationSchedulesInitState = {
  schedules: [],
  isLoading: false,
  error: false,
}

const locationSchedulesSlice = createSlice({
  name: 'locationSchedules',
  initialState: locationSchedulesInitState,
  reducers: {
    setLoading: (state, {payload}) => {
      state.isLoading = true;
    },
    setError: (state) => {
      state.error = true;
    },
    setSchedules: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.schedules = action.payload
    },
  },
});

export const {setLoading, setError, setSchedules} = locationSchedulesSlice.actions;
export const locationSchedulesSelector = (state) => state.schedules;
export default locationSchedulesSlice.reducer;