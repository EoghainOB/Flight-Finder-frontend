import { useContext } from "react";
import AllContext from "./data";
import { FlightContextType } from "../types";

const Directdetails = (flight: any) => {
  const { flightSearch } = useContext(AllContext) as FlightContextType;
  const singleflight = flight.flight.currentFlight;

  const passengers =
    //@ts-ignore
    flightSearch.adultPassengers + flightSearch.childPassengers;
  const totaloneway =
    //@ts-ignore
    flightSearch.adultPassengers * singleflight.adult +
    //@ts-ignore
    flightSearch.childPassengers * singleflight.child;

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

  //@ts-ignore
  const returnflight = flightSearch.returnflight;

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
        <button>Purchase Flight</button>
      ) : (
        <button>Select Flight</button>
      )}
    </div>
  );
};

export default Directdetails;
