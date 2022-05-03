import { createSlice } from "@reduxjs/toolkit";
import { fetchGeneralWeather } from "../services/generalWeather";

const initialState = {
  weather: [],
};
const generalWeatherSlice = createSlice({
  name: "generalWeather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGeneralWeather.fulfilled, (state, action) => {
      state.weather = action.payload;
    });
  },
});

export default generalWeatherSlice.reducer;
