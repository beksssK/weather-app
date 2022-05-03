import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import generalWeatherReducer from "./generalWeatherSlice";
import singleWeatherReducer from "./singleWeatherSlice";

export const store = configureStore({
  reducer: {
    generalWeather: generalWeatherReducer,
    singleWeather: singleWeatherReducer,
  },
});

setupListeners(store.dispatch);
