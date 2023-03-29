import { useContext } from "react";
import AllContext from "./data";
import { FlightContextType } from "../types";

const Indirectdetails = (flight: any) => {
  const { flightSearch } = useContext(AllContext) as FlightContextType;

  const group = flight.flight;
  const inbound = flight.flight.inboundFlight;
  const outbound = flight.flight.outboundFlight;

  const passengers =
    //@ts-ignore
    flightSearch.adultPassengers + flightSearch.childPassengers;
  const totaloneway =
    //@ts-ignore
    flightSearch.adultPassengers * group.adultIndirect +
    //@ts-ignore
    flightSearch.childPassengers * group.childIndirect;

  const firstdeparturetime = new Date(outbound.departureAt);
  const firstdepartDate = new Intl.DateTimeFormat().format(firstdeparturetime);
  const firstarrivaltime = new Date(outbound.arrivalAt);
  const firstarriveDate = new Intl.DateTimeFormat().format(firstarrivaltime);
  const seconddeparturetime = new Date(inbound.departureAt);
  const seconddepartDate = new Intl.DateTimeFormat().format(
    seconddeparturetime
  );
  const secondarrivaltime = new Date(inbound.arrivalAt);
  const secondarriveDate = new Intl.DateTimeFormat().format(secondarrivaltime);

  const firstdepartTime = new Intl.DateTimeFormat("en-GB", {
    timeStyle: "short",
  }).format(firstdeparturetime);

  const firstarriveTime = new Intl.DateTimeFormat("en-GB", {
    timeStyle: "short",
  }).format(firstarrivaltime);

  const seconddepartTime = new Intl.DateTimeFormat("en-GB", {
    timeStyle: "short",
  }).format(seconddeparturetime);

  const secondarriveTime = new Intl.DateTimeFormat("en-GB", {
    timeStyle: "short",
  }).format(secondarrivaltime);

  //@ts-ignore
  const returnflight = flightSearch.returnflight;

  const purchaseFlight = () => {};

  const selectFlight = async (e: any) => {
    e.preventDefault();
    const data = {
      outbound: {
        itinerary_flight_id: group.id,
        seats: passengers,
        adult: flightSearch.adultPassengers,
        child: flightSearch.childPassengers,
        total: totaloneway,
        currency: inbound.currency,
        returnFlight: flightSearch.returnAt,
      },
    };
    //@ts-ignore
    const cart = JSON.parse(localStorage.getItem(`cart`)) || [];
    cart.push(data);
    localStorage.setItem(`cart`, JSON.stringify(cart));
  };

  return (
    <div className="flightdetails">
      <div className="flightdata">
        <h5>Departing: {firstdepartDate}</h5>
        <h2>
          {outbound.departureDestination} @ {firstdepartTime}
        </h2>
        <h5>Arriving: {firstarriveDate}</h5>
        <h2>
          {outbound.arrivalDestination} @ {firstarriveTime}
        </h2>
        <hr />
        <h5>Departing: {seconddepartDate}</h5>
        <h2>
          {inbound.departureDestination} @ {seconddepartTime}
        </h2>
        <h5>Arriving: {secondarriveDate}</h5>
        <h2>
          {inbound.arrivalDestination} @ {secondarriveTime}
        </h2>
      </div>
      <hr />
      <div className="pricing">
        <h5>Price for {passengers} passengers (oneway):</h5>
        <h2>SEK {totaloneway.toFixed(2)}</h2>
      </div>
      {returnflight === "false" ? (
        <button onClick={purchaseFlight}>Purchase Flight</button>
      ) : (
        <button onClick={selectFlight}>Select Flight</button>
      )}
    </div>
  );
};

export default Indirectdetails;
