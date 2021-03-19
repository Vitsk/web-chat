import { signOut } from "../../../redux/reducers/authReducer"
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { SideNavMenu } from "../SideNavMenu"
import { TRootReducer } from "../../../redux/store"
import { Container } from "react-materialize"
import { InputField } from "./InputField"
import { MessagesArea } from "./Messages/MessagesArea"
// import styles from './Main.module.css'

type PropsType = {
  user: {
    email: string;
    displayName: string;
    photoURL: string;
    uid: string;
  },
  signOut: () => Promise<void>
}

const Main: React.FC<PropsType> = (props): React.ReactElement => {
  const history = useHistory();

  const signOutHandler = (): void => {
    props.signOut().then(() => history.push('/'))
  }

  return (
    <>
      <SideNavMenu
        user={props.user}
        signOutHandler={signOutHandler}
      />

      <Container>
        <MessagesArea />
        <InputField />
      </Container>
    </>
  )
}

const mapStateToProps = (state: TRootReducer) => {
  return {
    user: state.authPage.user
  }
}

export default connect(mapStateToProps, { signOut })(Main)