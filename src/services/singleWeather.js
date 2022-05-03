import { createAsyncThunk } from "@reduxjs/toolkit";
import weatherApi from "../api/weatherApi";

export const fetchSingleWeather = createAsyncThunk(
  "singleWeather/fetchSingleWeatherStatus",
  async ({ latitude, longitude }) => {
    const response = await weatherApi.get("/onecall", {
      params: {
        lat: latitude,
        lon: longitude,
        exclude: "minutely,hourly,alerts",
      },
    });
    return response.data;
  }
);
