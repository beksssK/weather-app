import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchSingleWeather } from "../../services/singleWeather";

const Detailed = () => {
  const singleWeather = useSelector((state) => state.singleWeather.weather);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  console.log(singleWeather);
  useEffect(() => {
    const longitude = searchParams.get("lon");
    const latitude = searchParams.get("lat");
    if (longitude && latitude) {
      dispatch(fetchSingleWeather({ longitude, latitude }));
    }
  }, [searchParams, dispatch]);
  return singleWeather ? <div className="detailed">
    <div className="container">
      <h1></h1>
    </div>
  </div> : <div>City not found</div>
};

export default Detailed;
