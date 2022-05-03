import { createAsyncThunk } from "@reduxjs/toolkit";
import weatherApi from "../api/weatherApi";

export const fetchSingleWeatherHistory = createAsyncThunk(
  "singleWeather/fetchSingleWeatherHistoryStatus",
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

export const fetchSingleWeather = createAsyncThunk(
  "singleWeather/fetchSingleWeather",
  async ({ latitude, longitude }) => {
    const weatherResponse = await weatherApi.get("/weather", {
      params: {
        lat: latitude,
        lon: longitude,
      },
    });
    return weatherResponse.data;
  }
);
