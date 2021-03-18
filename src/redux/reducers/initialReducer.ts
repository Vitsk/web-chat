import { ActionCreator, AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { setUser } from "./authReducer";

enum ActionTypes {
  INITIALIZING = 'initial/INITIALIZING'
}

// Type for initial state
type TInitialState = {
  initializing: boolean
}

// Type for action
type TAction = {
  type: ActionTypes.INITIALIZING,
  initializing: boolean,
}

// Type for action creators
type TInitializingAC = {
  type: typeof ActionTypes.INITIALIZING, 
  initializing: boolean
}

// Type for Thunks
type ThunkResult<R> = ThunkAction<R, TInitialState, undefined, AnyAction>;
type TThunkDispatch = ThunkDispatch<TInitialState, null, any>

const initialState: TInitialState = {
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


export const initializingAC: ActionCreator<TInitializingAC> = (initializing): TInitializingAC => (
  { type: ActionTypes.INITIALIZING, initializing }
);


// THUNKS
export const initialize: ActionCreator<ThunkResult<Promise<void>>> = (): ThunkResult<Promise<void>> => async (dispatch: TThunkDispatch): Promise<void> => {
  const promise = dispatch(setUser());

  Promise.all([promise])
    .then(() => dispatch(initializingAC(false)))
    .catch(() => dispatch(initializingAC(false)))
}