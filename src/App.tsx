import { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import "./App.css";
import { Loader } from "./components/Loader";
import LoginPage from "./components/LoginPage/LoginPage";
import Main from "./components/Main/Main/Main";
import { initialize } from './redux/reducers/initialReducer';
import { TRootReducer } from "./redux/store";

type PropsType = {
  initializing: boolean
  isUserLogin: boolean
  initialize: () => void
}

const App: React.FC<PropsType> = (props): React.ReactElement => {

  useEffect(() => {
    props.initialize()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {props.initializing ? <Loader /> :
        <Switch>
          <Route exact path='/'>
            { props.isUserLogin ? <Redirect to='/main' /> : <LoginPage /> }
          </Route>
          <Route exact path='/main'>
            { props.isUserLogin ? <Main /> : <Redirect to='/' /> }
          </Route>
        </Switch>}

    </>
  );
}

const mapStateToProps = (state: TRootReducer) => {
  return {
    initializing: state.initialApp.initializing,
    isUserLogin: state.authPage.isUserLogin
  }
}

export default connect(mapStateToProps, { initialize })(App)