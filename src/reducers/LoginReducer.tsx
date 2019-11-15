import ActionType from '../actions/ActionType';

let initState = {
  isFetchingAuth: false,
  isFetchedAuth: false,
  isShowLoginError: false,
  info: 'null'
}

const loginReducer = (state = initState, action: any) => {
  switch (action.type) {
    case ActionType.AUTH_FAIL:
      return {
        ...state,
        isFetchedAuth: action.isFetchedAuth,
        isFetchingAuth: action.isFetchingAuth,
        isShowLoginError: action.isShowLoginError
      }
    case ActionType.AUTH_PENDING:
      return {
        ...state,
        isFetchedAuth: action.isFetchedAuth,
        isFetchingAuth: action.isFetchingAuth,
        isShowLoginError: action.isShowLoginError
      }
    case ActionType.AUTH_SUCCESS:
      return {
        ...state,
        isFetchedAuth: action.isFetchedAuth,
        isFetchingAuth: action.isFetchingAuth,
        isShowLoginError: action.isShowLoginError,
        info: action.info
      }
    case ActionType.HIDE_ERROR:
      return {
        ...state,
        isShowLoginError: action.isShowLoginError
      }
    default:
      return state
  }
}

export default loginReducer;