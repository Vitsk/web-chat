import { signOut } from "../../../redux/reducers/authReducer"
import { fetchMessages, sendMessage, TMessages } from "../../../redux/reducers/mainReducer"
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { SideNavMenu } from "../SideNavMenu"
import { TRootReducer } from "../../../redux/store"
import { Container } from "react-materialize"
import { InputField } from "./InputField"
import { MessagesArea } from "./Messages/MessagesArea"
import { useEffect } from "react"
// import styles from './Main.module.css'

type PropsType = {
  user: {
    email: string;
    displayName: string;
    photoURL: string;
    uid: string;
  },
  messages: TMessages[],
  signOut: () => Promise<void>,
  fetchMessages: (uid: string) => void
  sendMessage: (id: number, uid: string, photoURL: string, text: string) => void
}

// Component
const Main: React.FC<PropsType> = (props): React.ReactElement => {
  const history = useHistory();

  useEffect(() => {
    props.fetchMessages(props.user.uid);
    // eslint-disable-next-line
  }, [])

  // Handlers
  const signOutHandler = (): void => {
    props.signOut().then(() => history.push('/'))
  }

  const sendMessageHandler = (text: string): void => {
    props.sendMessage(Date.now(), props.user.uid, props.user.photoURL, text)
  }

  return (
    <>
      <SideNavMenu
        user={props.user}
        signOutHandler={signOutHandler}
      />

      <Container>
        <MessagesArea messages={props.messages} />
        <InputField sendMessageHandler={sendMessageHandler} />
      </Container>
    </>
  )
}

const mapStateToProps = (state: TRootReducer) => {
  return {
    user: state.authPage.user,
    messages: state.mainPage.messages
  }
}

const mapDispatchToProps = {
  signOut,
  fetchMessages,
  sendMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)