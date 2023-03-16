import "./App.css";
import FlightList from "./components/flightList";
import Footer from "./components/footer";
import Header from "./components/header";
import Input from "./components/input";
import { useContext } from "react";
import AllContext from "./components/data";
import { FlightContextType } from "./types";

function App() {
  const { indirectFlights } = useContext<FlightContextType>(AllContext);
  return (
    <div className="App">
      <Header />
      <div className="input-container">
        <Input />
      </div>
      {indirectFlights.length > 0 && <FlightList />}
      <Footer />
    </div>
  );
}

export default App;
