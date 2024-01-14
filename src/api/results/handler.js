
const ROLES = require('../../utils/rolesENUM');

class ResultsHandler {
  constructor(usersService, resultsService, commentsService) {
    this._usersService = usersService
    this._resultsService = resultsService;
    this._commentsService = commentsService

    this.postResultHandler = this.postResultHandler.bind(this);
    this.postCommentResultHandler = this.postCommentResultHandler.bind(this);
    this.getResultByIdHandler = this.getResultByIdHandler.bind(this);
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
    console.log(result)
    const comments = await this._commentsService.getResultComments(resultId);
    console.log(comments)

    const resultMapped = {
      id: result[0].id,
      owner: result[0].owner,
      profile: result[0].profile,
      file: `http://${request.headers.host}/${result[0].file}`,
      title: result[0].title,
      description: result.description,
      comments: comments,
    }

    const response = h.response({
      status: 'success',
      data: {
        resultMapped,
      },
    });
    response.code(200);
    return response;
  }
}

module.exports = ResultsHandler;
