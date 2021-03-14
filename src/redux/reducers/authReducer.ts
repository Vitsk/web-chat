import { AnyAction, Dispatch } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { auth, provider } from "../../firebase/firebase";

enum ActionTypes {
  SWITCH_LOADING = 'login/SWITCH_LOADING',
  IS_USER_LOGIN = 'login/IS_USER_LOGIN',
  SET_USER = 'login/SET_USER'
}

interface InitialState {
  loading: boolean,
  isUserLogin: boolean,
  user: {
    email: string,
    displayName: string,
    photoURL: string,
    uid: string
  }
}

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

export const authReducer = (state = initialState, action: any) => {
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

export const switchLoading = () => ({ type: ActionTypes.SWITCH_LOADING });
export const isUserLoginAC = (isUserLogin: boolean) => ({ type: ActionTypes.IS_USER_LOGIN, isUserLogin });
export const setUserAC = (email: string, displayName: string, photoURL: string, uid: string) => ({ 
  type: ActionTypes.SET_USER, 
  email, 
  displayName, 
  photoURL, 
  uid });

// THUNKS
export const signIn = () => async (dispatch: Dispatch) => {
  await auth.signInWithPopup(provider).then((result: any) => {
    dispatch(setUserAC(result.user.email, result.user.displayName, result.user.photoURL, result.user.uid))
    dispatch(isUserLoginAC(true))
  })
}

export const signOut = () => async (dispatch: Dispatch) => {
  await auth.signOut()
}

export const setUser = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
  return new Promise((resolve: Function, reject: Function) => {
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