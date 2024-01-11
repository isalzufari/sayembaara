const bcrypt = require('bcrypt');

const UsersRepository = require('../repository/usersRepository');
const AuthorizationRepository = require('../repository/authenticationsRepository');

const AuthenticationError = require('../exceptions/AuthenticationError');

class UsersService {
  constructor() {
    this.usersRepository = new UsersRepository();
    this.authorizationRepository = new AuthorizationRepository();
  }

  // return an id (string)
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

  // return object of id (string) and category (string)
  async login({ email, password }) {
    const body = await this.usersRepository.getPasswordByEmail(email);

    const match = await bcrypt.compare(password, body.password);

    if (!match) {
      throw new AuthenticationError('email or password wrong');
    }

    const idCategory = {
      id: body.id,
      category: body.category,
    };

    return idCategory;
  }
}

module.exports = UsersService;
