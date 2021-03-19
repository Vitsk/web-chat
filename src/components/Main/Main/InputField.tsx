import React from 'react'
import { Button, Icon, TextInput } from 'react-materialize'

export const InputField: React.FC = (): React.ReactElement => {
  return (
    <div>
      <TextInput
        id="TextInput-4"
        label="First Name"
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
    </div>
  )
}
