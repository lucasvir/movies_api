const knex = require('../database/knex/');
const { hash, compare } = require('bcryptjs');
const AppError = require('../utils/AppError');

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const checkUserExists = await knex('users').where('email', email);

    if (checkUserExists) {
      throw new AppError('Este e-mail já está em uso.');
    }

    const passHashed = await hash(password, 8);

    await knex.insert({
      name,
      email,
      passHashed,
    });

    return response.status(201).json();
  }
}

module.exports = UserController;
