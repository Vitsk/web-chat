import React from 'react'
import styles from './MessagesArea.module.css'

type TProps = {
  own: boolean
}

export const Message: React.FC<TProps> = ({ own }): React.ReactElement => {
  return (
    <>
      <div className={`${own ? styles.ownMessage : styles.message}`}>
        <p>Hello</p>
      </div>
    </>
  )
}
