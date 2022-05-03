import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSingleWeather,
  fetchSingleWeatherHistory,
} from "../services/singleWeather";

const initialState = {
  weather: null,
  weatherHistory: null,
};
const singleWeatherSlice = createSlice({
  name: "generalWeather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleWeatherHistory.fulfilled, (state, action) => {
      state.weatherHistory = action.payload;
    });
    builder.addCase(fetchSingleWeather.fulfilled, (state, action) => {
      state.weather = action.payload;
    });
  },
});

export default singleWeatherSlice.reducer;
