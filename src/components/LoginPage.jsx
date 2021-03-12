import { Button, Container } from 'react-materialize'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import { signIn } from '../redux/reducers/authReducer'

const LoginPage = (props) => {
  const history = useHistory();

  const signUpHandler = () => {
    props.signIn().then(() => history.push('/main'))
  }

  return (
    <>
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
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.authPage.loading,
    isUserLogin: state.authPage.isUserLogin
  }
}

const mapDispatchToProps = {
  signIn
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)