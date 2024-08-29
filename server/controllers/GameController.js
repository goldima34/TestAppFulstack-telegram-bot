class GameController {
  startGame(req, res) {
    try {
      const targetNumber = Math.floor(Math.random() * 100) + 1;
      res.status(200).json({
        message: "Гра почалася! Вгадайте число.",
        targetNumber: targetNumber,
      });
    } catch (error) {
      res.status(500).json({ error: "Не вдалося запустити гру" });
    }
  } // - генерує випадкове число і зберігає його, можна в оперативній пам’яті

  guess(req, res) {
    try {
      const { userNumber, targetNumber } = req.body; // Виймаємо с body число яке вписав юзер
      console.log(userNumber, targetNumber);
      if (targetNumber === null) {
        console.log("24");
        return res.status(400).json({ error: "Гру не запущено" });
      }

      if (
        typeof userNumber !== "number" ||
        userNumber < 1 ||
        userNumber > 100
      ) {
        console.log("32");
        return res.status(400).json({
          error: "Неправильна відповідь. Має бути число від 1 до 100.",
        });
      }

      if (userNumber < targetNumber) {
        res.status(200).json({ message: "Занадто мале число!" });
      } else if (userNumber > targetNumber) {
        res.status(200).json({ message: "Занадто велике число!" });
      } else {
        res
          .status(200)
          .json({ message: "Вітаю! Ви вгадали число!", gameEnd: true });
      }
    } catch (error) {
      res.status(500).json({ error: "Не вдалося обробити числа" });
    }
  } //- приймає число від гравця і повертає результат - більше, меньше або вгадано.
}

module.exports = new GameController();
