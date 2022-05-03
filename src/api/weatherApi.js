import axios from "axios";
export const WEATHER_API_KEY = "56b8a90b0b9539c2100067f384d3f5e9";
const instance = axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5`,
  params: {
    appid: WEATHER_API_KEY,
    units: "metric",
  },
});
export default instance;
