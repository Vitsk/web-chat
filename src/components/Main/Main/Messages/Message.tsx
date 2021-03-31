import React from 'react'
import { ContextMenuTrigger } from 'react-contextmenu'

import styles from './MessagesArea.module.css'

type TProps = {
  own: boolean,
  text: string,
  profileIcon: string,
  idx: number
}

export const Message: React.FC<TProps> = (props): React.ReactElement => {
  return (
    <>

      <div
        className={`${styles.messageWrapper} ${props.own ? styles.ownMessage : styles.incomingMessage}`}
      >
        <ContextMenuTrigger
          id="context-menu"
          collect={() => ({ idItem: props.idx })}
        >
          <div className={`${styles.message} ${props.own ? styles.ownMessage : styles.incomingMessage}`}>
            <p>{props.text}</p>
          </div>
        </ContextMenuTrigger>
        <div className={styles.profileIcon}>
          <img className={styles.profileIconImg} src={props.profileIcon} alt="" />
        </div>
      </div>
    </>
  )
}
