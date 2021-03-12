import { Button } from "react-materialize"
import { signOut } from "../redux/reducers/authReducer"
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

const Main = (props) => {
  const history = useHistory();

  const signOutHandler = () => {
    props.signOut().then(() => history.push('/'))
  }

  return (
    <>
      <h1>Main page</h1>
      <Button
        large
        node="a"
        style={{
          marginRight: '5px',
        }}
        waves="light"
        onClick={signOutHandler}
      >
        Sign out
      </Button>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.authPage.user
  }
}

export default connect(mapStateToProps, { signOut })(Main)