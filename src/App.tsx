import "./App.css";
import TipCalculator from "./components/TipCalculator";

function App() {
  return (
    <main className="app-container">
      <h1 className="app-title">
        <span className="app-title-top">SPLI</span>
        <span className="app-title-bottom">TTER</span>
      </h1>
      <TipCalculator />
    </main>
  );
}

export default App;
