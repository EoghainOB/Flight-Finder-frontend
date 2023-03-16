import React from "react";

const Directdetails = (flight: any) => {
  const singleflight = flight.flight.currentFlight;
  return (
    <div>
      <h2>
        {singleflight.departureDestination} to {singleflight.arrivalDestination}
      </h2>
      <h3>{singleflight.departureAt}</h3>
      <h3>{singleflight.arrivalAt}</h3>
      <h3>SEK {singleflight.adult.toFixed(2)}</h3>
      <h3>SEK {singleflight.child.toFixed(2)}</h3>
    </div>
  );
};

export default Directdetails;
