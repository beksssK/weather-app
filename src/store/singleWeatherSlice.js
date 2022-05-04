import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSingleWeather,
  fetchSingleWeatherHistory,
} from "../services/singleWeather";
import { STATUS } from "./conf";

const initialState = {
  weather: null,
  weatherHistory: null,
  weatherStatus: STATUS.IDLE,
  weatherHistoryStatus: STATUS.IDLE,
};
const singleWeatherSlice = createSlice({
  name: "generalWeather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleWeatherHistory.fulfilled, (state, action) => {
      state.weatherHistory = action.payload;
      state.weatherHistoryStatus = STATUS.SUCCESS;
    });
    builder.addCase(fetchSingleWeatherHistory.pending, (state) => {
      state.weatherHistoryStatus = STATUS.PENDING;
    });
    builder.addCase(fetchSingleWeather.fulfilled, (state, action) => {
      state.weather = action.payload;
      state.weatherStatus = STATUS.SUCCESS;
    });
    builder.addCase(fetchSingleWeather.pending, (state) => {
      state.weatherStatus = STATUS.PENDING;
    });
  },
});

export default singleWeatherSlice.reducer;
