import React from "react";
import "./DayNightModeToggle.css";
import { Box } from "@material-ui/core";

interface DayNightModeToggleProps {
  isNightMode: boolean;
  onToggle: () => void;
}

const DayNightModeToggle: React.FC<DayNightModeToggleProps> = ({
  isNightMode,
  onToggle,
}) => {
  return (
    <Box className="day-night-toggle-container">
      <input
        type="checkbox"
        id="day-night-toggle"
        checked={isNightMode}
        onChange={onToggle}
      />
      <label htmlFor="day-night-toggle">Night Mode</label>
    </Box>
  );
};

export default DayNightModeToggle;
