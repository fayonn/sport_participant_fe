import {createSlice} from "@reduxjs/toolkit";

export const emptyGymBrand = {
  id: null,
  name: null,
  ownerId: null,
  status: null,
}

export const gymBrandsInitState = {
  gymBrands: {
    gymBrands: [],
    currentGymBrand: emptyGymBrand
  },
  isLoading: false,
  error: false,
}

const gymBrandsSlice = createSlice({
  name: 'gymBrands',
  initialState: gymBrandsInitState,
  reducers: {
    setLoading: (state, {payload}) => {
      state.isLoading = true;
    },
    setError: (state) => {
      state.error = true;
    },
    setGymBrands: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.gymBrands.gymBrands = action.payload
    },
    setCurrentGymBrand: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.gymBrands.currentGymBrand = action.payload
    },
  },
});

export const {setLoading, setError, setGymBrands, setCurrentGymBrand} = gymBrandsSlice.actions;
export const gymBrandsSelector = (state) => state.gymBrands.gymBrands;
export default gymBrandsSlice.reducer;