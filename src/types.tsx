import React from "react";

export interface flightTypes {
  departureDestination: string;
  arrivalDestination: string;
  returnflight: string;
  departureAt: string;
  returnAt: string;
  adultPassengers: number;
  childPassengers: number;
}

export type FlightContextType = {
  flights: flightTypes[];
  destinations: string[];
  setFlights: React.Dispatch<React.SetStateAction<flightTypes[]>>;
};
