// src/components/TemperatureMetricSelector.tsx
import React from "react";
import "./TemperatureMetricSelector.css";
import { Box } from "@material-ui/core";

interface TemperatureMetricSelectorProps {
  selectedMetric: string;
  onSelectMetric: (metric: string) => void;
}

const TemperatureMetricSelector: React.FC<TemperatureMetricSelectorProps> = ({
  selectedMetric,
  onSelectMetric,
}) => {
  return (
    <Box className="metric-selector-container">
      <input
        type="radio"
        id="celsius"
        value="celsius"
        checked={selectedMetric === "celsius"}
        onChange={() => onSelectMetric("celsius")}
      />
      <label htmlFor="celsius">Celsius</label>

      <input
        type="radio"
        id="fahrenheit"
        value="fahrenheit"
        checked={selectedMetric === "fahrenheit"}
        onChange={() => onSelectMetric("fahrenheit")}
      />
      <label htmlFor="fahrenheit">Fahrenheit</label>
    </Box>
  );
};

export default TemperatureMetricSelector;
