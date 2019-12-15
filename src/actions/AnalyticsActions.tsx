import Zjax from "../utils/zjax";
import Utils from "../utils/Utils";
import ActionType from "./ActionType";

// ANCHOR Fetch analytics info

export const fetchAnalyticsFulfilled = (analytics: any) => {
  return {
    type: ActionType.ANALYTICS.GET.FULFILLED,
    fetchAnalyticsPending: false,
    fetchAnalyticsFulfilled: true,
    analytics: analytics
  };
};

export const fetchAnalyticsPending = () => {
  return {
    type: ActionType.ANALYTICS.GET.PENDING,
    fetchAnalyticsPending: true,
    fetchAnalyticsFulfilled: false
  };
};

export const fetchAnalyticsError = (error: any) => {
  return {
    type: ActionType.ANALYTICS.GET.ERROR,
    fetchAnalyticsPending: false,
    fetchAnalyticsFulfilled: true,
    error: error
  };
};

export const fetchAnalytics = () => {
  return function(dispatch: any) {
    dispatch(fetchAnalyticsPending());

    let options = {
      method: Zjax.HTTP.METHOD.GET
    };

    Zjax.request({
      url: `/api/analytics`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        dispatch(fetchAnalyticsFulfilled(response.data));
      },
      failureCallback: (error: any) => {
        dispatch(fetchAnalyticsError(error));
      }
    });
  };
};
