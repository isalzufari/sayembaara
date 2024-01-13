const ResultsRepository = require("../repository/resultsRepository");
const Base64ToImg = require("../utils/Base64ToImg");

class ResultsService {
  constructor() {
    this._resultRepository = new ResultsRepository();
  }

  async postResult(userId, jobId, { title, description, file }) {
    const filePath = await Base64ToImg(file);
    const filename = `images/${filePath}`
    const resultCreated = {
      title, description, file: filename
    }

    console.log(resultCreated);

    const result = this._resultRepository.postResult(userId, jobId, resultCreated);

    return result;
  }

  async getJobResults(id) {
    const comments = await this._resultRepository.getResultsByJobId(id);
    return comments
  }
}

module.exports = ResultsService;
