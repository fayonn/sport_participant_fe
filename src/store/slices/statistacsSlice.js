import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const statisticsInitState = {
  statistics: {
    gymBrandId: null,
    locationId: null,
    locationCountOfActivities: null,
    gymBrandCountOfActivities: null,
    locationCountOfAppointments: null,
    gymBrandCountOfAppointments: null,

    locationCountOfClients: null,
    gymBrandCountOfClients: null,

    locationCountOfEmployees: null,
    gymBrandCountOfEmployees: null,

    locationCountOfRooms: null,
    gymBrandCountOfRooms: null,

    locationCountOfClientsAddedMedicalCards: null,
    gymBrandCountOfClientsAddedMedicalCards: null,

    locationCountOfDisabledClients: null,
    gymBrandCountOfDisabledClients: null,

    newLocationCountOfAppointments: null,
    newGymBrandCountOfAppointments: null,

    newLocationCountOfClients: null,
    newGymBrandCountOfClients: null,

    newLocationCountOfClientsAddedMedicalCards: null,
    newGymBrandCountOfClientsAddedMedicalCards: null,

    newLocationCountOfDisabledClients: null,
    newGymBrandCountOfDisabledClients: null,

    locationAverageAppointments: null,
    locationAverageClients: null,
    locationAverageClientsAddedMedicalCards: null,
    locationAverageDisabledClients: null,

    gymBrandAverageAppointments: null,
    gymBrandAverageClients: null,
    gymBrandAverageClientsAddedMedicalCards: null,
    gymBrandAverageDisabledClients: null,

    locationAverageYearAppointments: null,
    locationAverageYearClients: null,
    locationAverageYearClientsAddedMedical: null,
    locationAverageYearDisabledClients: null,

    gymBrandAverageYearAppointments: null,
    gymBrandAverageYearClients: null,
    gymBrandAverageYearClientsAddedMedical: null,
    gymBrandAverageYearDisabledClients: null,

    locationCountOfClientsVisitedMoreOneTime: null,
    gymBrandCountOfClientsVisitedMoreOneTime: null,
  },
  isLoading: false,
  error: false,
}

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState: statisticsInitState,
  reducers: {
    setLoading: (state, {payload}) => {
      state.isLoading = true;
    },
    setError: (state) => {
      state.error = true;
    },
    setStatistics: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.statistics = action.payload
    },
  },
});

export const {setLoading, setError, setStatistics} = statisticsSlice.actions;
export const statisticsSelector = (state) => state.statistics;
export default statisticsSlice.reducer;