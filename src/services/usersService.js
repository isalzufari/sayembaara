const bcrypt = require('bcrypt');

const UsersRepository = require('../repository/usersRepository');
const AuthenticationError = require('../exceptions/AuthenticationError');
const AuthorizationError = require('../exceptions/AuthorizationError');

class UsersService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  // return an id (string)
  async addUser({
    name, email, password, category,
  }) {
    await this.usersRepository.avaibilityEmail(email);

    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultProfile = 'https://placehold.co/100x100';
    const defaultBanner = 'https://placehold.co/600x200';
    const result = this.usersRepository.addUser({
      name,
      email,
      password: hashedPassword,
      profile: defaultProfile,
      banner: defaultBanner,
      category,
    });

    return result;
  }

  // return object of id (string) and category (string)
  async verifyUserCredential({ email, password }) {
    const { id, password: hashedPassword } = await this.usersRepository.getPasswordByEmail(email);

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('verifyUserCredential: Credential is wrong or not match!');
    }

    return id;
  }

  async getUserById({ id }) {
    const user = await this.usersRepository.getUserById(id);
    return user;
  }

  async verifyRoleById({ id, role }) {
    const { category } = await this.usersRepository.verifyRoleById(id);

    if (category !== role) {
      throw new AuthorizationError('verifyRoleById: Akses ditolak!');
    }
  }

  async getOwnerNameById({ id }) {
    const { owner } = await this.usersRepository.getOwnerNameById(id);
    return owner;
  }
}

module.exports = UsersService;
