
const ROLES = require('../../utils/rolesENUM');

class UsersHandler {
  constructor(jobsService, usersService) {
    this._jobsService = jobsService;
    this._usersService = usersService

    this.postJobHandler = this.postJobHandler.bind(this);
    this.getJobsHandler = this.getJobsHandler.bind(this);
    this.getJobHandler = this.getJobHandler.bind(this);
  }

  async getJobsHandler(request, h) {
    const jobs = await this._jobsService.getJobs();

    const response = h.response({
      status: 'success',
      data: await Promise.all(jobs.map(async (job) => ({
        ...job,
        owner: await this._usersService.getOwnerNameById({ id: job.owner }),
      }))),
    });
    response.code(200);
    return response;
  }

  async getJobHandler(request, h) {
    const { id } = request.params;

    const detailJob = await this._jobsService.getJobById({ id });
    const images = await this._jobsService.getImagesFromJobId({ id })

    const mappedImages = images.map((image) => ({
      url_images: `http://${request.headers.host}/${image.url_images}`
    }));

    const mappedJob = detailJob.map((job) => ({
      ...job,
      images: mappedImages,
    }));

    const response = h.response({
      status: 'success',
      data: mappedJob[0]
    });
    response.code(200);
    return response;
  }

  async postJobHandler(request, h) {
    const { id } = request.auth.credentials;

    const {
      title, description, tag, deadline, reward, image,
    } = request.payload;

    await this._usersService.verifyRoleById({ id, role: ROLES.UMKM });

    const jobCreated = {
      title,
      description,
      tag,
      deadline,
      reward,
      image,
      draft: false,
    };
    // console.log(jobCreated);

    const jobId = await this._jobsService.addJob(id, jobCreated);
    const response = h.response({
      status: 'success',
      data: {
        jobId,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UsersHandler;
