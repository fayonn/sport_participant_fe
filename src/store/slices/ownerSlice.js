import {createSlice} from "@reduxjs/toolkit";

export const ownerInitState = {
  owner: {
    id: null,
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    country: null,
    city: null,
    phoneNumber: null,
    role: null,
  },
  isLoading: false,
  error: false,
}

const ownerSlice = createSlice({
  name: 'owner',
  initialState: ownerInitState,
  reducers: {
    setLoading: (state, {payload}) => {
      state.isLoading = true;
    },
    setError: (state) => {
      state.error = true;
    },
    setOwner: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.owner = action.payload
    },
  },
});

export const {setLoading, setError, setOwner} = ownerSlice.actions;
export const ownerSelector = (state) => state.owner;
export default ownerSlice.reducer;