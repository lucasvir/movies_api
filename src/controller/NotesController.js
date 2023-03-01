const knex = require('../database/knex');

class NotesController {
  async create(req, res) {
    const { title, description, rating, tags } = req.body;
    const user_id = req.user.id;

    const [note_id] = await knex('notes').insert({
      title,
      description,
      rating,
      user_id,
    });

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        user_id,
        name,
      };
    });

    await knex('tags').insert(tagsInsert);

    return res.json();
  }

  async show(req, res) {
    const { id } = req.params;

    const note = await knex('notes').where({ id }).first();

    const tags = await knex('tags')
      .where({ note_id: id })
      .orderBy('name');

    return res.json({
      ...note,
      tags,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    await knex('notes').where({ id }).delete();

    return res.json();
  }

  async index(req, res) {
    const { title } = req.query;

    const user_id = req.user.id;

    const notes = await knex('notes')
      .where({ user_id })
      .whereLike('title', `%${title}%`)
      .orderBy('title');

    return res.json(notes);
  }
}

module.exports = NotesController;
