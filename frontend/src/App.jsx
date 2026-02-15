import { useState } from "react";
import "./App.css";
import setRemainder from "./api/setremainder.jsx";

function App() {
  const slots = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "P",
    "Q",
    "R",
    "S",
    "W",
    "X",
    "Y",
    "Z",
    "FN1",
    "FN2",
    "FN3",
    "FN4",
    "FN5",
    "AN1",
    "AN2",
    "AN3",
    "AN4",
    "AN5",
  ];

  const segments = ["1-2", "3-4", "5-6", "1-6", "3-6", "1-4"];
  const types = [
    "CORE",
    "LA/CA",
    "Science",
    "FreeElective",
    "Engineering",
    "Other",
  ];
  const [status, setStatus] = useState(<h1>Set Remainder</h1>);
  const [eventName, setEventName] = useState("");
  const [slot, setSlot] = useState("");
  const [seg, setSeg] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");

  return (
    <>
      {status}
      <input
        type="text"
        placeholder="event name"
        className="input"
        onChange={(e) => setEventName(e.target.value)}
        value={eventName}
      />
      <select value={slot} onChange={(e) => setSlot(e.target.value)}>
        <option value="">--Slot--</option>
        {slots.map((slot, i) => {
          return (
            <option key={i} value={slot}>
              {slot}
            </option>
          );
        })}
      </select>

      <select value={seg} onChange={(e) => setSeg(e.target.value)}>
        <option value="">--Segment--</option>
        {segments.map((seg, i) => {
          return (
            <option key={i} value={seg}>
              {seg}
            </option>
          );
        })}
      </select>

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">--Type--</option>
        {types.map((type, i) => {
          return (
            <option key={i} value={type}>
              {type}
            </option>
          );
        })}
      </select>

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      ></input>

      <button
        onClick={() => {
          setRemainder({ eventName, slot, seg, type, location }, setStatus);
        }}
      >
        Set
      </button>
      
      <div className="slotsContainer">
        <img src="./src/assets/slots.png"/>
      </div>
    </>
  );
}

export default App;
