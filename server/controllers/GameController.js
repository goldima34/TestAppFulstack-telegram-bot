class GameController {
  constructor() {
    this.targetNumber = null; //
  }

  startGame(req, res) {
    try {
      this.targetNumber = Math.floor(Math.random() * 100) + 1;
      console.log("Game started! Target number:", this.targetNumber);

      res.status(200).json({ message: "Гра почалася! Вгадайте число." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Не вдалося запустити гру" });
    }
  } // - генерує випадкове число і зберігає його, можна в оперативній пам’яті

  guess(req, res) {
    try {
      const { guess } = req.body; // Виймаємо с body число яке вписав юзер

      if (this.targetNumber === null) {
        return res.status(400).json({ error: "Гру не запущено" });
      }

      if (typeof guess !== "number" || guess < 1 || guess > 100) {
        return res.status(400).json({
          error: "Неправильна відповідь. Має бути число від 1 до 100.",
        });
      }

      if (guess < this.targetNumber) {
        res.status(200).json({ message: "Занадто мале число!" });
      } else if (guess > this.targetNumber) {
        res.status(200).json({ message: "Занадто велике число!" });
      } else {
        res.status(200).json({ message: "Вітаю! Ви вгадали число!" });
        this.targetNumber = null; // кидаємо в номер null для ресета гри
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Не вдалося обробити числа" });
    }
  } //- приймає число від гравця і повертає результат - більше, меньше або вгадано.
}

module.exports = new GameController();
