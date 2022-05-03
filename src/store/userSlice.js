import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSingleWeather,
  fetchSingleWeatherHistory,
} from "../services/singleWeather";

const initialState = {
  authorized: false,
  errorMessage: "",
};

const userSlice = createSlice({
  name: "generalWeather",
  initialState,
  reducers: {
    login: (state, action) => {
      const users = JSON.parse(localStorage.getItem("users"));
      if (!users) {
        localStorage.setItem("users", JSON.stringify([]));
        state.errorMessage = "Not found";
      }
      // const user = users.filter
    },
    register: (state, action) => {
      let users = JSON.parse(localStorage.getItem("users"));
      if (!users) {
        users = [];
      }
      users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(users));
    },
  },
});

export const { register } = userSlice.actions;

export default userSlice.reducer;
