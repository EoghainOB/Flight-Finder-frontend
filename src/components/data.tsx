import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { FlightContextType, flightTypes } from "../types";

type ContextProps = {
  children: React.ReactNode;
};

export const AllContext = createContext<FlightContextType>({
  directFlights: [],
  setDirectFlights: () => {},
  indirectFlights: [],
  setIndirectFlights: () => {},
  destinations: [],
});

export const Data = ({ children }: ContextProps) => {
  const [directFlights, setDirectFlights] = useState<flightTypes[]>([]);
  const [indirectFlights, setIndirectFlights] = useState<flightTypes[]>([]);
  const [destinations, setDestinations] = useState<string[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/flights").then((response) => {
      const flights = response.data.data;
      const departureDestinations = flights.map(
        (flight: any) => flight.departureDestination
      );
      const uniqueDepartureDestinations: any = Array.from(
        new Set(departureDestinations)
      );
      setDestinations(uniqueDepartureDestinations);
    });
  }, []);

  return (
    <AllContext.Provider
      value={{
        setIndirectFlights,
        setDirectFlights,
        indirectFlights,
        directFlights,
        destinations,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
export default AllContext;
