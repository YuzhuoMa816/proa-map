import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getWeatherStations } from "../api/FetchWeatherStationData";

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

    weatherStations.forEach((station) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <strong>${station.ws_name}</strong><br/>
        Site: ${station.site}<br/>
        Portfolio: ${station.portfolio}
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
    <div ref={mapContainerRef} style={{ width: "100%", height: "600px" }} />
  );
};

export default Map;
