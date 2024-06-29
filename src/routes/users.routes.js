const { Router } = require("express");

const UserController = require("../controllers/userController.js");
const userRouter = Router();
const userController = new UserController();

userRouter.post("/", userController.create);
// userRouter.delete('/:id', userController.delete);
userRouter.put('/:id', userController.update);

module.exports = userRouter;
