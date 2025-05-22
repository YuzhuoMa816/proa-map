// WeatherStationPopup.jsx
import React from "react";

const WeatherStationPopup = ({
  StationName,
  StationSite,
  StationPortfolio,
}) => {
  return (
    <div style={{ fontSize: "14px" }}>
      <strong>{StationName}</strong>
      <br />
      Site: {StationSite}
      <br />
      Portfolio: {StationPortfolio}
    </div>
  );
};

export default WeatherStationPopup;
