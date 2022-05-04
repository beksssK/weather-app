import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fetchSingleWeather,
  fetchSingleWeatherHistory,
} from "../../services/singleWeather";
import "./index.scss";
import { format, fromUnixTime } from "date-fns";
import { STATUS } from "../../store/conf";
import Preloader from "../../components/Preloader/Preloader";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { togglePlace } from "../../services/togglePlace";
import { toggleUserPlace } from "../../store/userSlice";

const Detailed = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { weatherHistory, weather, weatherStatus, weatherHistoryStatus } =
    useSelector((state) => state.singleWeather);

  const bookmarked = useMemo(() => {
    if (!user || !weather) {
      return false;
    }
    return user.places.some((place) => place === weather.name);
  }, [user, weather]);
  const handleBookmark = useCallback(() => {
    togglePlace(weather.name);
    dispatch(toggleUserPlace(weather.name));
  }, [weather, dispatch]);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const longitude = searchParams.get("lon");
    const latitude = searchParams.get("lat");
    if (longitude && latitude) {
      dispatch(fetchSingleWeatherHistory({ longitude, latitude }));
      dispatch(fetchSingleWeather({ longitude, latitude }));
    }
  }, [searchParams, dispatch]);

  return (
    <div className="container">
      {weatherStatus === STATUS.IDLE || weatherStatus === STATUS.PENDING ? (
        <Preloader />
      ) : (
        <div className="city-details">
          <div className="city-g-details">
            <div className="city-g-details__item">
              <div>
                <h3 className="city-g-details__temp">{weather.main.temp}</h3>
                <h1 className="city-g-details__name">{weather.name}</h1>
              </div>
              <h2 className="city-g-details__unit">&#8451;</h2>
            </div>
            <div>
              <FontAwesomeIcon
                className="place-save"
                icon={faBookmark}
                color={bookmarked ? "#dfdf2d" : "grey"}
                onClick={handleBookmark}
              />
            </div>
            <div className="city-g-details__item city-g-details__item--right">
              <div>
                {weather.weather.map((w, idx) => (
                  <div key={idx}>
                    <div className="city-g-details__secondary-info">
                      {w.main}
                    </div>
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
      )}
      {weatherHistoryStatus === STATUS.IDLE ||
      weatherHistoryStatus === STATUS.PENDING ? (
        <Preloader />
      ) : (
        <div className="weather-table">
          {weatherHistory.daily.map((weatherDay, idx) => {
            return (
              <div key={idx} className="weather-table__item">
                <div>{format(fromUnixTime(weatherDay.dt), "dd MMM")}</div>
                <img
                  className="weather-table__icon"
                  src={`http://openweathermap.org/img/wn/${weatherDay.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />
                <div className="weather-table__temp weather-table__temp--day">
                  day: {weatherDay.temp.day} &#8451;
                </div>
                <div className="weather-table__temp">
                  night: {weatherDay.temp.night} &#8451;
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Detailed;
