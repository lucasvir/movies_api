const knex = require("../database/knex");

class NotesController {
    async create(req, res) {
        const { title, description, rating } = req.body;
        const user_id = req.user.id;

        await knex("notes").insert({
            title,
            description,
            rating,
            user_id,
        });

        return res.json();
    }

    async show(req, res) {
        const { id } = req.params;

        const note = await knex("notes").where({ id }).first();

        const tags = await knex('tags').where({ note_id: id }).orderBy('name');

        return res.json({
            ...note,
            tags
        });
    }

    async delete(req, res) {
        const { id } = req.params;

        await knex("notes").where({ id }).delete();

        return res.json();
    }

    async index(req, res) {
        const { note_id, title } = req.query;
        const user_id = req.user.id;
        
        const notes = await knex("notes")
            .where({ user_id })
            .whereLike("title", `%${title}%`)
            .orderBy("title");

        const tags = await knex("tags").where({ note_id });

        return res.json({
            ...notes,
            tags,
        });
    }
}

module.exports = NotesController;