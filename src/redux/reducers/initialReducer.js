import { setUser } from "./authReducer";

const INITIALIZING = 'initial/INITIALIZING'

const initialState = {
  initializing: true
}

export const initialReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZING:
      return {
        ...state,
        initializing: action.initializing
      }

    default:
      return state;
  }
}

export const initializingAC = (initializing) => ({ type: INITIALIZING, initializing });

// THUNKS
export const initialize = () => async (dispatch) => {
  const promise = dispatch(setUser());
  await promise
    .then(() => dispatch(initializingAC(false)))
    .catch(() => {
      dispatch(initializingAC(false))
      throw new Error()
    })
}