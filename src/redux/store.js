import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { initialReducer } from './reducers/initialReducer';
import { authReducer } from './reducers/authReducer';

const reducers = combineReducers({
  initialApp: initialReducer,
  authPage: authReducer,
  // mainPage: mainReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);