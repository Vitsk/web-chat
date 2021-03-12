import { auth, provider } from "../../firebase/firebase";

const SWITCH_LOADING = 'login/SWITCH_LOADING';
const IS_USER_LOGIN = 'login/IS_USER_LOGIN';
const SET_USER = 'login/SET_USER'

const initialState = {
  loading: false,
  isUserLogin: false,
  user: {
    email: '',
    displayName: '',
    photoURL: '',
    uid: ''
  }
}

export const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case SWITCH_LOADING:
      return {
        ...state,
        loading: action.loading
      }

    case IS_USER_LOGIN:
      return {
        ...state,
        isUserLogin: action.isUserLogin
      }

    case SET_USER:
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

export const switchLoading = () => ({ type: SWITCH_LOADING });
export const isUserLoginAC = (isUserLogin) => ({ type: IS_USER_LOGIN, isUserLogin });
export const setUserAC = (email, displayName, photoURL, uid) => ({ 
  type: SET_USER, 
  email, 
  displayName, 
  photoURL, 
  uid });

// THUNKS
export const signIn = () => async (dispatch) => {
  await auth.signInWithPopup(provider).then((result) => {
    dispatch(setUserAC(result.user.email, result.user.displayName, result.user.photoURL, result.user.uid))
    dispatch(isUserLoginAC(true))
  })
}

export const signOut = () => async (dispatch) => {
  await auth.signOut()
}

export const setUser = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
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