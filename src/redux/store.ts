import { createStore, combineReducers, applyMiddleware, compose, Store } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { initialReducer } from './reducers/initialReducer';
import { authReducer } from './reducers/authReducer';

const reducers = combineReducers({
  initialApp: initialReducer,
  authPage: authReducer,
})

export type RootState = ReturnType<typeof reducers>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store: Store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);