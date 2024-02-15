import {createSlice} from "@reduxjs/toolkit";

export const userInitState = {
  user: {
    id: null,
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    phoneNumber: null,
  },
  isLoading: false,
  error: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState: userInitState,
  reducers: {
    setLoading: (state, {payload}) => {
      state.isLoading = true;
    },
    setError: (state) => {
      state.error = true;
    },
    setUser: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.user = action.payload
    },
  },
});

export const {setLoading, setError, setUser} = userSlice.actions;
export const userSelector = (state) => state.user;
export default userSlice.reducer;