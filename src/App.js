import "./style.css";
import "./App.css";
import { useState } from "react";
import Navbar from "./Navbar";
import Terminal from "./Terminal";

function App() {
  const [isTerminalVisible, SetVisiblity] = useState(false);

  function toggleVisiblity() {
    SetVisiblity(!isTerminalVisible);
  }
  return (
    <div className="App">
      <Navbar toggleVisiblity={toggleVisiblity}/>
      {isTerminalVisible && <Terminal/>}
    </div>
  );
}

export default App;
