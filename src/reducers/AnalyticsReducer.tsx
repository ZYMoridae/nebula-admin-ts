import ActionType from "../actions/ActionType";

let initState: any = {
  fetchAnalyticsPending: false,
  fetchAnalyticsFulfilled: false,
  analytics: null,
  error: null
};
const analyticsReducer = (state = initState, action: any) => {
  switch (action.type) {
    case ActionType.ANALYTICS.GET.ERROR:
      return Object.assign({}, state, {
        fetchAnalyticsFulfilled: action.fetchAnalyticsFulfilled,
        fetchAnalyticsPending: action.fetchAnalyticsPending,
        error: action.error
      });
    case ActionType.ANALYTICS.GET.PENDING:
      return Object.assign({}, state, {
        fetchAnalyticsFulfilled: action.fetchAnalyticsFulfilled,
        fetchAnalyticsPending: action.fetchAnalyticsPending
      });
    case ActionType.ANALYTICS.GET.FULFILLED:
      return Object.assign({}, state, {
        fetchAnalyticsFulfilled: action.fetchAnalyticsFulfilled,
        fetchAnalyticsPending: action.fetchAnalyticsPending,
        analytics: action.analytics
      });
    default:
      return state;
  }
};

export default analyticsReducer;
