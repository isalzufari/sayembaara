const JobsRepository = require('../repository/jobsRepository');
const extractBase64Info = require('../utils/base64ToFile');

class JobsService {
  constructor() {
    this.jobsRepository = new JobsRepository();
  }

  // return an id (string)
  async addJob(userId, {
    title, description, tag, deadline, reward, image, draft,
  }) {
    console.log(image);
    for (let i = 0; i < image.length; i++) {
      const filePath = extractBase64Info(image[i]);
      image[i] = filePath;
    }

    const jobCreated = {
      title,
      description,
      tag,
      deadline,
      reward,
      image,
      draft,
    };

    console.log(jobCreated);

    const result = this.jobsRepository.addJob(userId, jobCreated);

    return result;
  }
}

module.exports = JobsService;
