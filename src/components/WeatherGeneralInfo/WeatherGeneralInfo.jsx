import React from "react";
import "./WeatherGeneralInfo.scss";

const WeatherGeneralInfo = ({
  locationName,
  weatherDetails,
  humidity,
  windSpeed,
  temperature,
}) => {
  return (
    <div className="weather-g-info">
      <div className="weather-g-info__main">
        <h2 className="weather-g-info__title">{locationName}</h2>
        {weatherDetails.map((weather, idx) => (
          <div className="weather-g-info__description" key={idx}>
            <img
              className="weather-g-info__icon"
              src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt=""
            />
            <div className="weather-g-info__description--main">
              {weather.main}
            </div>
            <div className="weather-g-info__description--secondary">
              {weather.description}
            </div>
          </div>
        ))}{" "}
      </div>
      <div className="weather-g-info__temp">
        <h3 className="weather-g-info__main-temp">
          {Math.round(temperature)} <span>&#8451;</span>
        </h3>
        <div className="weather-g-info__humidity">
          Humidity: <span>{humidity}</span>%
        </div>
        <div className="weather-g-info__speed">
          Wind Speed: <span>{windSpeed}</span> m/s
        </div>
      </div>
    </div>
  );
};

export default WeatherGeneralInfo;
