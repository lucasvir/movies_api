const knex = require("../database/knex");

class NotesController {
  async create(req, res) {
    const { title, description, rating } = req.body;
    const { user_id } = req.params;

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

    return res.json(note);
  }

  async delete(req, res) {
    const { id } = req.params;

    await knex("notes").where({ id }).delete();

    return res.json();
  }

  async index(req, res) {
    const { user_id, title } = req.query;
    const notes = await knex("notes")
      .where({ user_id })
      .whereLike("title", `%${title}%`)
      .orderBy("title");

    return res.json(notes);
  }
}

module.exports = NotesController;
