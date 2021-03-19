import React from 'react'
import styles from './MessagesArea.module.css'

type TProps = {
  own: boolean,
  text: string
}

export const Message: React.FC<TProps> = (props): React.ReactElement => {
  return (
    <>
      <div className={`${props.own ? styles.ownMessage : styles.message}`}>
        <p>{ props.text }</p>
      </div>
    </>
  )
}
