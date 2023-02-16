const { Router } = require("express");

const NotesController = require("../controller/NotesController");
const notesRouter = Router();
const notesController = new NotesController();

notesRouter.post("/:user_id", notesController.create);
notesRouter.get("/:id", notesController.show);
notesRouter.get("/", notesController.index);
notesRouter.delete("/:id", notesController.delete);

module.exports = notesRouter;
