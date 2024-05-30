// src/components/WeatherDisplay.tsx
import { Box } from "@material-ui/core";
import React from "react";

interface WeatherProps {
  weather: any;
  units: "metric" | "imperial";
}

const WeatherDisplay: React.FC<WeatherProps> = ({ weather, units }) => {
  return (
    <Box>
      <h2>{weather.name}</h2>
      <p>{weather.weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
      <p>
        Temperature: {weather.main.temp}°{units === "metric" ? "C" : "F"}
      </p>
      <p>
        Feels Like: {weather.main.feels_like}°{units === "metric" ? "C" : "F"}
      </p>
      <p>
        Min: {weather.main.temp_min}°{units === "metric" ? "C" : "F"}
      </p>
      <p>
        Max: {weather.main.temp_max}°{units === "metric" ? "C" : "F"}
      </p>
    </Box>
  );
};

export default WeatherDisplay;
