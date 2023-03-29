import { useContext } from "react";
import AllContext from "./data";
import axios from "axios";
import { FlightContextType } from "../types";

const Directdetails = (flight: any) => {
  const { flightSearch, setDirectFlights, setIndirectFlights } = useContext(
    AllContext
  ) as FlightContextType;
  const singleflight = flight.flight.currentFlight;

  console.log(flightSearch);

  const passengers = (flightSearch.adultPassengers +
    flightSearch.childPassengers) as number;
  const totaloneway = (flightSearch.adultPassengers * singleflight.adult +
    flightSearch.childPassengers * singleflight.child) as number;

  const departuretime = new Date(singleflight.departureAt);
  const departDate = new Intl.DateTimeFormat().format(departuretime);
  const arrivetime = new Date(singleflight.arrivalAt);
  const arriveDate = new Intl.DateTimeFormat().format(arrivetime);

  const departTime = new Intl.DateTimeFormat("en-GB", {
    timeStyle: "short",
  }).format(departuretime);

  const arriveTime = new Intl.DateTimeFormat("en-GB", {
    timeStyle: "short",
  }).format(arrivetime);

  const returnflight = flightSearch.returnflight;

  const purchaseFlight = () => {};

  const selectFlight = async (e: any) => {
    e.preventDefault();
    const data = {
      outbound: {
        itinerary_flight_id: singleflight.itinerary_flight_id,
        seats: passengers,
        adult: flightSearch.adultPassengers,
        child: flightSearch.childPassengers,
        total: totaloneway,
        currency: singleflight.currency,
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
    console.log(searchData);
    await axios
      .get("http://localhost:8080/api/flightsearch", { params: searchData })
      .then((response) => {
        console.log("response", response);
        setDirectFlights(response.data.data.direct);
        setIndirectFlights(response.data.data.indirect);
      });
  };

  return (
    <div className="flightdetails">
      <div className="flightdata">
        <h5>Departing: {departDate}</h5>
        <h2>
          {singleflight.departureDestination} @ {departTime}
        </h2>
        <h5>Arriving: {arriveDate}</h5>
        <h2>
          {singleflight.arrivalDestination} @ {arriveTime}
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

export default Directdetails;
