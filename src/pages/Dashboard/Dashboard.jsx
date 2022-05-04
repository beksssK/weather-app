import React, { useCallback, useEffect, useMemo, useState } from "react";
import Slider from "../../components/Slider/Slider";
import { useDispatch, useSelector } from "react-redux";
import { fetchGeneralWeather } from "../../services/generalWeather";
import { GOOGLE_MAPS_API_KEY } from "../../api/googleMapsApi";
import WeatherGeneralInfo from "../../components/WeatherGeneralInfo/WeatherGeneralInfo";
import "./index.scss";

const Dashboard = () => {
  const weather = useSelector((state) => state.generalWeather.weather);
  const sliderItems = useMemo(() => {
    let refLink = `https://maps.googleapis.com/maps/api/place/photo?key=${GOOGLE_MAPS_API_KEY}&maxheight=400&photo_reference=`;
    return weather.map((city) => {
      const component = (
        <WeatherGeneralInfo
          locationName={city.name}
          weatherDetails={city.weather}
          humidity={city?.main?.humidity}
          windSpeed={city?.wind.speed}
          temperature={city.main.temp}
        />
      );
      return { ...city, img: refLink + city.reference, info: component };
    });
  }, [weather]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchGeneralWeather(["Moscow", "London", "New York", "Beijing", "Paris"])
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
      <div className="global-weather">
        <Slider items={sliderItems} settings={sliderSettings} />
      </div>
    </div>
  );
};

export default Dashboard;
