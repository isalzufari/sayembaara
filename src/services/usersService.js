const bcrypt = require('bcrypt');

const UsersRepository = require('../repository/usersRepository');
const AuthorizationRepository = require('../repository/authenticationsRepository');

const AuthenticationError = require('../exceptions/AuthenticationError');

class UsersService {
  constructor() {
    this.usersRepository = new UsersRepository();
    this.authorizationRepository = new AuthorizationRepository();
  }

  async addUser({
    name, email, password, category,
  }) {
    await this.usersRepository.avaibilityEmail(email);

    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultProfile = 'public/image/default/default-profile.jpg';
    const result = this.usersRepository.addUser({
      name,
      email,
      password: hashedPassword,
      profile: defaultProfile,
      banner: defaultProfile,
      category,
    });

    return result;
  }

  async login({ email, password }) {
    const { id, hashedPassword } = await this.usersRepository.getPasswordByEmail(email);

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('email or password wrong');
    }

    return { id, category };
  }
}

module.exports = UsersService;
