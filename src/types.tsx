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

export interface flightSearchtype {
  departureDestination: string;
  arrivalDestination: string;
  returnflight: string;
  departureAt: string;
  returnAt: string;
  adultPassengers: number;
  childPassengers: number;
}

export type FlightContextType = {
  directFlights: flightTypes[];
  indirectFlights: flightTypes[];
  flightSearch: flightSearchtype;
  destinations: string[];
  setDirectFlights: React.Dispatch<React.SetStateAction<flightTypes[]>>;
  setIndirectFlights: React.Dispatch<React.SetStateAction<flightTypes[]>>;
  setFlightSearch: React.Dispatch<React.SetStateAction<flightSearchtype>>;
};
