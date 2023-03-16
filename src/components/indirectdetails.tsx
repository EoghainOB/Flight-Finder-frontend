import React from "react";

const Indirectdetails = (flight: any) => {
  const group = flight.flight;
  const inbound = flight.flight.inboundFlight;
  const outbound = flight.flight.outboundFlight;
  const departdate = new Date(outbound.departureAt);

  console.log("depart", departdate);

  const arrivedate = new Date(outbound.arrivalAt);

  console.log("GROUP", group);

  return (
    <div>
      <h3>{outbound.departureDestination}</h3>
      <h3>{inbound.arrivalDestination}</h3>
      <h3>via {outbound.arrivalDestination}</h3>
      <h3>{departdate.toString()}</h3>
      <h3>{arrivedate.toString()}</h3>
      <h3>SEK {group.adultIndirect.toFixed(2)}</h3>
      <h3>SEK {group.childIndirect.toFixed(2)}</h3>
    </div>
  );
};

export default Indirectdetails;
