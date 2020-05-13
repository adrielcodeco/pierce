import axios from 'axios'

export async function addItem (
  port: number,
  token: string,
  name: string,
  groups: string[]
) {
  const result = await axios.post(
    `http://localhost:${port}/items`,
    {
      name,
      groups
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'access-token': token
      },
      validateStatus: () => true
    }
  )
  return result.data.data
}
