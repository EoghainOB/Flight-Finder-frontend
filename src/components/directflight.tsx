import { useContext } from "react";
import AllContext from "./data";
import { FlightContextType } from "../types";
import Directdetails from "./directdetails";

const DirectFlight = () => {
  const { directFlights } = useContext(AllContext) as FlightContextType;

  return (
    <>
      {directFlights.map((flight, index) => {
        return (
          <div key={index} className="details">
            <Directdetails flight={flight} />
          </div>
        );
      })}
    </>
  );
};

export default DirectFlight;
