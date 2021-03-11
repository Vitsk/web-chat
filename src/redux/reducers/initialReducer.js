import { auth } from "../../firebase/firebase"

const LOADING = 'initial/LOADING'
const IS_USER_LOGIN = 'initial/IS_USER_LOGIN'
const SET_USER = 'initial/SET_USER'

const initialState = {
  loading: true,
  isUserLogin: false,
  user: {
    email: '',
    uid: ''
  }
}

export const initialReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: !state.loading
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
          email: action.email,
          uid: action.uid
        }
      }

    default:
      return state;
  }
}

export const loadingAC = () => ({ type: LOADING });
export const isUserLoginAC = (isUserLogin) => ({ type: IS_USER_LOGIN, isUserLogin });
export const setUserAC = (email, uid) => ({ type: SET_USER, email, uid });

// THUNKS
export const setUser = () => async (dispatch) => {
  return await auth.onAuthStateChanged(user => {
    if (user !== null) {
      dispatch(isUserLoginAC(true));
      dispatch(setUserAC(user.email, user.uid))
    } else {
      dispatch(isUserLoginAC(false));
    }
  })
}