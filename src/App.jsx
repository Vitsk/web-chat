import { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import "./App.css";
import { Loader } from "./components/Loader";
import LoginPage from "./components/LoginPage";
import Main from "./components/Main";
import { initialize } from './redux/reducers/initialReducer';
import { useHistory } from 'react-router-dom'

const App = (props) => {
  const history = useHistory()

  useEffect(() => {
    props.initialize()
      .then(() => history.push('/main'))
      .catch((e) => history.push('/'))
    // eslint-disable-next-line
  }, [])

  

  return (
    <>
      {props.initializing ? <Loader /> :
        <Switch>
          <Route exact path='/'>
            <LoginPage />
          </Route>
          <Route exact path='/main'>
            <Main />
          </Route>
        </Switch>}

    </>
  );
}

const mapStateToProps = (state) => {
  return {
    initializing: state.initialApp.initializing,
  }
}

export default connect(mapStateToProps, { initialize })(App)