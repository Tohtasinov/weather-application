// src/components/WeatherInfo/WeatherInfo.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WeatherInfo.css";
import HourlyForecast from "../HourlyForecast/HourlyForecast";
import { FaSun, FaMoon, FaThermometerHalf } from "react-icons/fa";
import { Box } from "@material-ui/core";

interface WeatherInfoProps {
  city: string;
  unit: string;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toggleUnit: () => void;
}

interface WeatherData {
  temp: number;
  temp_min: number;
  temp_max: number;
  feels_like: number;
  icon: string;
  description: string;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({
  city,
  unit,
  isDarkMode,
  toggleDarkMode,
  toggleUnit,
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              q: city,
              units: unit,
              appid: "694738cc39d3c3144ac13d48b8188945",
              lang: "ru",
            },
          }
        );

        const data = response.data;
        const weatherData: WeatherData = {
          temp: data.main.temp,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          feels_like: data.main.feels_like,
          icon: data.weather[0].icon,
          description: data.weather[0].description,
        };

        setWeather(weatherData);
      } catch (error) {
        console.error("Ошибка при получении данных о погоде:", error);
      }
    };

    fetchWeather();
  }, [city, unit]);

  if (!weather) {
    return <Box>Загрузка...</Box>;
  }

  return (
    <Box className={`weather-info-container ${isDarkMode ? "dark-mode" : ""}`}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box>
          <h2>Погода в {city}</h2>
        </Box>
        <Box className="weather-controls">
          <button onClick={toggleUnit} className="icon-button">
            <FaThermometerHalf />
          </button>
          <button onClick={toggleDarkMode} className="icon-button">
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </Box>
      </Box>

      <Box className="weather-info">
        <Box className="weather-card">
          <img
            src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
          />
          <p>{weather.description}</p>
        </Box>
        <Box
          className="weather-card"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>
            Температура: {weather.temp}°{unit === "metric" ? "C" : "F"}
          </p>
        </Box>
        <Box className="weather-card">
          <p>
            Минимальная температура: {weather.temp_min}°
            {unit === "metric" ? "C" : "F"}
          </p>
        </Box>
        <Box className="weather-card">
          <p>
            Максимальная температура: {weather.temp_max}°
            {unit === "metric" ? "C" : "F"}
          </p>
        </Box>
        <Box className="weather-card">
          <p>
            Ощущается как: {weather.feels_like}°{unit === "metric" ? "C" : "F"}
          </p>
        </Box>
      </Box>
      <HourlyForecast city={city} unit={unit} isDarkMode={isDarkMode} />
    </Box>
  );
};

export default WeatherInfo;
