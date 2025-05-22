export const getWeatherStations = async () => {
  const response = await fetch("http://localhost:3000/weather-station");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
