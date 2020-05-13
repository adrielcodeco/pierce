import PubSub from 'pubsub-js'

export const send = (key: string, data: any) => {
  PubSub.publish(key, data)
}

export const on = (
  key: string,
  callback: (data: any) => void,
  multipleTimes: boolean
) => {
  const event = PubSub.subscribe(key, (_: any, data: any) => {
    callback(data)
    if (!multipleTimes) {
      PubSub.unsubscribe(event)
    }
  })
  return () => {
    PubSub.unsubscribe(event)
  }
}
