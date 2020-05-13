import random from 'random'
import axios from 'axios'

export async function signup (port: number) {
  const d1 = random.int(0, 9)
  const d2 = random.int(0, 9)
  const d3 = random.int(0, 9)
  const d4 = random.int(0, 9)
  const d5 = random.int(0, 9)
  const email = `test+${d1}${d2}${d3}${d4}${d5}@test.com`
  const result = await axios.post(
    `http://localhost:${port}/auth/signup`,
    {
      email,
      firstName: 'test',
      password: '123456'
    },
    {
      headers: {
        'Content-Type': 'application/json'
      },
      validateStatus: () => true
    }
  )
  if (!result?.data?.data?.success) {
    return
  }
  return {
    email,
    password: '123456'
  }
}
