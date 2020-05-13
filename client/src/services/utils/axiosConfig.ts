import axios, { AxiosRequestConfig, AxiosPromise } from 'axios'
import { merge } from 'lodash'
import { redirectToLogin } from '../redirect'

export const axiosConfig = () => ({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    access_token: localStorage.getItem('authAToken')
  },
  validateStatus: () => true
})

export async function refreshToken (baseUrl: string) {
  const result = await axios({
    method: 'POST',
    url: '/auth/token',
    baseURL: baseUrl,
    data: {
      grant_type: 'refresh_token',
      refresh_token: localStorage.getItem('authARefreshToken')
    },
    headers: {
      Authorization: 'Basic OmJSDHuqenwnHhfsadhHfj='
    }
  })
  const token = result?.data?.access_token
  if (token) {
    localStorage.setItem('authAToken', token)
    localStorage.setItem('authARefreshToken', result?.data?.refresh_token)
  } else {
    throw new Error('Invalid refresh_token')
  }
}

async function Exec (options: AxiosRequestConfig, run: () => AxiosPromise<any>) {
  const res = await run().catch((err) => {
    console.log(err)
    if (err.status === 401) {
      return refreshToken(options.baseURL!)
        .then(run)
        .catch((err) => {
          console.log(err)
          redirectToLogin()
          return { data: undefined }
        })
    }
    return { data: undefined }
  })
  return res.data
}

export async function Get (options: AxiosRequestConfig) {
  const run = () => axios(merge({ method: 'GET' }, axiosConfig(), options))
  return Exec(options, run)
}

export async function Post (options: AxiosRequestConfig) {
  const run = () => axios(merge({ method: 'POST' }, axiosConfig(), options))
  return Exec(options, run)
}

export async function Put (options: AxiosRequestConfig) {
  const run = () => axios(merge({ method: 'PUT' }, axiosConfig(), options))
  return Exec(options, run)
}

export async function Delete (options: AxiosRequestConfig) {
  const run = () => axios(merge({ method: 'DELETE' }, axiosConfig(), options))
  return Exec(options, run)
}
