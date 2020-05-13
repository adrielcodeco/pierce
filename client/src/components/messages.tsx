import React from 'react'
import short from 'short-uuid'
import * as MessagesPubSub from 'src/events/messages'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import styles from './messages.jss'

export const Messages = ({ showOn }: any) => {
  const [messages, setMessages] = React.useState(
    MessagesPubSub.getMessages(showOn)
  )
  React.useEffect(() => {
    const changed = (messages: string[]) => {
      setMessages(messages)
    }
    const messagesUnsubscribe = MessagesPubSub.onAdded(showOn, changed)
    return () => {
      messages.forEach((msg: string) => {
        MessagesPubSub.remove(showOn, msg)
      })
      messagesUnsubscribe()
    }
  })
  const classes = styles()
  return (
    <>
      {messages.map((msg: string) => {
        MessagesPubSub.remove(showOn, msg)
        return (
          <span key={short.generate()} className={classes.errorMessage}>
            {msg}
            <FontAwesomeIcon
              icon={faTimes}
              className={classes.close}
              onClick={() => setMessages([])}
            />
          </span>
        )
      })}
    </>
  )
}
