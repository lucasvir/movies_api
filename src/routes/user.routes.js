const { Router } = require('express');

const UserController = require('../controller/UsersController');
const userRouter = Router();
const userController = new UserController();

userRouter.post('/', userController.create);

module.exports = userRouter;
