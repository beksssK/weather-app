import { createAsyncThunk } from "@reduxjs/toolkit";
import weatherApi from "../api/weatherApi";
import googleMapsApi from "../api/googleMapsApi";

export const getWeather = async (city) => {
  const weather = await weatherApi.get("/weather", {
    params: { q: city, units: "metric" },
  });
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
