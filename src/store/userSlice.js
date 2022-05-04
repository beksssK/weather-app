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
    toggleUserPlace: (state, action) => {
      const placeIndex = state.user.places.findIndex(
        (place) => place === action.payload
      );
      if (placeIndex >= 0) {
        state.user.places.splice(placeIndex, 1);
      } else {
        state.user.places.push(action.payload);
      }
    },
  },
});

export const { authorize, toggleUserPlace } = userSlice.actions;

export default userSlice.reducer;
