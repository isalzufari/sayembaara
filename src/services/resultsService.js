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
    const results = await this._resultRepository.getResultsByJobId(id);
    return results
  }

  async getResultById(id) {
    const result = await this._resultRepository.getResultById(id);
    return result;
  }

  async choosenResult(jobId, resultId) {
    const { isChoose } = await this._resultRepository.getIsChoosenById(resultId);
    const updateIsChoose = isChoose === 0 ? 1 : 0;
    const result = await this._resultRepository.choosenResult({ updateIsChoose, jobId, resultId });
    return result;
  }
}

module.exports = ResultsService;
