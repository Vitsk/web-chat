import { ActionCreator, AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { database } from "../../firebase/firebase";

enum ActionTypes {
  FETCH_MESSAGES = 'main/FETCH_MESSAGES',
  SEND_MESSAGES = 'main/SEND_MESSAGES'
}

// Types
export type TMessages = {
  id: string,
  text: string,
  uid: string,
  own: boolean
}

type TInitialState = {
  messages: TMessages[]
}

// Types for Action Creators
type TFetchMessages = {
  type: typeof ActionTypes.FETCH_MESSAGES,
  messages: TMessages[]
}
type TSendMessage = {
  type: typeof ActionTypes.SEND_MESSAGES,
  message: string
}
type TAction = TFetchMessages | TSendMessage

// Types for Thunks
type ThunkResult<R> = ThunkAction<R, TInitialState, undefined, AnyAction>;
type TThunkDispatch = ThunkDispatch<TInitialState, null, any>

// Reducer
const initialState: TInitialState = {
  messages: []
}

export const mainReducer = (state = initialState, action: TAction): TInitialState => {
  switch (action.type) {
    case ActionTypes.FETCH_MESSAGES:
      return {
        ...state,
        messages: action.messages
      }

    default:
      return state;
  }
}

// Action Creators
const _fetchMessages: ActionCreator<TFetchMessages> = (messages): TFetchMessages => ({
  type: ActionTypes.FETCH_MESSAGES,
  messages
});

// const _sendMessageAC: ActionCreator<TSendMessage> = (message): TSendMessage => ({
//   type: ActionTypes.SEND_MESSAGES,
//   message
// })

// Thunks
export const fetchMessages: ActionCreator<ThunkResult<void>> = (uid: string): ThunkResult<void> => (dispatch: TThunkDispatch): void => {
  database.ref('messages/').on('value', (snapshot) => {
    const data = snapshot.val();

    let messages: TMessages[] = Object.keys(data || []).map(key => {
      return {
        ...data[key],
        own: uid === data[key].uid
      }
    })

    dispatch(_fetchMessages(messages))
  })
}

export const sendMessage: ActionCreator<ThunkResult<void>> = (id: number, uid: string, text: string): ThunkResult<void> => (dispatch: TThunkDispatch): void => {
  database.ref(`messages/${id}`).update({
    text,
    uid
  })
}