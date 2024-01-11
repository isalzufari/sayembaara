// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const Hapi = require('@hapi/hapi');
const JWT = require('@hapi/jwt');

// Static Files
const Path = require('path');
const Inert = require('@hapi/inert');

const ClientError = require('./exceptions/ClientError');

const users = require('./api/users');
const UsersService = require('./services/usersService');

const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/authenticationsService');
const TokenManager = require('./tokenize/tokenManager');

const jobs = require('./api/jobs');
const JobsService = require('./services/jobsService');

async function init() {
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const jobsService = new JobsService();

  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Inert,
    },
    {
      plugin: JWT,
    },
  ]);

  server.auth.strategy('sayembara_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  server.route([
    {
      method: 'GET',
      path: '/',
      handler: () => ({
        status: 'success',
      }),
    },
    {
      method: 'GET',
      path: '/image/{param*}',
      handler: {
        directory: {
          path: Path.resolve('./public/image'),
        },
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }

      if (!response.isServer) {
        return h.continue;
      }

      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }

    return h.continue;
  });

  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
      },
      routes: {
        prefix: '/api/v1/users',
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
      },
      routes: {
        prefix: '/api/v1/authentications',
      },
    },
    {
      plugin: jobs,
      options: {
        jobsService,
        usersService
      },
      routes: {
        prefix: '/api/v1/jobs',
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
}

init();
