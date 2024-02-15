import {createSlice} from "@reduxjs/toolkit";

export const emptyClient = {
  id: null,
  firstname: null,
  lastname: null,
  email: null,
  password: null,
  country: null,
  city: null,
  phoneNumber: null,
  status: null,
  isDisabled: null,
  locationIds: [],
  dob: null,
  gender: null
}

export const clientsInitState = {
  clients: {
    clients: [],
    currentClient: emptyClient
  },
  isLoading: false,
  error: false,
}

const clientsSlice = createSlice({
  name: 'clients',
  initialState: clientsInitState,
  reducers: {
    setLoading: (state, {payload}) => {
      state.isLoading = true;
    },
    setError: (state) => {
      state.error = true;
    },
    setClients: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.clients.clients = action.payload
    },
    setCurrentClient: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.clients.currentClient = action.payload
    },
  },
});

export const {setLoading, setError, setClients, setCurrentClient} = clientsSlice.actions;
export const clientsSelector = (state) => state.clients.clients;
export default clientsSlice.reducer;