const { Router } = require("express");

const MovieController = require("../controllers/MovieController");
const movieRoutes = Router();
const movieController = new MovieController();

// movieRoutes.get("/", movieController.index);
movieRoutes.get("/:user_id", movieController.show);
movieRoutes.post("/:user_id", movieController.create);
movieRoutes.delete("/:id", movieController.delete);

module.exports = movieRoutes;
