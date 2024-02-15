import {configureStore} from "@reduxjs/toolkit";
import ownerReducer from './slices/ownerSlice';
import gymBrandsReducer from './slices/gymBrandsSlice';
import locationsReducer from './slices/locationsSlice';
import userReducer from './slices/userSlice';
import rolesReducer from './slices/rolesSlice';
import employeesReducer from './slices/employeeSlice';
import appointmentsReducer from './slices/appointmentsSlice';
import locationSchedulesReducer from './slices/locationScheduleSlice';
import roomsReducer from './slices/roomsSlice';
import activitiesReducer from './slices/activitiesSlice';
import clientsReducer from './slices/clientsSlice';
import medicalHistoryReducer from './slices/medicalHistorySlice';
import wishesReducer from './slices/wishesSlice';
import exercisesReducer from './slices/exercisesSlice';
import statisticsReducer from './slices/statistacsSlice';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {combineReducers} from "redux";

const rootReduces = combineReducers({
  owner: ownerReducer,
  gymBrands: gymBrandsReducer,
  locations: locationsReducer,
  user: userReducer,
  roles: rolesReducer,
  employees: employeesReducer,
  appointments: appointmentsReducer,
  locationSchedules: locationSchedulesReducer,
  rooms: roomsReducer,
  activities: activitiesReducer,
  clients: clientsReducer,
  medicalHistory: medicalHistoryReducer,
  wishes: wishesReducer,
  exercises: exercisesReducer,
  statistics: statisticsReducer,
});

const persistConfig = {
  key: 'root',
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReduces);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});