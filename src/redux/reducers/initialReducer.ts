import { setUser } from "./authReducer";

enum ActionTypes {
  INITIALIZING = 'initial/INITIALIZING'
}

interface InitialState {
  initializing: boolean
}

interface IAction {
  type: ActionTypes.INITIALIZING,
  initializing: boolean
}

const initialState: InitialState = {
  initializing: true
}

export const initialReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case ActionTypes.INITIALIZING:
      return {
        ...state,
        initializing: action.initializing
      }

    default:
      return state;
  }
}

export const initializingAC = (initializing: boolean) => ({ type: ActionTypes.INITIALIZING, initializing });

// THUNKS
export const initialize = () => async (dispatch: any) => {
  const promise = dispatch(setUser());
  await promise
    .then(() => dispatch(initializingAC(false)))
    .catch(() => {
      dispatch(initializingAC(false))
      throw new Error()
    })
}