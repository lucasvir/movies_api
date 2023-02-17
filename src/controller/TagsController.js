const knex = require("../database/knex");
const AppError = require("../utils/AppError");


class TagsController {
    // async create(req, res) {
    //     const { name } = req.body;
    //     const { note_id } = req.query;
    //     const user_id = req.user.id;

    //     if (!name) {
    //         throw new AppError("Digite o nome da Tag que deseja adicionar.");
    //     }

    //     await knex("tags")
    //         .insert({
    //             name,
    //             note_id,
    //             user_id,
    //         })
    //         .where({ user_id });

    //     return res.json();
    // }

    async index(req, res) {
        const user_id = req.user.id;
        const tags = await knex("tags").where({ user_id });

        // const notes = await knex("notes").where({ user_id });

        return res.json(tags);
    }
}

module.exports = TagsController;