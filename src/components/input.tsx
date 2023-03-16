import { useState, useContext } from "react";
import axios from "axios";
import AllContext from "./data";
import { FlightContextType } from "../types";

const Input = () => {
  const { setDirectFlights, setIndirectFlights, destinations } =
    useContext<FlightContextType>(AllContext);

  const initialState = {
    departureDestination: "",
    arrivalDestination: "",
    returnflight: "true",
    departureAt: "",
    returnAt: "",
    adultPassengers: 0,
    childPassengers: 0,
  };

  const [formState, setFormState] = useState(initialState);

  const searchFlights = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchData = {
      departureDestination: formState.departureDestination,
      arrivalDestination: formState.arrivalDestination,
      departureAt: formState.departureAt,
      seats: +formState.adultPassengers + +formState.childPassengers,
      priceRangeHigh: 10000,
      priceRangeLow: 0,
    };
    await axios
      .get("http://localhost:8080/api/flightsearch", { params: searchData })
      .then((response) => {
        resetForm();
        setDirectFlights(response.data.data.direct);
        setIndirectFlights(response.data.data.indirect);
      });
  };

  const resetForm = () => {
    setFormState(initialState);
  };

  const handleInputChange = (e: React.ChangeEvent<EventTarget>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setFlightSearch({
      ...flightSearch,
      [name]: value,
    });
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
        <select
          id="flight_from_input"
          name="departureDestination"
          onChange={handleInputChange}
        >
          <option value="">Departing from</option>
          {destinations.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="toInput">
        <select
          id="flight_to_input"
          name="arrivalDestination"
          onChange={handleInputChange}
        >
          <option value="">Arriving at</option>
          {destinations
            .filter((option) => option !== formState.departureDestination)
            .map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>
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
