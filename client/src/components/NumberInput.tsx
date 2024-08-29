import React, { useEffect, useState } from "react";
import { guess, startGame } from "../api/GameApi";

const NumberInput = () => {
  const [userNumber, setUserNumber] = useState<string | null>(null);
  const [gameEnd, setGameEnd] = useState(false);
  const [targetNumber, setTargetNumber] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    startGame().then((data) => {
      const { targetNumber, message } = data;
      setTargetNumber(targetNumber);
      setMessage(message);
    });
  }, []);

  const sendClick = async () => {
    const num = Number(userNumber);
    if (isNaN(num)) {
      setMessage("Please enter a valid number.");
      return;
    }

    if (targetNumber === null) {
      setMessage("Game has not started properly.");
      return;
    }

    try {
      const response = await guess(num, targetNumber);
      setMessage(response.message);
      if (response.gameEnd === true) {
        setGameEnd(true);
      }
    } catch (error) {
      setMessage("Error sending guess.");
      console.log(error);
    }
  };

  const restart = () => {
    window.location.reload();
  };
  return (
    <div className="number-input-container">
      <input
        onChange={(e) => setUserNumber(e.target.value)}
        className="number-input"
        type="text"
        placeholder="Введіть число"
        value={userNumber || ""}
      />
      {!gameEnd && (
        <button className="send-btn" onClick={sendClick}>
          Спробувати
        </button>
      )}
      {gameEnd && (
        <button className="send-btn" onClick={restart}>
          Почати знову
        </button>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default NumberInput;
