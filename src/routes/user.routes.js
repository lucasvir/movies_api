const { Router } = require("express");

const multer = require('multer');
const uploadConfig = require('../configs/upload');

const UserController = require("../controller/UsersController");
const UserAvatarController = require("../controller/UserAvatarController");

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const userRouter = Router();

const userController = new UserController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.MULTER);

userRouter.post("/", userController.create);
userRouter.put("/", ensureAuthenticated, userController.update);
userRouter.patch("/avatar", ensureAuthenticated, upload.single('avatar'), userAvatarController.update);

module.exports = userRouter;