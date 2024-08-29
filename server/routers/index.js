const { Router } = require("express");
const GameController = require("../controllers/GameController");
const router = new Router();

router.post("/start_game", GameController.startGame);
router.post("/guess", GameController.guess);
router.get("/", (req, res) => {
  res.send("<p>Server is working</p>");
  console.log("work");
});
module.exports = router;
