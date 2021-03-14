import { AnyAction, Dispatch } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { auth, provider } from "../../firebase/firebase";

// Types
enum ActionTypes {
  SWITCH_LOADING = 'login/SWITCH_LOADING',
  IS_USER_LOGIN = 'login/IS_USER_LOGIN',
  SET_USER = 'login/SET_USER'
}

type TAction = TSwitchLoading | TIsUserLoginAC | TSetUserAC

type InitialState = {
  loading: boolean,
  isUserLogin: boolean,
  user: {
    email: string,
    displayName: string,
    photoURL: string,
    uid: string
  }
}

// Reducer
const initialState: InitialState = {
  loading: false,
  isUserLogin: false,
  user: {
    email: '',
    displayName: '',
    photoURL: '',
    uid: ''
  }
}

export const authReducer = (state = initialState, action: TAction): InitialState => {
  switch(action.type) {
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

type TSwitchLoading = {
  type: typeof ActionTypes.SWITCH_LOADING,
  loading: boolean
}
export const switchLoading = (loading: boolean): TSwitchLoading => ({ type: ActionTypes.SWITCH_LOADING, loading });

type TIsUserLoginAC = {
  type: typeof ActionTypes.IS_USER_LOGIN,
  isUserLogin: boolean
}
export const isUserLoginAC = (isUserLogin: boolean): TIsUserLoginAC => ({ type: ActionTypes.IS_USER_LOGIN, isUserLogin });

type TSetUserAC = {
  type: typeof ActionTypes.SET_USER, 
  email: string
  displayName: string
  photoURL: string
  uid: string
}
export const setUserAC = (email: string, displayName: string, photoURL: string, uid: string): TSetUserAC => ({ 
  type: ActionTypes.SET_USER, 
  email, 
  displayName, 
  photoURL, 
  uid });

// THUNKS
export const signIn = () => async (dispatch: Dispatch<TAction>): Promise<void> => {
  await auth.signInWithPopup(provider).then((result: any) => {
    dispatch(setUserAC(result.user.email, result.user.displayName, result.user.photoURL, result.user.uid))
    dispatch(isUserLoginAC(true))
  })
}

export const signOut = () => async (dispatch: Dispatch<TAction>): Promise<void> => {
  await auth.signOut()
}

export const setUser = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
  return new Promise((resolve: () => void, reject: () => void) => {
    auth.onAuthStateChanged((user: any) => {
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