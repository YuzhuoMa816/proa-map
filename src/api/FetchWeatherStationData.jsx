import axiosInstance from "../axioInstance";

export const getWeatherStations = async () => {
  try {
    const response = await axiosInstance.get("/weather-station");

    // data structure validation
    if (!response.data || !Array.isArray(response.data)) {
      console.error("Unexpected data format:", response.data);
      return [];
    }

    return response.data;
  } catch (error) {
    console.error("Failed to fetch weather stations:", error);

    return [];
  }
};
