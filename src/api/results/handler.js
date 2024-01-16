
const ROLES = require('../../utils/rolesENUM');

class ResultsHandler {
  constructor(usersService, resultsService, commentsService, jobsService) {
    this._usersService = usersService
    this._resultsService = resultsService;
    this._commentsService = commentsService;
    this._jobsService = jobsService;

    this.postResultHandler = this.postResultHandler.bind(this);
    this.postCommentResultHandler = this.postCommentResultHandler.bind(this);
    this.getResultByIdHandler = this.getResultByIdHandler.bind(this);
    this.choosenResult = this.choosenResult.bind(this);
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

  async postCommentResultHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { resultId } = request.params;
    const { message } = request.payload;

    const commentId = await this._commentsService.addResultComment(userId, resultId, message);

    const response = h.response({
      status: 'success',
      data: {
        commentId,
      },
    });
    response.code(201);
    return response;
  }

  async getResultByIdHandler(request, h) {
    const { resultId } = request.params;

    const result = await this._resultsService.getResultById(resultId);
    const comments = await this._commentsService.getResultComments(resultId);

    const resultMapped = {
      id: result.id,
      owner: result.owner,
      profile: result.profile,
      file: `http://${request.headers.host}/${result.file}`,
      title: result.title,
      description: result.description,
      isChoose: result.isChoose,
      comments: comments,
    }

    const response = h.response({
      status: 'success',
      data: resultMapped
    });
    response.code(200);
    return response;
  }

  async choosenResult(request, h) {
    const { id: userId } = request.auth.credentials;
    const { jobId, resultId } = request.params;

    await this._usersService.verifyRoleById({ id: userId, role: ROLES.UMKM });
    await this._jobsService.ownerJob(jobId, userId);
    const choosenId = await this._resultsService.choosenResult(jobId, resultId);

    const response = h.response({
      status: 'success',
      data: {
        choosenId,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = ResultsHandler;
