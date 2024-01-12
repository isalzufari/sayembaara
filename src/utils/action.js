import api from './api';

const loginAction = async ({ email, password }) => {
  const token = await api.login({ email, password });
  const { accessToken, refreshToken } = token;

  api.putAccessToken(accessToken);
  api.putRefreshToken(refreshToken);

  const authUser = await api.getOwnProfile();
  const { data } = authUser;
  return data;
}

const logoutAction = () => {
  api.deleteToken();
}

export {
  loginAction,
  logoutAction,
}