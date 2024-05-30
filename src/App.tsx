// src/App.tsx
import React, { useState, useEffect } from "react";
import CitySelector from "./components/CitySelector/CitySelector";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import "./App.css";
import axios from "axios";
import { Box } from "@material-ui/core";

const App: React.FC = () => {
  const [currentCity, setCurrentCity] = useState<string>("Бишкек");
  const [unit, setUnit] = useState<string>("metric");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleCitySelected = (city: string) => {
    setCurrentCity(city);
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=694738cc39d3c3144ac13d48b8188945&lang=ru`
            )
            .then((response) => {
              setCurrentCity(response.data.name);
            })
            .catch((error) => {
              console.error("Ошибка при получении данных о погоде:", error);
            });
        },
        (error) => {
          console.error("Ошибка при получении местоположения:", error);
          setCurrentCity("Бишкек");
        }
      );
    } else {
      setCurrentCity("Бишкек");
    }
  }, []);

  return (
    <Box className={`app-container ${isDarkMode ? "dark-mode" : ""}`}>
      <Box className="header">
        <h1>Прогноз погоды</h1>
      </Box>
      <CitySelector onCitySelected={handleCitySelected} />
      <WeatherInfo
        city={currentCity}
        unit={unit}
        isDarkMode={isDarkMode}
        toggleUnit={toggleUnit}
        toggleDarkMode={toggleTheme}
      />
    </Box>
  );
};

export default App;
