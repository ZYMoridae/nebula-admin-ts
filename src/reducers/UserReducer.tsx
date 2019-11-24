import ActionType from "../actions/ActionType";

let initState: any = {
  fetchAllUserPending: false,
  fetchAllUserFulfilled: false,
  totalPages: 1,
  totalElements: 0,
  users: [],
  // Below for user GET action
  user: null,
  fetchUserPending: false,
  fetchUserFulfilled: false,

  updateUserPending: false,
  updateUserFulfilled: false,

  createUserPending: false,
  createUserFulfilled: false
};
const UserReducer = (state = initState, action: any) => {
  switch (action.type) {
    case ActionType.USER.GET_ALL.PENDING:
      return Object.assign({}, state, {
        fetchAllUserFulfilled: action.fetchAllUserFulfilled,
        fetchAllUserPending: action.fetchAllUserPending
      });
    case ActionType.USER.GET_ALL.ERROR:
      return Object.assign({}, state, {
        fetchAllUserFulfilled: action.fetchAllUserFulfilled,
        fetchAllUserPending: action.fetchAllUserPending
      });
    case ActionType.USER.GET_ALL.FULFILLED:
      return Object.assign({}, state, {
        fetchAllUserFulfilled: action.fetchAllUserFulfilled,
        fetchAllUserPending: action.fetchAllUserPending,
        users: action.users,
        totalPages: action.totalPages,
        totalElements: action.totalElements
      });
    // GET user action
    case ActionType.USER.GET.PENDING:
      return Object.assign({}, state, {
        fetchUserFulfilled: action.fetchUserFulfilled,
        fetchUserPending: action.fetchUserPending
      });
    case ActionType.USER.GET.ERROR:
      return Object.assign({}, state, {
        fetchUserFulfilled: action.fetchUserFulfilled,
        fetchUserPending: action.fetchUserPending
      });
    case ActionType.USER.GET.FULFILLED:
      return Object.assign({}, state, {
        fetchUserFulfilled: action.fetchUserFulfilled,
        fetchUserPending: action.fetchUserPending,
        user: action.user
      });
    // UPDATE user action
    case ActionType.USER.UPDATE.PENDING:
      return Object.assign({}, state, {
        updateUserFulfilled: action.updateUserFulfilled,
        updateUserPending: action.updateUserPending
      });
    case ActionType.USER.UPDATE.ERROR:
      return Object.assign({}, state, {
        updateUserFulfilled: action.updateUserFulfilled,
        updateUserPending: action.updateUserPending
      });
    case ActionType.USER.UPDATE.FULFILLED:
      return Object.assign({}, state, {
        updateUserFulfilled: action.updateUserFulfilled,
        updateUserPending: action.updateUserPending
        // user: action.user
      });
    // CREATE user action
    case ActionType.USER.CREATE.PENDING:
      return Object.assign({}, state, {
        createUserFulfilled: action.createUserFulfilled,
        createUserPending: action.createUserPending
      });
    case ActionType.USER.CREATE.ERROR:
      return Object.assign({}, state, {
        createUserFulfilled: action.createUserFulfilled,
        createUserPending: action.createUserPending
      });
    case ActionType.USER.CREATE.FULFILLED:
      return Object.assign({}, state, {
        createUserFulfilled: action.createUserFulfilled,
        createUserPending: action.createUserPending
        // user: action.user
      });
    default:
      return state;
  }
};

export default UserReducer;
