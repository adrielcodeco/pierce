import { Post } from './utils/axiosConfig'
import { authContext } from 'src/data/authContext'
import * as MessagesPubSub from 'src/events/messages'

export async function login (email: string, pwd: string) {
  const result: any = await Post({
    url: '/auth/token',
    data: {
      grant_type: 'password',
      username: email,
      password: pwd
    },
    headers: {
      Authorization: 'Basic OmJSDHuqenwnHhfsadhHfj='
    }
  })
  const token = result?.data?.access_token
  if (token) {
    console.log('token:', token)
    localStorage.setItem('authAToken', token)
    localStorage.setItem('authARefreshToken', result?.data?.refresh_token)
    authContext.authirized = true
  } else {
    MessagesPubSub.add('LOGIN', 'Invalid email or password')
    throw new Error('Invalid login')
  }
}
