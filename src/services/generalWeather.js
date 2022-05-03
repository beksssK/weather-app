import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import weatherApi, { WEATHER_API_KEY } from "../api/weatherApi";
import googleMapsApi from "../api/googleMapsApi";

const initialState = {
  weather: [],
};

export const getWeather = async (city) => {
  const weather = await weatherApi.get("/weather", { params: { q: city } });
  return weather.data;
};

export const getPlaceReference = async (cityName) => {
  const places = await googleMapsApi.get("/json", {
    params: { input: cityName, inputtype: "textquery", fields: "photo,name" },
  });
  return places.data;
};

export const fetchGeneralWeather = createAsyncThunk(
  "generalWeather/fetchGeneralWeatherStatus",
  async (cities, thunkAPI) => {
    const citiesWeather = await Promise.all(
      cities.map((city) => {
        return getWeather(city);
      })
    ).then(function (cities) {
      return cities;
    });
    const placeReferences = await Promise.all(
      citiesWeather.map(({ name }) => {
        return getPlaceReference(name);
      })
    );
    const citiesReferences = placeReferences.map(
      (place) => place.candidates[0]
    );
    return citiesWeather.map((city) => {
      const [
        {
          photos: [p],
        },
      ] = citiesReferences.filter((c) => c.name === city.name);
      return { ...city, reference: p.photo_reference };
    });
  }
);

const generalWeatherSlice = createSlice({
  name: "generalWeather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGeneralWeather.fulfilled, (state, action) => {
      // Add user to the state array
      state.weather = action.payload;
    });
  },
});

export default generalWeatherSlice.reducer;
