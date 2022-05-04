import { createSlice } from "@reduxjs/toolkit";
import { fetchGeneralWeather } from "../services/generalWeather";
import { STATUS } from "./conf";

const initialState = {
  weather: [],
  status: STATUS.IDLE,
};
const generalWeatherSlice = createSlice({
  name: "generalWeather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGeneralWeather.fulfilled, (state, action) => {
      state.weather = action.payload;
      state.status = STATUS.SUCCESS;
    });
    builder.addCase(fetchGeneralWeather.pending, (state) => {
      state.status = STATUS.PENDING;
    });
  },
});

export default generalWeatherSlice.reducer;
