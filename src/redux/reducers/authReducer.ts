import { UserCredential } from '@firebase/auth-types';
import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { auth, provider } from "../../firebase/firebase";

enum ActionTypes {
  SWITCH_LOADING = 'login/SWITCH_LOADING',
  IS_USER_LOGIN = 'login/IS_USER_LOGIN',
  SET_USER = 'login/SET_USER'
}

// Type for initial state
type TInitialState = {
  loading: boolean,
  isUserLogin: boolean,
  user: {
    email: string,
    displayName: string,
    photoURL: string,
    uid: string
  }
}

// Types for Action creators
type TSwitchLoading = {
  type: typeof ActionTypes.SWITCH_LOADING,
  loading: boolean
}
type TIsUserLoginAC = {
  type: typeof ActionTypes.IS_USER_LOGIN,
  isUserLogin: boolean
}
type TSetUserAC = {
  type: typeof ActionTypes.SET_USER,
  email: string
  displayName: string
  photoURL: string
  uid: string
}

type TAction = TSwitchLoading | TIsUserLoginAC | TSetUserAC;

// Types for Thunks
type ThunkResult<R> = ThunkAction<R, TInitialState, undefined, TAction>;
// type TThunkDispatch = ThunkDispatch<TInitialState, null, any>


// Reducer
const initialState: TInitialState = {
  loading: false,
  isUserLogin: false,
  user: {
    email: '',
    displayName: '',
    photoURL: '',
    uid: ''
  }
}

export const authReducer = (state = initialState, action: TAction): TInitialState => {
  switch (action.type) {
    case ActionTypes.SWITCH_LOADING:
      return {
        ...state,
        loading: action.loading
      }

    case ActionTypes.IS_USER_LOGIN:
      return {
        ...state,
        isUserLogin: action.isUserLogin
      }

    case ActionTypes.SET_USER:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.email,
          displayName: action.displayName,
          photoURL: action.photoURL,
          uid: action.uid
        }
      }

    default:
      return state;
  }
}

// Action creators
export const switchLoading: ActionCreator<TSwitchLoading> = (loading): TSwitchLoading => (
  { type: ActionTypes.SWITCH_LOADING, loading }
);
export const isUserLoginAC: ActionCreator<TIsUserLoginAC> = (isUserLogin): TIsUserLoginAC => (
  { type: ActionTypes.IS_USER_LOGIN, isUserLogin }
);

export const setUserAC: ActionCreator<TSetUserAC> = (email, displayName, photoURL, uid): TSetUserAC => (
  {
    type: ActionTypes.SET_USER,
    email,
    displayName,
    photoURL,
    uid
  }
);

// Thunks
export const signIn = (): ThunkResult<Promise<void>> => async (dispatch): Promise<void> => {
  await auth.signInWithPopup(provider).then((result: UserCredential) => {
    dispatch(setUserAC(result.user?.email, result.user?.displayName, result.user?.photoURL, result.user?.uid))
    dispatch(isUserLoginAC(true))
  })
}

export const signOut = (): ThunkResult<Promise<void>> => async (): Promise<void> => {
  await auth.signOut()
}

export const setUser = (): ThunkResult<Promise<void>> => (dispatch): Promise<void> => {
  return new Promise((resolve: () => void, reject: () => void) => {
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        dispatch(setUserAC(user.email, user.displayName, user.photoURL, user.uid))
        dispatch(isUserLoginAC(true));
        resolve()
      } else {
        dispatch(isUserLoginAC(false));
        reject();
      }
    })
  });
}