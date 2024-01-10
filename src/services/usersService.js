const bcrypt = require('bcrypt');
const UsersRepository = require('../repository/usersRepository');

class UsersService {
  constructor() {
    this.usersRepository = new UsersRepository();
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
}

module.exports = UsersService;
