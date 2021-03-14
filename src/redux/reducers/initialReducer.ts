import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { setUser } from "./authReducer";

enum ActionTypes {
  INITIALIZING = 'initial/INITIALIZING'
}

type InitialState = {
  initializing: boolean
}

type TAction = {
  type: ActionTypes.INITIALIZING,
  initializing: boolean,
}

const initialState: InitialState = {
  initializing: true
}

export const initialReducer = (state = initialState, action: TAction) => {
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

type TInitializingAC = {
  type: typeof ActionTypes.INITIALIZING, 
  initializing: boolean
}
export const initializingAC = (initializing: boolean): TInitializingAC => ({ type: ActionTypes.INITIALIZING, initializing });


// THUNKS
export const initialize = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
  const promise = dispatch(setUser());

  Promise.all([promise])
    .then(() => dispatch(initializingAC(false)))
    .catch(() => dispatch(initializingAC(false)))
}