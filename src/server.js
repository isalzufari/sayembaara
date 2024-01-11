// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const Hapi = require('@hapi/hapi');
const JWT = require('@hapi/jwt');

const ClientError = require('./exceptions/ClientError');

const users = require('./api/users');
const authentications = require('./api/authentications');
const jobs = require('./api/jobs');

async function init() {
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
        category: artifacts.decoded.payload.category,
      },
    }),
  });

  await server.register([
    {
      plugin: users,
    },
    {
      plugin: authentications,
    },
    {
      plugin: jobs,
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

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
}

init();
