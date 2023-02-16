const { Router } = require("express");

const usersRouter = require("./user.routes");
const sessionsRouter = require("./sessions.routes");
const notesRouter = require("./notes.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/notes", notesRouter);

module.exports = routes;
