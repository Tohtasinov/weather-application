import axios from "axios";

const API_KEY = "694738cc39d3c3144ac13d48b8188945";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getWeather = async (
  city: string,
  units: "metric" | "imperial"
) => {
  const response = await axios.get(BASE_URL, {
    params: {
      q: city,
      units,
      appid: API_KEY,
    },
  });
  return response.data;
};
