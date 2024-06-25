import React, { useEffect } from "react";
import App2 from "../../App2";

const GoLive = () => {
  useEffect(() => {
    console.log("GoLive component rendered");
  }, []);

  return (
    <div className="go-live-container">
      <App2 />
    </div>
  );
};

export default GoLive;
