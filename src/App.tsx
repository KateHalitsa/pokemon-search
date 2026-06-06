import { useState } from "react";
import Modal from "./components/Modal/Modal";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setIsOpen(true)}>
          Click to Open Modal
        </button>

        <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
          This is Modal Content!
        </Modal>
      </header>
    </div>
  );
}

export default App;