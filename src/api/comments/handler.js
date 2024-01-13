
const ROLES = require('../../utils/rolesENUM');

class CommentsHandler {
  constructor(commentsService) {
    this._commentsService = commentsService;

    this.postCommentJobHandler = this.postCommentJobHandler.bind(this);
  }

  async postCommentJobHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { jobId } = request.params;
    const { message } = request.payload;
    
    const commentId = await this._commentsService.addJobComment(userId, jobId, message);

    const response = h.response({
      status: 'success',
      data: {
        commentId,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = CommentsHandler;
