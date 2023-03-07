const { hash } = require('bcryptjs');
const AppError = require('../utils/AppError');

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    const passHashed = await hash(password, 8);

    const checkUserExists = await this.userRepository.findByEmail(
      email
    );

    if (checkUserExists) {
      throw new AppError('Este e-mail já está em uso.');
    }

    const userCreated = await this.userRepository.create({
      name,
      email,
      password: passHashed,
    });

    return userCreated;
  }
}

module.exports = UserCreateService;
