import Zjax from "../utils/zjax";
import ActionType from "./ActionType";
import Utils from "../utils/Utils";

// ANCHOR SSO Authentication
export const receieveAuth = (json: any) => {
  return {
    type: ActionType.AUTH_SUCCESS,
    isFetchingAuth: false,
    isFetchedAuth: true,
    isShowLoginError: false,
    info: json
  };
};

export const fetchingAuth = () => {
  return {
    type: ActionType.AUTH_PENDING,
    isFetchingAuth: true,
    isFetchedAuth: false,
    isShowLoginError: false
  };
};

export const fetchingAuthError = () => {
  return {
    type: ActionType.AUTH_FAIL,
    isFetchingAuth: false,
    isFetchedAuth: true,
    isShowLoginError: true
  };
};

export const fetchAuthInfo = (data: any) => {
  return function(dispatch: any) {
    dispatch(fetchingAuth());
    var headers = {};
    if (data.headers) {
      headers = data.headers;
    }
    delete data.headers;
    Zjax.request({
      url: "/api/sso/auth",
      option: {
        method: Zjax.HTTP.METHOD.POST,
        data: data,
        headers: headers
      },
      successCallback: (response: any) => {
        if (!response.data.user.admin) {
          dispatch(fetchingAuthError());
        } else {
          // Set auth token
          sessionStorage.setItem("user", JSON.stringify(response.data));
          sessionStorage.setItem("token", response.data.token);
          dispatch(receieveAuth(response.data));
        }
      },
      failureCallback: (error: any) => {
        dispatch(fetchingAuthError());
      }
    });
  };
};

export const hideLoginError = () => {
  return {
    type: ActionType.HIDE_ERROR,
    isShowLoginError: false
  };
};

// ANCHOR Check token live
export const receieveTokenAlive = (json: any) => {
  return {
    type: ActionType.TOKEN.HEART.FULLFILLED,
    isFetchingTokenAlive: false,
    isFetchedTokenAlive: true,
    info: json
  };
};

export const fetchingTokenAlive = () => {
  return {
    type: ActionType.TOKEN.HEART.PENDING,
    isFetchingTokenAlive: true,
    isFetchedTokenAlive: false
  };
};

export const fetchingTokenAliveError = () => {
  return {
    type: ActionType.TOKEN.HEART.REJECTED,
    isFetchingTokenAlive: false,
    isFetchedTokenAlive: true
  };
};

export const fetchTokenAliveInfo = () => {
  return function(dispatch: any) {
    dispatch(fetchingTokenAlive());
    let options = {
      method: Zjax.HTTP.METHOD.GET
    };
    options = Utils.addToken(options);
    Zjax.request({
      url: `/api/token/${sessionStorage.getItem("token")}`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        dispatch(receieveTokenAlive(response.data));
      },
      failureCallback: (error: any) => {
        dispatch(fetchingTokenAliveError());
      }
    });
  };
};
