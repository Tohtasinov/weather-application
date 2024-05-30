// src/components/CitySelector.tsx
import React, { useState, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import "./CitySelector.css"; // Импортируем файл CSS для стилизации
import { Box } from "@material-ui/core";

interface CityOption {
  value: string;
  label: string;
}

interface CitySelectorProps {
  onCitySelected: (city: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ onCitySelected }) => {
  const [cities, setCities] = useState<CityOption[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
  const selectRef = useRef<any>(null);

  const fetchCities = async (query: string) => {
    try {
      const response = await axios.get(
        "https://api.openweathermap.org/geo/1.0/direct",
        {
          params: {
            q: query,
            limit: 10,
            appid: "694738cc39d3c3144ac13d48b8188945",
            lang: "ru",
          },
        }
      );

      const citiesData = response.data.map((city: any) => ({
        value: city.name,
        label: `${city.name}, ${city.country}`,
      }));

      setCities(citiesData);
    } catch (error) {
      console.error("Ошибка при получении данных о городах:", error);
    }
  };

  const handleInputChange = (inputValue: string) => {
    if (inputValue.length > 2) {
      fetchCities(inputValue);
    }
  };

  const handleCityChange = (selectedOption: CityOption | null) => {
    setSelectedCity(selectedOption);
    if (selectedOption) {
      onCitySelected(selectedOption.value);
      selectRef.current.clearValue();
    }
  };

  return (
    <Box className="city-selector-container">
      <Select
        ref={selectRef}
        options={cities}
        value={selectedCity}
        onInputChange={handleInputChange}
        onChange={handleCityChange}
        placeholder="Выберите город"
      />
    </Box>
  );
};

export default CitySelector;
