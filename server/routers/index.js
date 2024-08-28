const { Router } = require("express");
const GameController = require("../controllers/GameController");
const router = new Router();

router.post("/start_game", GameController.startGame);
router.post("/guess", GameController.guess);

module.exports = router;
