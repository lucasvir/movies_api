const knex = require('../database/knex');
const { hash, compare } = require('bcryptjs');
const AppError = require('../utils/AppError');

class UserController {
  async create(req, res) {
    const { name, email, password } = req.body;
    const passHashed = await hash(password, 8);

    const checkUserExists = await knex('users').where('email', email);

    if (checkUserExists == '') {
      await knex('users').insert({
        name,
        email,
        password: passHashed,
      });
    } else {
      throw new AppError('Este e-mail já está em uso.');
    }

    return res.status(201).json();
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body;

    const user_id = req.user.id;

    const user = await knex('users').where('id', user_id);

    const avatar = user[0].avatar;

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    const emailAlreadyExists = await knex('users').where(
      'email',
      email
    );

    if (emailAlreadyExists && emailAlreadyExists[0].id !== user_id) {
      throw new AppError('Este e-mail já está em uso');
    }

    user[0].name = name ?? user[0].name;
    user[0].email = email ?? user[0].email;

    if (password && !old_password) {
      throw new AppError('Você precisa digitar a senha antiga.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(
        old_password,
        user[0].password
      );

      if (!checkOldPassword) {
        throw new AppError('A senha antiga não confere.');
      }

      user[0].password = await hash(password, 8);
    }

    await knex('users')
      .update({
        name: user[0].name,
        email: user[0].email,
        password: user[0].password,
        avatar: user[0].avatar,
        updated_at: knex.fn.now(),
      })
      .where('id', user_id);

    return res.json();
  }
}

module.exports = UserController;
