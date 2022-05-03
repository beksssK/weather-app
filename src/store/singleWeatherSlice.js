import { createSlice } from "@reduxjs/toolkit";
import { fetchSingleWeather } from "../services/singleWeather";

const initialState = {
  weather: {},
};
const singleWeatherSlice = createSlice({
  name: "generalWeather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleWeather.fulfilled, (state, action) => {
      state.weather = action.payload;
    });
  },
});

export default singleWeatherSlice.reducer;
