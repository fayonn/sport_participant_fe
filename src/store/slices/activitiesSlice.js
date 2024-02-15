import {createSlice} from "@reduxjs/toolkit";

export const emptyActivity = {
  id: null,
  title: null,
  description: null,
  locationId: null,
}

export const activitiesInitState = {
  activities: {
    activities: [],
  },
  isLoading: false,
  error: false,
}

const activitiesSlice = createSlice({
  name: 'activities',
  initialState: activitiesInitState,
  reducers: {
    setLoading: (state, {payload}) => {
      state.isLoading = true;
    },
    setError: (state) => {
      state.error = true;
    },
    setActivities: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.activities.activities = action.payload
    },
  },
});

export const {setLoading, setError, setActivities} = activitiesSlice.actions;
export const activitiesSelector = (state) => state.activities.activities;
export default activitiesSlice.reducer;