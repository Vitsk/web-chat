import { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import "./App.css";
import { Loader } from "./components/Loader";
import LoginPage from "./components/LoginPage";
import { Main } from "./components/Main";
import { loadingAC, setUser } from './redux/reducers/initialReducer';
import { useHistory } from 'react-router-dom'

const App = (props) => {
  const history = useHistory()

  useEffect(() => {
    props.setUser();
    props.loadingAC();
    // eslint-disable-next-line
  }, [])

  if (props.isUserLogin) {
    history.push('/main')
  }
  
  return (
    <>
      {props.loading && <Loader />}
      <Switch>
        <Route exact path='/'>
          <LoginPage />
        </Route>
        <Route exact path='/main'>
          <Main />
        </Route>
      </Switch>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.initialApp.loading,
    isUserLogin: state.initialApp.isUserLogin
  }
}

export default connect(mapStateToProps, { setUser, loadingAC })(App)