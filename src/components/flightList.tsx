import DirectFlight from "./directflight";
import IndirectFlight from "./indirectflight";

const FlightList = () => {
  return (
    <div className="results-container">
      <div className="searchQuestion">
        <h2>Direct Flights</h2>
      </div>
      <DirectFlight />
      <div className="searchQuestion">
        <h2>Indirect Flights</h2>
      </div>
      <IndirectFlight />
    </div>
  );
};

export default FlightList;
