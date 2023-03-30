import { useContext } from "react";
import AllContext from "./data";
import { FlightContextType } from "../types";
import Indirectdetails from "./indirectdetails";

const IndirectFlight = () => {
  const { indirectFlights } = useContext(AllContext) as FlightContextType;

  return (
    <>
      {indirectFlights
        ? indirectFlights?.map((flight, index) => {
            return (
              <div key={index} className="details">
                <Indirectdetails flight={flight} />
              </div>
            );
          })
        : ""}
    </>
  );
};

export default IndirectFlight;
