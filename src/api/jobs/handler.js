const ROLES = require('../../utils/rolesENUM');

class UsersHandler {
  constructor(jobsService, usersService, commentsService, resultsService) {
    this._jobsService = jobsService;
    this._usersService = usersService;
    this._commentsService = commentsService;
    this._resultsService = resultsService;

    this.postJobHandler = this.postJobHandler.bind(this);
    this.getJobsHandler = this.getJobsHandler.bind(this);
    this.getJobHandler = this.getJobHandler.bind(this);
    this.putDraftHandler = this.putDraftHandler.bind(this);
    this.getJobsByUmkmHandler = this.getJobsByUmkmHandler.bind(this);
    this.postCommentJobHandler = this.postCommentJobHandler.bind(this);
  }

  async getJobsHandler(request, h) {
    const jobs = await this._jobsService.getJobs();

    const response = h.response({
      status: 'success',
      data: await Promise.all(jobs.map(async (job) => ({
        ...job,
        url_images: `http://${request.headers.host}/${job.url_images}`,
        owner: await this._usersService.getOwnerNameById({ id: job.owner }),
      }))),
    });
    response.code(200);
    return response;
  }

  async getJobHandler(request, h) {
    const { id } = request.params;

    const detailJob = await this._jobsService.getJobById({ id });
    const images = await this._jobsService.getImagesFromJobId({ id });
    const comments = await this._commentsService.getJobCommets(id);
    const results = await this._resultsService.getJobResults(id);
    console.log(comments);

    const mappedImages = images.map((image) => ({
      url_images: `http://${request.headers.host}/${image.url_images}`
    }));

    const mappedResults = results.map((result) => ({
      id: result.id,
      owner: result.owner,
      file: `http://${request.headers.host}/${result.file}`,
      title: result.title
    }));

    const mappedJob = detailJob.map((job) => ({
      ...job,
      images: mappedImages,
      comments: comments,
      results: mappedResults
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

  async putDraftHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { id: jobId } = request.params;

    await this._jobsService.updateIsDraft({ userId, jobId });

    return h.response({
      status: 'success',
      message: 'Job berhasil diubah',
    }).code(200);
  }

  async getJobsByUmkmHandler(request, h) {
    const { id: userId } = request.auth.credentials;

    const jobs = await this._jobsService.getJobsByUmkmById({ userId });

    const data = jobs.map((job) => ({
      ...job,
      url_images: `http://${request.headers.host}/${job.url_images}`
    }));

    // console.log(jobs);

    const response = h.response({
      status: 'success',
      data
    });
    response.code(200);
    return response;
  }

  async postCommentJobHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { id: jobId } = request.params;
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

module.exports = UsersHandler;
