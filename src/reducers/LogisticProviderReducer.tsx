import ActionType from "../actions/ActionType";

let initState: any = {
  fetchAllLogisticProviderPending: false,
  fetchAllLogisticProviderFulfilled: false,
  logisticProviders: [],
  totalPages: 1,
  totalElements: 0,

  fetchLogisticProviderPending: false,
  fetchLogisticProviderFulfilled: false,
  logisticProvider: undefined
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
    default:
      return state;
  }
};

export default LogisticProviderReducer;
