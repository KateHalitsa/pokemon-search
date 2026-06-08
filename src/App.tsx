import { useState } from "react";
import Modal from "./components/Modal/Modal";
import "./App.css";
import UncontrolledForm from "./components/UncontrolledForm/UncontrolledForm";
import HookForm from "./HookForm/HookForm";
import Submissions from "./components/Submissions/Submissions";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState('');
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() =>{ setIsOpen(true);
          setFormType('uncontrolled')}
        }>
          Open Uncontrolled Form
        </button>
        <button onClick={() =>{ setIsOpen(true);
          setFormType('hook')}
        }>
        Open React Hook Form        
        </button>

        <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
    {formType === "uncontrolled"
      ? <UncontrolledForm onSuccess={() => setIsOpen(false)}  />
      : <HookForm onSuccess={() => setIsOpen(false)} />}
  
        </Modal>
        <Submissions/>
      </header>
    </div>
  );
}

export default App;