const { Router } = require("express");

const userRouter = require("./users.routes");
const movieRouter = require("./movie.routes");
const movie_tagRouter = require("./movie_tags.routes");

const routes = Router();
routes.use("/users", userRouter);
routes.use("/movies", movieRouter);
routes.use("/movie_tags", movie_tagRouter);

module.exports = routes;
