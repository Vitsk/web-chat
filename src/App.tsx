import { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, useHistory } from 'react-router-dom';
import "./App.css";
import { Loader } from "./components/Loader";
import LoginPage from "./components/LoginPage/LoginPage";
import Main from "./components/Main/Main";
import { initialize } from './redux/reducers/initialReducer';
import { RootState } from "./redux/store";

type PropsType = {
  initializing: boolean,
  initialize: () => Promise<void>
}

const App: React.FC<PropsType> = (props): React.ReactElement => {
  const history = useHistory()

  useEffect(() => {
    props.initialize()
      .then(() => history.push('/main'))
      .catch(() => history.push('/'))
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

const mapStateToProps = (state: RootState) => {
  return {
    initializing: state.initialApp.initializing,
  }
}

export default connect(mapStateToProps, { initialize })(App)