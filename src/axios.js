import axios from "axios"

/////////////
// env change
/////////////

if (process.env.NODE_ENV === 'development') {
  // axios.defaults.baseURL = server ip;
  axios.defaults.baseURL = 'http://localhost:8000';
}
else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = 'http://localhost:8000';
}
else if (process.env.NODE_ENV === 'production') {
  // axios.defaults.baseURL = server ip;
  axios.defaults.baseURL = 'http://localhost:8000';
}

const base = axios.defaults.baseURL

///////////////
// interceptors
///////////////


const service = axios.create({
  timeout: 10000
})

service.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

service.interceptors.response.use(
  response => {
    let res = {};
    res.status = response.status
    res.data = response.data
    return res
  },
  error => {
    if (error.response && error.response.status === 500) {
      alert('Server Error!')
    }
    return Promise.reject(error.response)
  }
)

//////////////////
// export function
//////////////////

const get = (url, data = {}) => {
  return service({
    url: base + url,
    method: 'get',
    headers: {},
    data: data,
  })
}

const post = (url, data = {}) => {
  return service({
    url: base + url,
    method: 'post',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: data
  })
}

export const Axios = {
  service,
  get,
  post,
}