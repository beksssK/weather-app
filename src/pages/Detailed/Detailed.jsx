import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  fetchSingleWeather,
  fetchSingleWeatherHistory,
} from "../../services/singleWeather";
import "./index.scss";

const Detailed = () => {
  const { weatherHistory, weather } = useSelector(
    (state) => state.singleWeather
  );
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const longitude = searchParams.get("lon");
    const latitude = searchParams.get("lat");
    if (longitude && latitude) {
      dispatch(fetchSingleWeatherHistory({ longitude, latitude }));
      dispatch(fetchSingleWeather({ longitude, latitude }));
    }
  }, [searchParams, dispatch]);
  console.log(weather);
  return weatherHistory && weather ? (
    <div className="container">
      <div className="city-details">
        <div className="city-g-details">
          <div className="city-g-details__item">
            <div>
              <h3 className="city-g-details__temp">{weather.main.temp}</h3>
              <h1 className="city-g-details__name">{weather.name}</h1>
            </div>
            <h2 className="city-g-details__unit">&#8451;</h2>
          </div>
          <div className="city-g-details__item city-g-details__item--right">
            <div>
              {weather.weather.map((w, idx) => (
                <div key={idx}>
                  <div className="city-g-details__secondary-info">{w.main}</div>
                  <div className="city-g-details__secondary-info">
                    {w.description}
                  </div>
                </div>
              ))}
              <div className="city-g-details__secondary-info">
                Humidity: {weather.main.humidity} %
              </div>
              <div className="city-g-details__secondary-info">
                Wind Speed: {weather.wind.speed} m/s
              </div>
            </div>
            <img
              className="weather-g-info__icon"
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>City not found</div>
  );
};

export default Detailed;
