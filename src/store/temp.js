import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const temp = createSlice({
  name: "temp",
  initialState,
  reducers: {

  },
});

export default temp.reducer