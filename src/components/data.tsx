import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { FlightContextType, flightSearchtype, flightTypes } from "../types";

type ContextProps = {
  children: React.ReactNode;
};

export const AllContext = createContext<FlightContextType | null>(null);

export const Data = ({ children }: ContextProps) => {
  const [directFlights, setDirectFlights] = useState<flightTypes[]>([]);
  const [indirectFlights, setIndirectFlights] = useState<flightTypes[]>([]);
  const [destinations, setDestinations] = useState<string[]>([]);

  const [flightSearch, setFlightSearch] = useState<flightSearchtype>({
    departureDestination: "",
    arrivalDestination: "",
    returnflight: "true",
    departureAt: "",
    returnAt: "",
    adultPassengers: 0,
    childPassengers: 0,
  });

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
        flightSearch,
        setFlightSearch,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
export default AllContext;
