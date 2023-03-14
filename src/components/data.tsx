import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { FlightContextType, flightTypes } from "../types";

type ContextProps = {
  children: React.ReactNode;
};

export const AllContext = createContext<FlightContextType>({
  flights: [],
  setFlights: () => {},
  destinations: [],
});

export const Data = ({ children }: ContextProps) => {
  const [flights, setFlights] = useState<flightTypes[]>([]);
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
        setFlights,
        flights,
        destinations,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
export default AllContext;
