const UserCreateService = require('./UserCreateService');
const UserRepositoryMemory = require('../repositories/UserRepositoryMemory');
const AppError = require('../utils/AppError');

describe('UserCreateService', () => {
  let userRepositoryMemory = null;
  let userCreateService = null;

  beforeEach(() => {
    userRepositoryMemory = new UserRepositoryMemory();
    userCreateService = new UserCreateService(userRepositoryMemory);
  });

  it('user should be created', async () => {
    const user = {
      name: 'UserrrrTest',
      email: 'usertest@test.com',
      password: '123',
    };

    const userCreated = await userCreateService.execute(user);

    expect(userCreated).toHaveProperty('id');
  });

  it('user should  not be created with email alredy exist', async () => {
    const user1 = {
      name: 'User Test 1',
      email: 'user1@test.com',
      password: '123',
    };

    const user2 = {
      name: 'User Test 2',
      email: 'user1@test.com',
      password: '321',
    };

    await userCreateService.execute(user1);
    await expect(userCreateService.execute(user1)).rejects.toEqual(
      new AppError('Este e-mail já está em uso.')
    );
  });
});
