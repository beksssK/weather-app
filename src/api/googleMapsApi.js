import axios from "axios";
export const GOOGLE_MAPS_API_KEY = "AIzaSyA20laYvbKiSPK7JmoKjpgd1vXbe1o-K_w";

const instance = axios.create({
  baseURL: `https://rocky-ravine-03950.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext`,
  params: {
    key: GOOGLE_MAPS_API_KEY,
  },
});
export default instance;
