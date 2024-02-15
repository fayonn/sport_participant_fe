import {createSlice} from "@reduxjs/toolkit";

export const ROLE = {
  OWNER: "OWNER",
  COACH: "COACH",
  ADMIN: "ADMIN",
  RECEPTIONIST: "RECEPTIONIST",
}

export const ROLES = Object.values(ROLE)

export const emptyRole = {
  id: null,
  name: null,
}

export const rolesInitState = {
  roles: [],
  isLoading: false,
  error: false,
}

const rolesSlice = createSlice({
  name: 'roles',
  initialState: rolesInitState,
  reducers: {
    setLoading: (state, {payload}) => {
      state.isLoading = true;
    },
    setError: (state) => {
      state.error = true;
    },
    setRoles: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.roles = action.payload
    },
  },
});

export const {setLoading, setError, setRoles} = rolesSlice.actions;
export const rolesSelector = (state) => state.roles;
export default rolesSlice.reducer;