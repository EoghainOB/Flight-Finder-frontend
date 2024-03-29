import { useContext } from "react";
import AllContext from "./data";
import axios from "axios";
import { FlightContextType } from "../types";

const Directdetails = (flight: any) => {
  const { flightSearch, setDirectFlights, setIndirectFlights, directFlights } =
    useContext(AllContext) as FlightContextType;
  const singleflight = flight.flight.currentFlight;

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
    console.log("DIRECT", searchData);
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
          <div className="departingTitle">
            <h5>Departing: {departDate}</h5>
          </div>
          <div className="departingTime">
            <h2>
              {singleflight.departureDestination} @ {departTime}
            </h2>
          </div>
        </div>
        <div className="arrive">
          <div className="arrivingTitle">
            <h5>Arriving: {arriveDate}</h5>
          </div>
          <div className="arrivingTime">
            <h2>
              {singleflight.arrivalDestination} @ {arriveTime}
            </h2>
          </div>
        </div>
      </div>
      <hr />
      <div className="pricing">
        <div className="pricingDetails">
          <div className="priceText">
            <h5>Price for {passengers} passengers (oneway):</h5>
          </div>
          <div className="priceAmount">
            <h2>SEK {totaloneway.toFixed(2)}</h2>
          </div>
        </div>
      </div>
      <div className="formButton">
        {returnflight === "false" ? (
          <button onClick={purchaseFlight}>Purchase Flight</button>
        ) : (
          <button onClick={selectFlight}>Select Flight</button>
        )}
      </div>
    </div>
  );
};

export default Directdetails;
