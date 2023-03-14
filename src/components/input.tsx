import { useState, useContext } from "react";
import axios from "axios";
import AllContext from "./data";
import { FlightContextType } from "../types";

interface FormState {
  departureDestination: string;
  arrivalDestination: string;
  returnflight: string;
  departureAt: string;
  returnAt: string;
  adultPassengers: number;
  childPassengers: number;
}

const Input = () => {
  const { setFlights, flights, destinations } =
    useContext<FlightContextType>(AllContext);

  const initialState: FormState = {
    departureDestination: "",
    arrivalDestination: "",
    returnflight: "true",
    departureAt: "",
    returnAt: "",
    adultPassengers: 0,
    childPassengers: 0,
  };

  const [formState, setFormState] = useState<FormState>(initialState);

  const searchFlights = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchData = {
      departureDestination: formState.departureDestination,
      arrivalDestination: formState.arrivalDestination,
      returnflight: formState.returnflight,
      departureAt: formState.departureAt,
      returnAt: formState.returnAt,
      seats: formState.adultPassengers + formState.childPassengers,
    };
    await axios
      .post("http://localhost:8080/api/flightsearch", searchData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        resetForm();
        setFlights([...flights, response.data]);
      });
  };

  const resetForm = () => {
    setFormState(initialState);
  };

  const handleInputChange = (e: React.ChangeEvent<EventTarget>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <form className="searchForm" onSubmit={searchFlights}>
      <div className="searchQuestion">
        <h2>Search flights</h2>
      </div>
      <div className="fromInput">
        <input
          id="flight_from_input"
          name="departureDestination"
          type="text"
          placeholder="Departing from"
          value={formState.departureDestination}
          onChange={handleInputChange}
        />
      </div>
      <div className="toInput">
        <input
          id="flight_to_input"
          name="arrivalDestination"
          type="text"
          placeholder="Arriving at"
          value={formState.arrivalDestination}
          onChange={handleInputChange}
        />
      </div>
      <hr />
      <div className="dropdowns">
        <div className="returnSelect">
          <select
            id="return_select"
            name="returnflight"
            value={formState.returnflight}
            onChange={handleInputChange}
          >
            <option value="true">Round trip</option>
            <option value="false">One-way</option>
          </select>
        </div>
        <div className="passengersSelect">
          <label htmlFor="adult_select">Adult:</label>
          <select
            id="adult_select"
            name="adultPassengers"
            value={formState.adultPassengers}
            onChange={handleInputChange}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <label htmlFor="child_select">Children:</label>
          <select
            id="child_select"
            name="childPassengers"
            value={formState.childPassengers}
            onChange={handleInputChange}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
      <hr />
      <div className="dateSelect">
        <div className="departDate">
          <label htmlFor="from_date">Depart</label>
          <input
            id="from_date"
            name="departureAt"
            type="date"
            value={formState.departureAt}
            onChange={handleInputChange}
          />
        </div>
        <div className="returnDate">
          <label htmlFor="to_date">Return</label>
          <input
            id="to_date"
            name="returnAt"
            type="date"
            value={formState.returnAt}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <hr />
      <button>Find Flights</button>
    </form>
  );
};

export default Input;
