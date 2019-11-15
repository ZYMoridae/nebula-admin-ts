import Zjax from '../utils/zjax';
import ActionType from './ActionType';
import Utils from '../utils/Utils';

// ------ Auth Actions ------
export const receieveAuth = (json: any) => {
  return {
    type: ActionType.AUTH_SUCCESS,
    isFetchingAuth: false,
    isFetchedAuth: true,
    isShowLoginError: false,
    info: json
  }
}

export const fetchingAuth = () => {
  return {
    type: ActionType.AUTH_PENDING,
    isFetchingAuth: true,
    isFetchedAuth: false,
    isShowLoginError: false
  }
}

export const fetchingAuthError = () => {
  return {
    type: ActionType.AUTH_FAIL,
    isFetchingAuth: false,
    isFetchedAuth: true,
    isShowLoginError: true
  }
}

export const hideLoginError = () => {
  return {
    type: ActionType.HIDE_ERROR,
    isShowLoginError: false
  }
}

export const fetchAuthInfo = (data: any) => {
  return function (dispatch: any) {
    dispatch(fetchingAuth());
    var headers = {};
    if (data.headers) {
      headers = data.headers;
    }
    delete data.headers;
    Zjax.request({
      url: '/api/sso/authorize',
      option: {
        method: 'post',
        data: data,
        headers: headers
      },
      successCallback: (response: any) => {
        // Set auth token
        sessionStorage.setItem('user', response.data);
        sessionStorage.setItem('token', response.data.token);
        dispatch(receieveAuth(response.data));
      },
      failureCallback: (error: any) => {
        dispatch(fetchingAuthError());
      }
    });
  }
}


// ------ Check token is alive ------
export const receieveTokenAlive = (json: any) => {
  return {
    type: ActionType.TOKEN.HEART.FULLFILLED,
    isFetchingTokenAlive: false,
    isFetchedTokenAlive: true,
    info: json
  }
}

export const fetchingTokenAlive = () => {
  return {
    type: ActionType.TOKEN.HEART.PENDING,
    isFetchingTokenAlive: true,
    isFetchedTokenAlive: false,
  }
}

export const fetchingTokenAliveError = () => {
  return {
    type: ActionType.TOKEN.HEART.REJECTED,
    isFetchingTokenAlive: false,
    isFetchedTokenAlive: true,
  }
}

export const fetchTokenAliveInfo = () => {
  return function (dispatch: any) {
    dispatch(fetchingTokenAlive());
    let options = {
      method: 'get'
    };
    options = Utils.addToken(options);
    Zjax.request({
      url: `/api/token/${sessionStorage.getItem('token')}`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        dispatch(receieveTokenAlive(response.data));
      },
      failureCallback: (error: any) => {
        dispatch(fetchingTokenAliveError());
      }
    });
  }
}