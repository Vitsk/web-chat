import { createStore, combineReducers, applyMiddleware, compose, Store } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { initialReducer } from './reducers/initialReducer';
import { authReducer } from './reducers/authReducer';
import { mainReducer } from './reducers/mainReducer';

const rootReducer = combineReducers({
  initialApp: initialReducer,
  authPage: authReducer,
  mainPage: mainReducer
})

export type TRootReducer = ReturnType<typeof rootReducer>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store: Store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);