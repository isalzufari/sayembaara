const api = (() => {
  const BASE_URL = 'http://34.172.108.43/api/v1';

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  function putRefreshToken(token) {
    return localStorage.setItem('refreshToken', token);
  }

  function getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  function deleteToken() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  async function register({ name, email, password, category }) {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        category
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return { status };
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/authentications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function refreshToken() {
    const response = await fetch(`${BASE_URL}/authentications`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: `${getRefreshToken()}`,
      }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
    putAccessToken(data.accessToken);
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users`);
    const responseJson = await response.json();

    const { status, message, error, data } = responseJson;

    return { status, error, message, data };
    // if (status !== 'success') {
    //   throw new Error(message);
    // }

    // const { data } = responseJson;

    // return data;
  }

  async function getJobs() {
    const response = await _fetchWithAuth(`${BASE_URL}/jobs`);

    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getJobById({ id }) {
    const response = await fetch(`${BASE_URL}/jobs/${id}`);

    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getJobsByUmkm() {
    const response = await _fetchWithAuth(`${BASE_URL}/jobs/umkm`);

    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function addJobs({ title, description, deadline, tag, reward, image }) {
    const response = await _fetchWithAuth(`${BASE_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        deadline,
        tag,
        reward,
        image,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return { status };
  }

  async function addCommentJob({ jobId, comment }) {
    const response = await _fetchWithAuth(`${BASE_URL}/jobs/${jobId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: comment,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return { status };
  }

  async function updateDraft({ jobsId }) {
    const response = await _fetchWithAuth(`${BASE_URL}/jobs/${jobsId}/draft`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return { status };
  }

  async function getResultJobById({ jobId, resultId }) {
    const response = await fetch(`${BASE_URL}/jobs/${jobId}/results/${resultId}`);

    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function addResultJob({ jobId, title, description, image }) {
    const response = await _fetchWithAuth(`${BASE_URL}/jobs/${jobId}/results`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        file: image
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return { status };
  }

  async function addCommentResultJob({ jobId, resultId, comment }) {
    const response = await _fetchWithAuth(`${BASE_URL}/jobs/${jobId}/results/${resultId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: comment,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return { status };
  }

  async function updateChoosen({ jobId, resultId }) {
    const response = await _fetchWithAuth(`${BASE_URL}/jobs/${jobId}/results/${resultId}/choosen`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return { status };
  }

  return {
    putAccessToken,
    getAccessToken,
    putRefreshToken,
    getRefreshToken,
    refreshToken,
    deleteToken,
    register,
    login,
    getOwnProfile,
    getJobs,
    getJobById,
    addJobs,
    addCommentJob,
    updateDraft,
    getJobsByUmkm,
    getResultJobById,
    addResultJob,
    addCommentResultJob,
    updateChoosen
  }
})();

export default api;
