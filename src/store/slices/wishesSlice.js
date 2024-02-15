import {createSlice} from "@reduxjs/toolkit";

export const emptyWish = {
  id: null,
  firstname: null,
  lastname: null,
  email: null,
  phoneNumber: null,
  text: null,
  status: null,
}

export const wishesInitState = {
  wishes: [],
  isLoading: false,
  error: false,
}

const wishesSlice = createSlice({
  name: 'wishes',
  initialState: wishesInitState,
  reducers: {
    setLoading: (state, {payload}) => {
      state.isLoading = true;
    },
    setError: (state) => {
      state.error = true;
    },
    setWishes: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.wishes = action.payload
    },
    updateWish: (state, action) => {
      state.wishes = state.wishes.map(x => {
        if (x.id === action.payload.id) return action.payload
        return x
      })
    }
  },
});

export const {setLoading, setError, setWishes, updateWish} = wishesSlice.actions;
export const wishesSelector = (state) => state.wishes;
export default wishesSlice.reducer;