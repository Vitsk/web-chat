import React from 'react';
import { TMessages } from '../../../../redux/reducers/mainReducer';
import { Message } from './Message';
import styles from './MessagesArea.module.css'

type TProps = {
  messages: TMessages[],
  profileIcon: string
}

export const MessagesArea: React.FC<TProps> = (props): React.ReactElement => {
  return (
    <div className={styles.messagesArea}>
      {
        props.messages.map((message, idx) => (
          <Message 
            key={idx} 
            own={message.own} 
            text={message.text} 
            profileIcon={props.profileIcon}
          />
        ))
      }
    </div>
  )
}
