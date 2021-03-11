import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { initialReducer } from './reducers/initialReducer';
import { loginReducer } from './reducers/loginReducer';

const reducers = combineReducers({
  initialApp: initialReducer,
  loginPage: loginReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);