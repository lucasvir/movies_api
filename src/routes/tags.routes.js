const { Router } = require('express');

const TagsController = require('../controller/TagsController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const tagsRouter = Router();
const tagsController = new TagsController();

tagsRouter.post('/', ensureAuthenticated, tagsController.create);
tagsRouter.get('/', ensureAuthenticated, tagsController.index);

module.exports = tagsRouter;
