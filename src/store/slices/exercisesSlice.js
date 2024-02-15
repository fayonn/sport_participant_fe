import {createSlice} from "@reduxjs/toolkit";

export const emptyExercise = {
  id: null,
  title: null,
  text: null,
  disability: null,
  urls: [],
}

export const exercisesInitState = {
  exercises: [],
  isLoading: false,
  error: false,
}

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState: exercisesInitState,
  reducers: {
    setLoading: (state, {payload}) => {
      state.isLoading = true;
    },
    setError: (state) => {
      state.error = true;
    },
    setExercises: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.exercises = action.payload
    },
  },
});

export const {setLoading, setError, setExercises} = exercisesSlice.actions;
export const exercisesSelector = (state) => state.exercises;
export default exercisesSlice.reducer;