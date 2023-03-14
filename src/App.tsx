import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import Input from "./components/input";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="input-container">
        <Input />
      </div>
      <Footer />
    </div>
  );
}

export default App;
