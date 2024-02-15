import {createSlice} from "@reduxjs/toolkit";

export const emptyLocation = {
  id: null,
  street: null,
  streetNumber: null,
  capacity: null,
  gymBrandId: null,
  status: null,
  roomIds: []
}

export const locationsInitState = {
  locations: {
    locations: [],
    currentLocation: emptyLocation,
  },
  isLoading: false,
  error: false,
}

const locationsSlice = createSlice({
  name: 'locations',
  initialState: locationsInitState,
  reducers: {
    setLoading: (state, {payload}) => {
      state.isLoading = true;
    },
    setError: (state) => {
      state.error = true;
    },
    setLocations: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.locations.locations = action.payload
    },
    setCurrentLocation: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.locations.currentLocation = action.payload
    },
  },
});

export const {setLoading, setError, setLocations, setCurrentLocation} = locationsSlice.actions;
export const locationsSelector = (state) => state.locations.locations;
export default locationsSlice.reducer;