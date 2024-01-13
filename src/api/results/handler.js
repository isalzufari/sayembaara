
const ROLES = require('../../utils/rolesENUM');

class ResultsHandler {
  constructor(usersService, resultsService) {
    this._usersService = usersService
    this._resultsService = resultsService;

    this.postResultHandler = this.postResultHandler.bind(this);
  }

  async postResultHandler(request, h) {
    const { id: userId } = request.auth.credentials;

    const { jobId } = request.params;

    const {
      title, description, file,
    } = request.payload;
    
    await this._usersService.verifyRoleById({ id: userId, role: ROLES.MAHASISWA });
    
    const resultId = await this._resultsService.postResult(userId, jobId, { title, description, file });
    console.log(resultId);
    
    const response = h.response({
      status: 'success',
      data: {
        resultId,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = ResultsHandler;
