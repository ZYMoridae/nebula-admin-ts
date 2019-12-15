import Zjax from "../utils/zjax";
import Utils from "../utils/Utils";
import ActionType from "./ActionType";

// ANCHOR Fetch all logistic provider
export const fetchAllLogisticProviderFulfilled = (
  results: any,
  totalPages: number,
  totalElements: number
) => {
  return {
    type: ActionType.LOGISTIC_PROVIDER.GET_ALL.FULFILLED,
    fetchAllLogisticProviderPending: false,
    fetchAllLogisticProviderFulfilled: true,
    logisticProviders: results,
    totalPages: totalPages,
    totalElements: totalElements,
    receivedAt: Date.now()
  };
};

export const fetchAllLogisticProviderPending = () => {
  return {
    type: ActionType.LOGISTIC_PROVIDER.GET_ALL.PENDING,
    fetchAllLogisticProviderPending: true,
    fetchAllLogisticProviderFulfilled: false
  };
};

export const fetchAllLogisticProviderError = (err: any) => {
  return {
    type: ActionType.LOGISTIC_PROVIDER.GET_ALL.ERROR,
    fetchAllLogisticProviderPending: false,
    fetchAllLogisticProviderFulfilled: true
  };
};

export const fetchAllLogisticProvider = (
  page: number,
  perPage: number,
  orderBy: string
) => {
  return function(dispatch: any) {
    dispatch(fetchAllLogisticProviderPending());

    let options = {
      method: Zjax.HTTP.METHOD.GET
    };

    Zjax.request({
      url: `/api/logistics-provider?page=${page -
        1}&size=${perPage}&sort=${orderBy}&keyword`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        dispatch(
          fetchAllLogisticProviderFulfilled(
            response.data._embedded.logisticsProviderList,
            response.data.page.totalPages,
            response.data.page.totalElements
          )
        );
      },
      failureCallback: (error: any) => {
        dispatch(fetchAllLogisticProviderError(error));
      }
    });
  };
};

// ANCHOR Fetch logistic provider by id
export const fetchLogisticProviderFulfilled = (logisticProvider: any) => {
  return {
    type: ActionType.LOGISTIC_PROVIDER.GET.FULFILLED,
    fetchLogisticProviderPending: false,
    fetchLogisticProviderFulfilled: true,
    logisticProvider: logisticProvider
  };
};

export const fetchLogisticProviderPending = () => {
  return {
    type: ActionType.LOGISTIC_PROVIDER.GET.PENDING,
    fetchLogisticProviderPending: true,
    fetchLogisticProviderFulfilled: false
  };
};

export const fetchLogisticProviderError = (error: any) => {
  return {
    type: ActionType.LOGISTIC_PROVIDER.GET.ERROR,
    fetchLogisticProviderPending: false,
    fetchLogisticProviderFulfilled: true,
    error: error
  };
};

export const fetchLogisticProvider = (id: any) => {
  return function(dispatch: any) {
    dispatch(fetchLogisticProviderPending());

    let options = {
      method: Zjax.HTTP.METHOD.GET
    };

    Zjax.request({
      url: `/api/logistics-provider/${id}`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        dispatch(fetchLogisticProviderFulfilled(response.data));
      },
      failureCallback: (error: any) => {
        dispatch(fetchLogisticProviderError(error));
      }
    });
  };
};

// ANCHOR Update logistic provider by id
export const updateLogisticProviderFulfilled = (logisticProvider: any) => {
  return {
    type: ActionType.LOGISTIC_PROVIDER.UPDATE.FULFILLED,
    updateLogisticProviderPending: false,
    updateLogisticProviderFulfilled: true,
    logisticProvider: logisticProvider
  };
};

export const updateLogisticProviderPending = () => {
  return {
    type: ActionType.LOGISTIC_PROVIDER.UPDATE.PENDING,
    updateLogisticProviderPending: true,
    updateLogisticProviderFulfilled: false
  };
};

export const updateLogisticProviderError = (error: any) => {
  return {
    type: ActionType.LOGISTIC_PROVIDER.UPDATE.ERROR,
    updateLogisticProviderPending: false,
    updateLogisticProviderFulfilled: true,
    error: error
  };
};

export const updateLogisticProvider = (logisticProvider: any) => {
  return function(dispatch: any) {
    dispatch(updateLogisticProviderPending());

    let options = {
      method: Zjax.HTTP.METHOD.PUT,
      data: logisticProvider
    };

    Zjax.request({
      url: `/api/logistics-provider/${logisticProvider.id}`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        dispatch(updateLogisticProviderFulfilled(response.data));
      },
      failureCallback: (error: any) => {
        dispatch(updateLogisticProviderError(error));
      }
    });
  };
};

// ANCHOR New logistic provider
export const createLogisticProviderFulfilled = (logisticProvider: any) => {
  return {
    type: ActionType.LOGISTIC_PROVIDER.CREATE.FULFILLED,
    createLogisticProviderPending: false,
    createLogisticProviderFulfilled: true,
    logisticProvider: logisticProvider
  };
};

export const createLogisticProviderPending = () => {
  return {
    type: ActionType.LOGISTIC_PROVIDER.CREATE.PENDING,
    createLogisticProviderPending: true,
    createLogisticProviderFulfilled: false
  };
};

export const createLogisticProviderError = (error: any) => {
  return {
    type: ActionType.LOGISTIC_PROVIDER.CREATE.ERROR,
    createLogisticProviderPending: false,
    createLogisticProviderFulfilled: true,
    error: error
  };
};

export const createLogisticProvider = (logisticProvider: any) => {
  return function(dispatch: any) {
    dispatch(createLogisticProviderPending());

    let options = {
      method: Zjax.HTTP.METHOD.POST,
      data: logisticProvider
    };

    Zjax.request({
      url: `/api/logistics-provider`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        window.location.href = `/logistic-providers/${response.data.id}`;
        dispatch(createLogisticProviderFulfilled(response.data));
      },
      failureCallback: (error: any) => {
        dispatch(createLogisticProviderError(error));
      }
    });
  };
};
