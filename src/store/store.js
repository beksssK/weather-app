import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import generalWeatherReducer from "./generalWeatherSlice";
import singleWeatherReducer from "./singleWeatherSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    generalWeather: generalWeatherReducer,
    singleWeather: singleWeatherReducer,
    user: userReducer,
  },
});

setupListeners(store.dispatch);
