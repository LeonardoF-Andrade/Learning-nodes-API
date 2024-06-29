require("express-async-errors");

const express = require("express");
const database = require("./database/sqlite");
const AppError = require("./utils/AppError");
const routes = require("./routes");

const app = express();
app.use(express.json());

database();
app.use(routes);

const PORT = 3333;

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
