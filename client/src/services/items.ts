import { Get, Post, Put, Delete } from './utils/axiosConfig'
import * as MessagesPubSub from 'src/events/messages'

type Item = {
  id: string;
  name: string;
}

export async function listItems () {
  const result: any = await Get({
    url: '/items'
  })
  return result?.data
}

export async function addItem ({ name }: Partial<Item>) {
  const result: any = await Post({
    url: '/items',
    data: { name }
  })
  if (result?.data) {
    return result?.data
  } else {
    MessagesPubSub.add('ADDNEWITEM', result.error)
    throw new Error('Invalid item')
  }
}

export async function alterItem (id: string, { name }: Partial<Item>) {
  const result: any = await Put({
    url: `/items/${id}`,
    data: { name }
  })
  return result?.data
}

export async function removeItem (id: string) {
  const result: any = await Delete({
    url: `/items/${id}`
  })
  return result?.data
}
