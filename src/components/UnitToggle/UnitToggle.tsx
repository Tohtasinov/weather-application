// src/components/UnitToggle.tsx
import { Box } from "@material-ui/core";
import React from "react";

interface UnitToggleProps {
  units: "metric" | "imperial";
  onToggle: () => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ units, onToggle }) => {
  return (
    <Box>
      <label>
        <input
          type="checkbox"
          checked={units === "imperial"}
          onChange={onToggle}
        />
        {units === "metric" ? "Switch to Fahrenheit" : "Switch to Celsius"}
      </label>
    </Box>
  );
};

export default UnitToggle;
