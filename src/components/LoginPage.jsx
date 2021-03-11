import { Button, Container } from 'react-materialize'
import { auth, provider } from '../firebase/firebase'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import { switchLoading } from '../redux/reducers/loginReducer'

const LoginPage = (props) => {
  const history = useHistory();

  const signUpHandler = () => {
    auth.signInWithPopup(provider).then((result) => {
      history.push('/main');
    })
  }

  return (
    <div className="App">
      <h1 className="main-title">WebChat</h1>
      <Container style={{ textAlign: 'center' }}>
        <Button
          large
          node="a"
          style={{
            marginRight: '5px',
          }}
          waves="light"
          onClick={signUpHandler}
        >
          Sign in with Google
        </Button>
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.loginPage.loading
  }
}

const mapDispatchToProps = {
  switchLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)