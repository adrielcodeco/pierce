import PubSub from 'pubsub-js'

const addedEvent = 'ADDED'
const removedEvent = 'REMOVED'
const messagesStoreKey = 'MESSAGES'

export const onAdded = (showOn: string, added: any) => {
  const event = PubSub.subscribe(showOn, (_: any, data: any) => {
    if (data === addedEvent) {
      const messages = getMessages(showOn)
      added(messages)
    }
  })
  return () => {
    PubSub.unsubscribe(event)
  }
}

export const add = (showOn: string, message: any) => {
  const messages = getMessages(showOn)
  messages.push(String(message))
  window.localStorage.setItem(messagesStoreKey + showOn, JSON.stringify(messages))
  PubSub.publish(showOn, addedEvent)
}

export const remove = (showOn: string, message: any) => {
  const messages = getMessages(showOn)
  const _messages = messages.filter((m) => m !== message)
  window.localStorage.setItem(messagesStoreKey + showOn, JSON.stringify(_messages))
  PubSub.publish(showOn, removedEvent)
}

export const getMessages = (showOn: string) => {
  const messages: string[] =
    JSON.parse(
      window.localStorage.getItem(messagesStoreKey + showOn) || '[]'
    ) || []
  return messages
}
