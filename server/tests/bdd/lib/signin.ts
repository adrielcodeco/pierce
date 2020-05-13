import axios from 'axios'

export async function signin (port: number, email: string) {
  const result = await axios.post(
    `http://localhost:${port}/auth/signin`,
    {
      email,
      password: '123456'
    },
    {
      headers: {
        'Content-Type': 'application/json'
      },
      validateStatus: () => true
    }
  )
  return result.data.data.token
}
