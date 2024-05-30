// src/components/DayNightToggle.tsx
import { Box } from "@material-ui/core";
import React from "react";

interface DayNightToggleProps {
  isNight: boolean;
  onToggle: () => void;
}

const DayNightToggle: React.FC<DayNightToggleProps> = ({
  isNight,
  onToggle,
}) => {
  return (
    <Box>
      <label>
        <input type="checkbox" checked={isNight} onChange={onToggle} />
        {isNight ? "Switch to Day Mode" : "Switch to Night Mode"}
      </label>
    </Box>
  );
};

export default DayNightToggle;
