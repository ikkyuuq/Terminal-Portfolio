import "./style.css";
import "./App.css";
import { useState } from "react";
import Navbar from "./Navbar";
import Terminal from "./Terminal";
import { CSSTransition } from 'react-transition-group';
import  ReactDOMServer  from 'react-dom/server';

function App() {
  const [isTerminalVisible, setTerminalVisible] = useState(true);

  function toggleTerminalVisibility() {
    console.log("Toggle terminal visibility!");
    setTerminalVisible(!isTerminalVisible);
  }
  return (
    <div className="App">
      <Navbar toggleTerminalVisibility={toggleTerminalVisibility}/>
      <CSSTransition
          in={isTerminalVisible}
          timeout={300}
          classNames="terminal"
          unmountOnExit
        >
          <Terminal />
        </CSSTransition>
    </div>
  );
}

export default App;

ReactDOMServer.renderToString(<App/>);
