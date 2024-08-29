import React, { useEffect, useState } from "react";
import "./index.css";
import { guess, startGame } from "./api/GameApi";
import NumberInput from "./components/NumberInput";

function App() {
  return (
    <div className="App">
      <h1 className="logo">Вгадай число!</h1>
      <NumberInput />
    </div>
  );
}

export default App;
