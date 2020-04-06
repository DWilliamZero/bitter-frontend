const axios = require('axios');

//develop api
const api = axios.create({
  baseURL: 'http://localhost:3000'
})

//production api
const api = axios.create({
  baseURL: 'http://localhost:3000'
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

export const signUp = async (body) => {
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
  api.defaults.headers.common.authorization = null
}

//================================
//=========  xxxxx  ==============
//================================

export const allFoods = async () => {
  const res = await api.get('/foods')
  return res.data;
}

export const oneFoods = async (id) => {
  const res = await api.get(`/foods/${id}`)
  return res.data;
}

export const createFood = async (data) => {
  const res = await api.post('/foods', { foods: data })
  return res.data;
}

export const updateFood = async (data, id) => {
  const res = await api.put(`/foods/${id}`, { foods: data })
  return res.data;
}

export const deleteFood = async (id) => {
  const res = await api.delete(`/foods/${id}`)
  return res.data;
}

//=================================
//=========  xxxxxxx  =============
//=================================

export const allFlavors = async () => {
  const res = await api.get('/flavors')
  return res.data;
}

export const oneFlavor = async (id) => {
  const res = await api.get(`/flavors/${id}`)
  return res.data;
}

export const addFlavor = async (flavorId, foodId) => {
  const res = await api.get(`/flavors/${flavorId}/foods/${foodId}`)
  return res.data;
}