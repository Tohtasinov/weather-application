// src/components/HourlyForecast/HourlyForecastCard.tsx
import React from "react";
import "./HourlyForecastCard.css";
import { Box } from "@material-ui/core";

interface HourlyForecastCardProps {
  data: {
    dt: number;
    temp: number;
    weather: {
      icon: string;
      description: string;
    }[];
  };
  unit: string;
  isDarkMode: boolean;
}

const HourlyForecastCard: React.FC<HourlyForecastCardProps> = ({
  data,
  unit,
  isDarkMode,
}) => {
  const { dt, temp, weather } = data;
  const time = new Date(dt * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Box className={`hourly-forecast-card ${isDarkMode ? "dark-mode" : ""}`}>
      <p>{time}</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
        alt={weather[0].description}
      />
      <p>
        {temp}°{unit === "metric" ? "C" : "F"}
      </p>
    </Box>
  );
};

export default HourlyForecastCard;
