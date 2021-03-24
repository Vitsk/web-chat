import React from 'react'
import styles from './MessagesArea.module.css'

type TProps = {
  own: boolean,
  text: string
}

export const Message: React.FC<TProps> = (props): React.ReactElement => {
  return (
    <>
      <div className={`${styles.message} ${props.own ? styles.ownMessage : styles.incomingMessage}`}>
        <p>{ props.text }</p>
      </div>
    </>
  )
}
