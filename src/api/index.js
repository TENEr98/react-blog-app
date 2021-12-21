import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('t')
    config.headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }

    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

export const AuthAPI = {
  getUser() {
    return instance
      .get('/user')
      .then((response) => response)
      .catch((err) => err.response)
  },
  signUp(user) {
    return instance
      .post('/users', { user })
      .then((response) => response)
      .catch((err) => err.response)
  },
  signIn(user) {
    return instance
      .post('/users/login', { user })
      .then((response) => response)
      .catch((err) => err.response)
  },
  editUser(user) {
    return instance
      .put('/user', { user })
      .then((response) => response)
      .catch((err) => err.response)
  }
}
