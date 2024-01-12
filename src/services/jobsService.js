const JobsRepository = require('../repository/jobsRepository');
const Base64ToImg = require('../utils/Base64ToImg');

class JobsService {
  constructor() {
    this.jobsRepository = new JobsRepository();
  }

  // return an id (string)
  async addJob(userId, {
    title, description, tag, deadline, reward, image, draft,
  }) {

    // mengubah base64 menjadi image dan mengembalikan path images
    for (let i = 0; i < image.length; i++) {
      const filePath = await Base64ToImg(image[i]);
      image[i] = `images/${filePath}`;
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

  async getJobs() {
    const result = await this.jobsRepository.getJobs();
    return result;
  }

  async getJobById({ id }) {
    const result = await this.jobsRepository.getJobById(id);
    return result;
  }

  async getImagesFromJobId({ id }) {
    const result = await this.jobsRepository.getImagesFromJobId(id);
    return result;
  }

  async updateIsDraft({ userId, jobId }) {
    const { isDraft } = await this.jobsRepository.getIsDraftById(jobId);
    const updateIsDraft = isDraft === 0 ? 1 : 0;
    await this.jobsRepository.updateIsDraft({ updateIsDraft, userId, jobId });
  }

  async getJobsByUmkmById({ userId }) {
    const result = await this.jobsRepository.getJobsByUmkmById(userId);
    return result;
  }
}

module.exports = JobsService;
