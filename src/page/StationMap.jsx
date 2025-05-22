import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getWeatherStations } from "../api/FetchWeatherStationData";
import WeatherStationPopup from "../components/WeatherStationPopup";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = () => {
  const mapContainerRef = useRef(null);
  const [weatherStations, setWeatherStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch backend data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // loading
        const data = await getWeatherStations();
        setWeatherStations(data);
        setError(null); // remove prev error
      } catch (err) {
        setError("Error loading weather data");
        console.error("Axios fetch error:", err);
      } finally {
        setLoading(false); //
      }
    };

    fetchData();
  }, []);

  // initialise map
  useEffect(() => {
    if (!weatherStations.length || error) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [144.217208, -35.882762],
      zoom: 4,
    });
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    weatherStations.forEach((station) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
  <div style="
    font-size: 14px;
    line-height: 1.5;
    color: #333;
    padding: 8px;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  ">
    <strong style="font-size: 16px; color: #0077b6;">${station.ws_name}</strong><br/>
    <span><strong>Site:</strong> ${station.site}</span><br/>
    <span><strong>Portfolio:</strong> ${station.portfolio}</span>
  </div>
`);

      new mapboxgl.Marker()
        .setLngLat([station.longitude, station.latitude])
        .setPopup(popup)
        .addTo(map);
    });

    return () => map.remove();
  }, [weatherStations, error]);

  // loading status
  if (loading) {
    return (
      <div style={{ padding: "1rem" }}>⏳ Loading Map Data Please wait...</div>
    );
  }

  if (error) {
    return <div style={{ padding: "1rem", color: "red" }}>❌ {error}</div>;
  }

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "1rem", color: "#023e8a" }}>
        🌦️ Weather Stations Map
      </h2>
      <div
        ref={mapContainerRef}
        style={{
          width: "100%",
          height: "600px",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      />
    </div>
  );
};

export default Map;
