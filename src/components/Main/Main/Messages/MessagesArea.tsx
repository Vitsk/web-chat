import React from 'react';
import { Message } from './Message';
import styles from './MessagesArea.module.css'

export const MessagesArea: React.FC = (): React.ReactElement => {
  return (
    <div className={styles.messageContainer}>
      <Message own={true} />
      <Message own={false} />
      <Message own={true} />
    </div>
  )
}
