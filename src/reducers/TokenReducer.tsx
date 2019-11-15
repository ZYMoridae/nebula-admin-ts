import ActionType from '../actions/ActionType';

let initState: any = {
  isFetchingTokenAlive: false,
  isFetchedTokenAlive: false,
  info: null
}

const tokenReducer = (state = initState, action: any) => {
  switch (action.type) {
    case ActionType.TOKEN.HEART.REJECTED:
      return {
        ...state,
        isFetchedTokenAlive: action.isFetchedTokenAlive,
        isFetchingTokenAlive: action.isFetchingTokenAlive
      }
    case ActionType.TOKEN.HEART.PENDING:
      return {
        ...state,
        isFetchedTokenAlive: action.isFetchedTokenAlive,
        isFetchingTokenAlive: action.isFetchingTokenAlive
      }
    case ActionType.TOKEN.HEART.FULLFILLED:
      return {
        ...state,
        isFetchedTokenAlive: action.isFetchedTokenAlive,
        isFetchingTokenAlive: action.isFetchingTokenAlive,
        info: action.info
      }
    default:
      return state
  }
}

export default tokenReducer;