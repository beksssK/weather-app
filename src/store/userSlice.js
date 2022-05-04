import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "generalWeather",
  initialState,
  reducers: {
    authorize: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { authorize } = userSlice.actions;

export default userSlice.reducer;
