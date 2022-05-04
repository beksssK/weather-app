import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authorized: false,
  errorMessage: "",
};

const userSlice = createSlice({
  name: "generalWeather",
  initialState,
  reducers: {
    login: (state, action) => {
    },
    register: (state, action) => {

    },
  },
});

export const { register } = userSlice.actions;

export default userSlice.reducer;
