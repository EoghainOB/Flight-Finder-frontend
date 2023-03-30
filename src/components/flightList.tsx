import { useContext } from "react";
import AllContext from "./data";
import { FlightContextType } from "../types";
import DirectFlight from "./directflight";
import IndirectFlight from "./indirectflight";

const FlightList = () => {
  const { directFlights, indirectFlights } = useContext(
    AllContext
  ) as FlightContextType;
  return (
    <div className="results-container">
      <div className="searchQuestion">
        {directFlights.length > 0 ? (
          <h2>Direct Flights</h2>
        ) : (
          <h4>Sorry, no direct flights available</h4>
        )}
      </div>
      <DirectFlight />
      <div className="searchQuestion">
        {indirectFlights.length > 0 ? (
          <h2>Indirect Flights</h2>
        ) : (
          <h4>Sorry, no indirect flights available</h4>
        )}
      </div>
      <IndirectFlight />
    </div>
  );
};

export default FlightList;
