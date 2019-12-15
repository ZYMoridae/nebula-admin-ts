import ActionType from "../actions/ActionType";

let initState: any = {
  fetchAllLogisticProviderPending: false,
  fetchAllLogisticProviderFulfilled: false,
  logisticProviders: [],
  totalPages: 1,
  totalElements: 0,

  fetchLogisticProviderPending: false,
  fetchLogisticProviderFulfilled: false,
  logisticProvider: undefined,

  updateLogisticProviderPending: false,
  updateLogisticProviderFulfilled: false,

  createLogisticProviderPending: false,
  createLogisticProviderFulfilled: false
};
const LogisticProviderReducer = (state = initState, action: any) => {
  switch (action.type) {
    // GET all logistic provider
    case ActionType.LOGISTIC_PROVIDER.GET_ALL.PENDING:
      return Object.assign({}, state, {
        fetchAllLogisticProviderFulfilled:
          action.fetchAllLogisticProviderFulfilled,
        fetchAllLogisticProviderPending: action.fetchAllLogisticProviderPending
      });
    case ActionType.LOGISTIC_PROVIDER.GET_ALL.ERROR:
      return Object.assign({}, state, {
        fetchAllLogisticProviderFulfilled:
          action.fetchAllLogisticProviderFulfilled,
        fetchAllLogisticProviderPending: action.fetchAllLogisticProviderPending
      });
    case ActionType.LOGISTIC_PROVIDER.GET_ALL.FULFILLED:
      return Object.assign({}, state, {
        fetchAllLogisticProviderFulfilled:
          action.fetchAllLogisticProviderFulfilled,
        fetchAllLogisticProviderPending: action.fetchAllLogisticProviderPending,
        logisticProviders: action.logisticProviders,
        totalPages: action.totalPages,
        totalElements: action.totalElements
      });
    // GET logistic provider action
    case ActionType.LOGISTIC_PROVIDER.GET.PENDING:
      return Object.assign({}, state, {
        fetchLogisticProviderFulfilled: action.fetchLogisticProviderFulfilled,
        fetchLogisticProviderPending: action.fetchLogisticProviderPending
      });
    case ActionType.LOGISTIC_PROVIDER.GET.ERROR:
      return Object.assign({}, state, {
        fetchLogisticProviderFulfilled: action.fetchLogisticProviderFulfilled,
        fetchLogisticProviderPending: action.fetchLogisticProviderPending
      });
    case ActionType.LOGISTIC_PROVIDER.GET.FULFILLED:
      return Object.assign({}, state, {
        fetchLogisticProviderFulfilled: action.fetchLogisticProviderFulfilled,
        fetchLogisticProviderPending: action.fetchLogisticProviderPending,
        logisticProvider: action.logisticProvider
      });
    // UPDATE logistic provider action
    case ActionType.LOGISTIC_PROVIDER.UPDATE.PENDING:
      return Object.assign({}, state, {
        updateLogisticProviderFulfilled: action.updateLogisticProviderFulfilled,
        updateLogisticProviderPending: action.updateLogisticProviderPending
      });
    case ActionType.LOGISTIC_PROVIDER.UPDATE.ERROR:
      return Object.assign({}, state, {
        updateLogisticProviderFulfilled: action.updateLogisticProviderFulfilled,
        updateLogisticProviderPending: action.updateLogisticProviderPending
      });
    case ActionType.LOGISTIC_PROVIDER.UPDATE.FULFILLED:
      return Object.assign({}, state, {
        updateLogisticProviderFulfilled: action.updateLogisticProviderFulfilled,
        updateLogisticProviderPending: action.updateLogisticProviderPending
        // user: action.user
      });
    // NEW logistic provider action
    case ActionType.LOGISTIC_PROVIDER.CREATE.PENDING:
      return Object.assign({}, state, {
        createLogisticProviderFulfilled: action.createLogisticProviderFulfilled,
        createLogisticProviderPending: action.createLogisticProviderPending
      });
    case ActionType.LOGISTIC_PROVIDER.CREATE.ERROR:
      return Object.assign({}, state, {
        createLogisticProviderFulfilled: action.createLogisticProviderFulfilled,
        createLogisticProviderPending: action.createLogisticProviderPending
      });
    case ActionType.LOGISTIC_PROVIDER.CREATE.FULFILLED:
      return Object.assign({}, state, {
        createLogisticProviderFulfilled: action.createLogisticProviderFulfilled,
        createLogisticProviderPending: action.createLogisticProviderPending
        // user: action.user
      });
    default:
      return state;
  }
};

export default LogisticProviderReducer;
