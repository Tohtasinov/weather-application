// src/components/HourlyForecast/HourlyForecast.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HourlyForecast.css";
import { Box } from "@material-ui/core";

interface HourlyForecastProps {
  city: string;
  unit: string;
  isDarkMode: boolean;
}

interface HourlyForecastData {
  dt: number;
  temp: number;
  icon: string;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({
  city,
  unit,
  isDarkMode,
}) => {
  const [forecast, setForecast] = useState<HourlyForecastData[]>([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/forecast",
          {
            params: {
              q: city,
              units: unit,
              appid: "694738cc39d3c3144ac13d48b8188945",
              lang: "ru",
            },
          }
        );

        const data = response.data.list.slice(0, 5);
        const forecastData: HourlyForecastData[] = data.map((item: any) => ({
          dt: item.dt,
          temp: item.main.temp,
          icon: item.weather[0].icon,
        }));

        setForecast(forecastData);
      } catch (error) {
        console.error("Ошибка при получении почасового прогноза:", error);
      }
    };

    fetchForecast();
  }, [city, unit]);

  return (
    <Box
      className={`hourly-forecast-container ${isDarkMode ? "dark-mode" : ""}`}
    >
      {forecast.map((item, index) => (
        <Box key={index} className="forecast-item" padding={2}>
          <Box className="forecast-time">
            {new Date(item.dt * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Box>
          <img
            src={`http://openweathermap.org/img/wn/${item.icon}.png`}
            alt=""
            className="forecast-icon"
          />
          <Box className="forecast-temp">
            {item.temp}°{unit === "metric" ? "C" : "F"}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default HourlyForecast;
