import React, { useState } from 'react'
import { Button, Icon, TextInput } from 'react-materialize'

type TProps = {
  sendMessageHandler: (text: string) => void
}

export const InputField: React.FC<TProps> = (props): React.ReactElement => {
  const [inputText, setInputText] = useState<string>('');

  const submitSendHandler = (e: any) => {
    e.preventDefault();
    props.sendMessageHandler(inputText)
  }

  return (
    <form onSubmit={submitSendHandler}>
      <TextInput
        id="TextInput-4"
        label="First Name"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <Button
        className="blue"
        floating
        icon={<Icon>{'>'}</Icon>}
        large
        node="button"
        waves="light"
        style={{ float: 'right' }}
      />
    </form>
  )
}
