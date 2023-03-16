import React from "react";

export interface flightTypes {
  departureDestination: string;
  arrivalDestination: string;
  returnflight: string;
  departureAt: string;
  returnAt: string;
  arrivalAt: string;
  adultPassengers: number;
  childPassengers: number;
  currentflight: flightTypes;
}

export type FlightContextType = {
  directFlights: flightTypes[];
  indirectFlights: flightTypes[];
  destinations: string[];
  setDirectFlights: React.Dispatch<React.SetStateAction<flightTypes[]>>;
  setIndirectFlights: React.Dispatch<React.SetStateAction<flightTypes[]>>;
};
