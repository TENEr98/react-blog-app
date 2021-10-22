import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://conduit-api-realworld.herokuapp.com/'
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
  (error) => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  function (error) {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem('rt')

      return instance
        .post('/v1/auth/renew', {
          'refreshToken': refreshToken,
          'username': 'test'
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem('t', res.data.body.token)
            originalRequest.headers['Authorization'] =
              'Bearer ' + res.data.body.token
            return axios(originalRequest)
          }
        })
        .catch((err) => {
          localStorage.removeItem('t')
          localStorage.removeItem('rt')
          window.location.assign('/')
        })
    }
    return Promise.reject(error)
  }
)
