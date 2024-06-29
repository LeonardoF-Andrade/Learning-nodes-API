const { Router } = require("express");

const MovieTagController = require("../controllers/movieTagController");
const movieTagRouter = Router();
const movieTagController = new MovieTagController();

movieTagRouter.get("/:user_id", movieTagController.index);

module.exports = movieTagRouter;
