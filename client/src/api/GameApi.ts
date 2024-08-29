import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL + "/api/";

export const startGame = async () => {
  const { data } = await axios.post(SERVER_URL + "start_game", {});
  return data;
};

export const guess = async (userNumber: Number, targetNumber: Number) => {
  const { data } = await axios.post(SERVER_URL + "guess", {
    userNumber: userNumber,
    targetNumber: targetNumber,
  });
  return data;
};
