const AuthorizationError = require('../../exceptions/AuthorizationError');
const JobsService = require('../../services/jobsService');
const ROLES = require('../../utils/rolesENUM');

class UsersHandler {
  constructor() {
    this.jobsService = new JobsService();

    this.postJobHandler = this.postJobHandler.bind(this);
  }

  async postJobHandler(request, h) {
    const { id: credentialId, category } = request.auth.credentials;

    if (category !== ROLES.UMKM) {
      throw new AuthorizationError('akses ditolak');
    }

    const {
      title, description, tag, deadline, reward, image,
    } = request.payload;

    const jobCreated = {
      title,
      description,
      tag,
      deadline,
      reward,
      image,
      draft: false,
    };
    console.log(jobCreated);

    const userId = await this.jobsService.addJob(credentialId, jobCreated);

    const response = h.response({
      message: 'user created',
      data: {
        userId,
      },
    });
    response.code(201);

    return response;
  }
}

module.exports = UsersHandler;
