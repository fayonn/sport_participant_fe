import {createSlice} from "@reduxjs/toolkit";

export const emptyRoom = {
  id: null,
  name: null,
  description: null,
  roomNumber: null,
  capacity: null,
  locationId: null,
  status: null,
}

export const roomsInitState = {
  rooms: {
    rooms: [],
  },
  isLoading: false,
  error: false,
}

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: roomsInitState,
  reducers: {
    setLoading: (state, {payload}) => {
      state.isLoading = true;
    },
    setError: (state) => {
      state.error = true;
    },
    setRooms: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.rooms.rooms = action.payload
    },
  },
});

export const {setLoading, setError, setRooms} = roomsSlice.actions;
export const roomsSelector = (state) => state.rooms.rooms;
export default roomsSlice.reducer;