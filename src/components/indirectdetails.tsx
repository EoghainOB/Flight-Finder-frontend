import { useContext } from "react";
import AllContext from "./data";
import axios from "axios";
import { FlightContextType } from "../types";

const Indirectdetails = (flight: any) => {
  const { flightSearch, setDirectFlights, setIndirectFlights, directFlights } =
    useContext(AllContext) as FlightContextType;

  const group = flight.flight;
  const inbound = flight.flight.inboundFlight;
  const outbound = flight.flight.outboundFlight;

  const passengers = (flightSearch.adultPassengers +
    flightSearch.childPassengers) as number;
  const totaloneway = (flightSearch.adultPassengers * group.adultIndirect +
    flightSearch.childPassengers * group.childIndirect) as number;

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
        itinerary_flight_id: group.itinerary_flight_id,
        seats: passengers,
        adult: flightSearch.adultPassengers,
        child: flightSearch.childPassengers,
        total: totaloneway,
        currency: group.currency,
      },
    };
    const cart = JSON.parse(localStorage.getItem(`cart`) as any) || [];
    cart.push(data);
    localStorage.setItem(`cart`, JSON.stringify(cart));
    const searchData = {
      departureDestination: flightSearch.arrivalDestination,
      arrivalDestination: flightSearch.departureDestination,
      departureAt: flightSearch.returnAt,
      seats: passengers,
      priceRangeHigh: 10000,
      priceRangeLow: 0,
    };
    console.log("INDIRECT", searchData);
    await axios
      .get("http://localhost:8080/api/flightsearch", { params: searchData })
      .then((response) => {
        console.log("response", response.data.data.direct);
        setDirectFlights(response.data.data.direct);
        setIndirectFlights(response.data.data.indirect);
        console.log("DirectFlights", directFlights);
      });
  };

  return (
    <div className="flightdetails">
      <div className="flightdata">
        <div className="depart">
          <h5>Departing: {firstdepartDate}</h5>
          <h2>
            {outbound.departureDestination} @ {firstdepartTime}
          </h2>
          <h5>Arriving: {firstarriveDate}</h5>
          <h2>
            {outbound.arrivalDestination} @ {firstarriveTime}
          </h2>
        </div>
        <div className="arrive">
          <h5>Departing: {seconddepartDate}</h5>
          <h2>
            {inbound.departureDestination} @ {seconddepartTime}
          </h2>
          <h5>Arriving: {secondarriveDate}</h5>
          <h2>
            {inbound.arrivalDestination} @ {secondarriveTime}
          </h2>
        </div>
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
