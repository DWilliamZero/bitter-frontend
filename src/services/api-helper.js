const axios = require('axios');

// //develop api
// const api = axios.create({
//   baseURL: 'http://localhost:3000'
// })

//production api
const api = axios.create({
  baseURL: 'https://bitter-backend-2020.herokuapp.com'
})

//=================================
//===========  Auth  ==============
//=================================

export const login = async (body) => {
  const res = await api.post('/auth/login', { auth: body })  //based on strong params on backend.
  localStorage.setItem('authToken', res.data.token);
  api.defaults.headers.common.authorization = `Bearer ${res.data.token}`
  return res.data.user
}

export const createNewUser = async (body) => {
  const res = await api.post('/users', { user: body })  //based on strong params from backend
  localStorage.setItem('authToken', res.data.token);
  api.defaults.headers.common.authorization = `Bearer ${res.data.token}`
  return res.data.user
}

export const verifyUser = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const res = await api.get('/auth/verify');
    return res.data
  }
  return false
}

export const logOut = () => {
  localStorage.setItem('authToken', '');
}

//================================
//=========  Users  ==============
//================================

export const getUserById = async (id) => {
  const res = await api.get(`/users/${id}`)
  return res.data;
}

export const updateUserById = async (id, data) => {
  const res = await api.put(`/users/${id}`, { user: data })  //check strong params for user_controller
  return res.data;
}

export const deleteUserById = async (id) => {
  const res = await api.delete(`/users/${id}`)
  return res.data;
}

//=================================
//===========  Posts  =============
//=================================

export const getAllPosts = async () => {
  const res = await api.get(`/posts`)
  return res.data;
}

export const getAllPostsByUserId = async (userId) => {
  const res = await api.get(`/users/${userId}/posts`)
  return res.data;
}

export const getUserPostByPostId = async (userId, postId) => {
  const res = await api.get(`/users/${userId}/posts/${postId}`)
  return res.data;
}

export const createNewUserPost = async (userId, data) => {
  const res = await api.post(`/users/${userId}/posts`, { post: data })  //check strong params for user_controller
  return res.data;
}

export const updateUsersPost = async (userId, postId, data) => {
  const res = await api.put(`/users/${userId}/posts/${postId}`, { post: data })  //check strong params for user_controller
  return res.data;
}

export const deleteUsersPost = async (userId, postId) => {
  const res = await api.delete(`/users/${userId}/posts/${postId}`)
  return res.data;
}

//=================================
//===========  Hates  =============
//=================================

export const getAllHates = async () => {       //returns all hates
  const res = await api.get(`/hates`)
  return res.data;
}

export const getHatesByUsersPostId = async (userId, postId) => {       //returns hate_count by postId
  const res = await api.get(`/users/${userId}/posts/${postId}/hates`)
  return res.data;
}

export const newHate = async (userId, postId) => {
  const res = await api.post(`/users/${userId}/posts/${postId}/hates`)
  return res.data;
}

export const removeHate = async (userId, postId) => {
  const res = await api.delete(`/users/${userId}/posts/${postId}/hates`)
  return res.data;
}

//=================================
//==========  Follows  ============
//=================================

export const getAllFollows = async () => {
  const res = await api.get(`/follows`)
  return res.data;
}

export const getFollowers = async (userId) => {
  const res = await api.get(`/users/${userId}/followers`)
  return res.data;
}

export const getFollowees = async (userId) => {
  const res = await api.get(`/users/${userId}/following`)
  return res.data;
}

export const newFollow = async (data) => {
  const res = await api.post(`/follows`, { follow: data })  //check strong params for user_controller
  return res.data;
}

export const unFollow = async (data) => {
  const res = await api.delete("/unfollow", { data })  // strange error requires 'follow' to be placed data
  return res.data;
}