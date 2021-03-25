import React, { FormEvent, useState } from 'react'
import { Button, Container, Icon, TextInput } from 'react-materialize'

type TProps = {
  sendMessageHandler: (text: string) => void
}

export const InputField: React.FC<TProps> = (props): React.ReactElement => {
  const [inputText, setInputText] = useState<string>('');

  const submitSendHandler = (e: FormEvent) => {
    e.preventDefault();
    if (inputText) {
      props.sendMessageHandler(inputText);
    }
    setInputText('');
  }

  return (
    <form onSubmit={submitSendHandler}>
      <Container>
        <TextInput
          id="TextInput-4"
          value={inputText}
          placeholder='Enter a text'
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
      </Container>
    </form>
  )
}
