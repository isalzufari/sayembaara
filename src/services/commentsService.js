const CommentsRepository = require("../repository/commentsRepository");

class CommentsService {
  constructor() {
    this.commentsRepository = new CommentsRepository();
  }

  async addJobComment(userId, jobId, message) {
    const commentId = await this.commentsRepository.addJobComment({ message, userId, jobId });

    return commentId;
  }

  async getJobCommets(id) {
    const comments = await this.commentsRepository.getCommentsByJobId(id);
    return comments
  }

  async addResultComment(userId, resultId, message) {
    const commentId = await this.commentsRepository.addResultComment({ message, userId, resultId });

    return commentId;
  }

  async getResultComments(id) {
    console.log(id)
    const comments = await this.commentsRepository.getCommentsByResultId(id);
    return comments
  }
}

module.exports = CommentsService;
