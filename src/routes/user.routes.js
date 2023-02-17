const { Router } = require("express");

const UserController = require("../controller/UsersController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const userRouter = Router();
const userController = new UserController();

userRouter.post("/", userController.create);
userRouter.put("/", ensureAuthenticated, userController.update);

module.exports = userRouter;