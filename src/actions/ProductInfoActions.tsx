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
    type: ActionType.PRODUCT.GET.FULFILLED,
    isFetchingProductInfo: false,
    isFetchedProductInfo: true,
    info: result
  }
}

export const fetchingProductInfo = () => {
  return {
    type: ActionType.PRODUCT.GET.PENDING,
    isFetchingProductInfo: true,
    isFetchedProductInfo: false
  }
}

export const fetchingProductInfoError = (error: any) => {
  return {
    type: ActionType.PRODUCT.GET.ERROR,
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