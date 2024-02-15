import {createSlice} from "@reduxjs/toolkit";

export const emptyMedicalHistory = {
  medicalCardId: null,
  clientId: null,
  healthSupplier: null,
  medicalRecords: [],
  disabilities: [],
}

export const medicalHistoryInitState = {
  medicalHistory: emptyMedicalHistory,
  isLoading: false,
  error: false,
}

const medicalHistorySlice = createSlice({
  name: 'medicalHistory',
  initialState: medicalHistoryInitState,
  reducers: {
    setLoading: (state, {payload}) => {
      state.isLoading = true;
    },
    setError: (state) => {
      state.error = true;
    },
    setMedicalHistory: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.medicalHistory = action.payload
    },
  },
});

export const {setLoading, setError, setMedicalHistory} = medicalHistorySlice.actions;
export const medicalHistorySelector = (state) => state.medicalHistory;
export default medicalHistorySlice.reducer;