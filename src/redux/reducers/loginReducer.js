const SWITCH_LOADING = 'SWITCH_LOADING';

const initialState = {
  loading: false
}

export const loginReducer = (state = initialState, action) => {
  switch(action.type) {
    case SWITCH_LOADING:
      return {
        ...state,
        loading: !state.loading
      }

    default: 
      return state;
  }
}

export const switchLoading = () => ({ type: SWITCH_LOADING })