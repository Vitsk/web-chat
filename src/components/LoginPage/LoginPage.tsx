import { Button, Container } from 'react-materialize'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import { signIn } from '../../redux/reducers/authReducer'
import styles from './LoginPage.module.css'
import googleBtn from '../../assets/GoogleButton/btn_google_light_normal_ios.svg'
import { TRootReducer } from '../../redux/store';

type PropsType = {
  loading: boolean,
  isUserLogin: boolean,
  signIn: () => Promise<void>
}

const LoginPage: React.FC<PropsType> = (props): React.ReactElement => {
  const history = useHistory();

  const signUpHandler = () => {
    props.signIn().then(() => history.push('/main'))
  }

  return (
    <>
      <h1 className={styles.title}>Web Chat</h1>
      <Container style={{ textAlign: 'center' }}>
        <Button
          large
          waves="light"
          className={styles.button}
          onClick={signUpHandler}
        >
          <div className='left'>
            <img
              src={googleBtn}
              style={{ marginTop: '7px', marginRight: '8px' }}
              width={40}
              alt="googleBtn"
            />
          </div>
          <div className={styles.gText}>
            Sign in with Google
          </div>
        </Button>
      </Container>
    </>
  )
}

const mapStateToProps = (state: TRootReducer) => {
  return {
    loading: state.authPage.loading,
    isUserLogin: state.authPage.isUserLogin
  }
}

const mapDispatchToProps = {
  signIn
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)