const API_BASE_URL = 'https://forum-api.dicoding.dev/v1';
const ACCESS_TOKEN_KEY = 'discussly-access-token';

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function putAccessToken(token) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

async function fetchWithAuth(url, options = {}) {
  const token = getAccessToken();
  const headers = {
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
}

async function parseResponse(response) {
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
}

async function register({ name, email, password }) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  return parseResponse(response);
}

async function login({ email, password }) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await parseResponse(response);

  return data.token;
}

async function getOwnProfile() {
  const response = await fetchWithAuth(`${API_BASE_URL}/users/me`);
  const data = await parseResponse(response);

  return data.user;
}

async function getAllUsers() {
  const response = await fetch(`${API_BASE_URL}/users`);
  const data = await parseResponse(response);

  return data.users;
}

async function getAllThreads() {
  const response = await fetch(`${API_BASE_URL}/threads`);
  const data = await parseResponse(response);

  return data.threads;
}

async function getThreadDetail(threadId) {
  const response = await fetch(`${API_BASE_URL}/threads/${threadId}`);
  const data = await parseResponse(response);

  return data.detailThread;
}

async function createThread({ title, body, category }) {
  const response = await fetchWithAuth(`${API_BASE_URL}/threads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body, category }),
  });
  const data = await parseResponse(response);

  return data.thread;
}

async function createComment({ threadId, content }) {
  const response = await fetchWithAuth(
    `${API_BASE_URL}/threads/${threadId}/comments`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    },
  );
  const data = await parseResponse(response);

  return data.comment;
}

async function voteThread({ threadId, voteType }) {
  const endpointMap = {
    1: 'up-vote',
    '-1': 'down-vote',
    0: 'neutral-vote',
  };
  const response = await fetchWithAuth(
    `${API_BASE_URL}/threads/${threadId}/${endpointMap[voteType]}`,
    { method: 'POST' },
  );
  const data = await parseResponse(response);

  return data.vote;
}

async function voteComment({
  threadId,
  commentId,
  voteType,
}) {
  const endpointMap = {
    1: 'up-vote',
    '-1': 'down-vote',
    0: 'neutral-vote',
  };
  const response = await fetchWithAuth(
    `${API_BASE_URL}/threads/${threadId}/comments/${commentId}/${endpointMap[voteType]}`,
    { method: 'POST' },
  );
  const data = await parseResponse(response);

  return data.vote;
}

async function getLeaderboards() {
  const response = await fetch(`${API_BASE_URL}/leaderboards`);
  const data = await parseResponse(response);

  return data.leaderboards;
}

const api = {
  getAccessToken,
  putAccessToken,
  removeAccessToken,
  register,
  login,
  getOwnProfile,
  getAllUsers,
  getAllThreads,
  getThreadDetail,
  createThread,
  createComment,
  voteThread,
  voteComment,
  getLeaderboards,
};

export default api;
