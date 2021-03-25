import React from 'react'
import styles from './MessagesArea.module.css'

type TProps = {
  own: boolean,
  text: string,
  profileIcon: string
}

export const Message: React.FC<TProps> = (props): React.ReactElement => {
  return (
    <>
      <div className={styles.messageContainer}>
        <div className={`${styles.messageWrapper} ${props.own ? styles.ownMessage : styles.incomingMessage}`}>
          <div className={`${styles.message} ${props.own ? styles.ownMessage : styles.incomingMessage}`}>
            <p>{props.text}</p>
          </div>
          {props.own && <div className={styles.profileIcon}>
            <img className={styles.profileIconImg} src={props.profileIcon} alt="" />
          </div>}
        </div>
      </div>
    </>
  )
}
