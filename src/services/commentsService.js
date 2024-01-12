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
    console.log(comments)
    return comments
  }
}

module.exports = CommentsService;
