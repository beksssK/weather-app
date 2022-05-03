import React, { useCallback, useEffect, useMemo, useState } from "react";
import Slider from "../../components/Slider/Slider";
import { useDispatch, useSelector } from "react-redux";
import { fetchGeneralWeather } from "../../services/generalWeather";
import { GOOGLE_MAPS_API_KEY } from "../../api/googleMapsApi";

const Dashboard = () => {
  const weather = useSelector((state) => state.generalWeather.weather);
  const sliderItems = useMemo(() => {
    let refLink = `https://maps.googleapis.com/maps/api/place/photo?key=${GOOGLE_MAPS_API_KEY}&maxheight=400&photo_reference=`;
    return weather.map((city) => ({ ...city, img: refLink + city.reference }));
  }, [weather]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchGeneralWeather(["Moscow", "Paris", "London", "New York", "Beijing"])
    );
  }, [dispatch]);
  const [searchQuery, setSearchQuery] = useState("");
  const onSearchQueryChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);
  console.log(sliderItems);

  const sliderSettings = {
    slidesPerShow: 2,
    slidesToScroll: 2,
  };

  return (
    <div className="container">
      <form action="#">
        <input type="text" value={searchQuery} onChange={onSearchQueryChange} />
        <button>Search</button>
      </form>
      <Slider items={sliderItems} settings={sliderSettings} />
    </div>
  );
};

export default Dashboard;
