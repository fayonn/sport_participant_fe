import {createSlice} from "@reduxjs/toolkit";

export const emptyEmployee = {
  id: null,
  firstname: null,
  lastname: null,
  email: null,
  password: null,
  phoneNumber: null,
  status: null,
  roleIds: [],
}

export const employeesInitState = {
  employees: [],
  isLoading: false,
  error: false,
}

const employeesSlice = createSlice({
  name: 'employees',
  initialState: employeesInitState,
  reducers: {
    setLoading: (state, {payload}) => {
      state.isLoading = true;
    },
    setError: (state) => {
      state.error = true;
    },
    setEmployees: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.employees = action.payload
    },
  },
});

export const {setLoading, setError, setEmployees} = employeesSlice.actions;
export const employeesSelector = (state) => state.employees;
export default employeesSlice.reducer;