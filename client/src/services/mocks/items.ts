import MockAdapter from './mockAdapter'
import { AxiosRequestConfig } from 'axios'
import short from 'short-uuid'

MockAdapter.onGet('/items')
  .reply(() => {
    let items: any[] = JSON.parse(localStorage.getItem('mock_items') || '[]')
    return [
      200,
      {
        data: items
      }
    ]
  })
  .onPost('/items', {
    asymmetricMatch: (actual: any) => {
      let items: any[] = JSON.parse(localStorage.getItem('mock_items') || '[]')
      return items.find((i) => i.name === actual.name)
    }
  })
  .reply((config: AxiosRequestConfig) => {
    return [
      400,
      {
        error: 'The item name already exists'
      }
    ]
  })
  .onPost('/items')
  .reply((config: AxiosRequestConfig) => {
    const item = JSON.parse(config.data)
    let items: any[] = JSON.parse(localStorage.getItem('mock_items') || '[]')
    item.id = short.generate()
    items.push(item)
    localStorage.setItem('mock_items', JSON.stringify(items))
    return [
      201,
      {
        data: item
      }
    ]
  })
  .onPut(/^\/items\//, {
    asymmetricMatch: (actual: any) => {
      let items: any[] = JSON.parse(localStorage.getItem('mock_items') || '[]')
      return items.find((i) => i.name === actual.name)
    }
  })
  .reply((config: AxiosRequestConfig) => {
    return [
      400,
      {
        error: 'The item name already exists'
      }
    ]
  })
  .onPut(/^\/items\//)
  .reply((config: AxiosRequestConfig) => {
    const data = JSON.parse(config.data)
    let items: any[] = JSON.parse(localStorage.getItem('mock_items') || '[]')
    const itemId = config.url?.replace('/items/', '')
    const item = items.find((i) => i.id === itemId)
    item.name = data.name
    localStorage.setItem('mock_items', JSON.stringify(items))
    return [
      200,
      {
        data: item
      }
    ]
  })
  .onDelete(/^\/items\//)
  .reply((config: AxiosRequestConfig) => {
    const itemId = config.url?.replace('/items/', '')
    let items: any[] = JSON.parse(localStorage.getItem('mock_items') || '[]')
    items = items.filter((i: any) => i.id !== itemId)
    localStorage.setItem('mock_items', JSON.stringify(items))
    return [200]
  })
