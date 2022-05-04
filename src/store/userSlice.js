import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authorized: false,
};

const userSlice = createSlice({
  name: "generalWeather",
  initialState,
  reducers: {
    authorize: (state) => {
      state.authorized = true;
    },
  },
});

export const { authorize } = userSlice.actions;

export default userSlice.reducer;
