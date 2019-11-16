import Zjax from '../utils/zjax';
import Utils from '../utils/Utils';
import ActionType from './ActionType';

export const hideSuccessToast = () => {
  return {
    type: ActionType.HIDE_SUCCESS_TOAST,
    isShowSuccessToast: false
  }
}

// ------ ProductInfo Actions ------
export const receieveProductInfo = (result: any) => {
  return {
    type: ActionType.RECEIVE_PRODUCT_INFO,
    isFetchingProductInfo: false,
    isFetchedProductInfo: true,
    info: result
  }
}

export const fetchingProductInfo = () => {
  return {
    type: ActionType.FETCHING_PRODUCT_INFO_PENDING,
    isFetchingProductInfo: true,
    isFetchedProductInfo: false
  }
}

export const fetchingProductInfoError = (error: any) => {
  return {
    type: ActionType.FETCHING_PRODUCT_INFO_REJECTED,
    isFetchingProductInfo: false,
    isFetchedProductInfo: true,
    error: error
  }
}


export const fetchProductInfo = (productId: number) => {
  return function (dispatch: any) {
    dispatch(fetchingProductInfo());

    let options = {
      method: 'get'
    };

    Zjax.request({
      url: `/api/products/${productId}`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        dispatch(receieveProductInfo(response.data));
      },
      failureCallback: (error: any) => {
        dispatch(fetchingProductInfoError(error));
      }
    });
  }
}

// ------ Product Comments Actions ------
export const receieveProductComments = (result: any) => {
  return {
    type: ActionType.RECEIVE_PRODUCT_COMMENTS,
    isFetchingProductComments: false,
    isFetchedProductComments: true,
    info: result.content
  }
}

export const fetchingProductComments = () => {
  return {
    type: ActionType.FETCHING_PRODUCT_COMMENTS_PENDING,
    isFetchingProductComments: true,
    isFetchedProductComments: false
  }
}

export const fetchingProductCommentsError = (error: any) => {
  return {
    type: ActionType.FETCHING_PRODUCT_COMMENTS_REJECTED,
    isFetchingProductComments: false,
    isFetchedProductComments: true,
    error: error
  }
}


export const fetchProductComments = (productId: number) => {
  return function (dispatch: any) {
    dispatch(fetchingProductComments());

    let options = {
      method: 'get'
    };

    Zjax.request({
      url: `/api/products/${productId}/comments`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        dispatch(receieveProductComments(response.data));
      },
      failureCallback: (error: any) => {
        dispatch(fetchingProductCommentsError(error));
      }
    });
  }
}