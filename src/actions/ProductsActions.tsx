import Zjax from "../utils/zjax";
import Utils from "../utils/Utils";
import ActionType from "./ActionType";

import _ from "lodash";
// ------ User Actions ------

/**
 * Products info fetched successful
 *
 * @param {array} results
 * @param {int} totalPages
 */
export const receieveProducts = (results: any, totalPages: number) => {
  return {
    type: ActionType.RECEIVE_PRODUCTS,
    isFetchingProducts: false,
    isFetchedProducts: true,
    info: results,
    totalPages: totalPages
  };
};

/**
 * Fetching products
 */
export const fetchingProducts = () => {
  return {
    type: ActionType.FETCHING_PRODUCTS_PENDING,
    isFetchingProducts: true,
    isFetchedProducts: false
  };
};

/**
 * Fetching products info failed
 *
 * @param {object} error
 */
export const fetchingProductsError = (error: any) => {
  return {
    type: ActionType.FETCHING_PRODUCTS_REJECTED,
    isFetchingProducts: false,
    isFetchedProducts: true,
    error: error
  };
};

/**
 * Fetch products info
 *
 * @param {int} page
 * @param {int} perPage
 * @param {string} orderBy
 */
export const fetchProductsInfo = (
  page: number,
  perPage: number,
  orderBy: string
) => {
  return function(dispatch: any) {
    dispatch(fetchingProducts());

    let options = {
      method: "get"
    };

    Zjax.request({
      url: `/api/products?page=${page -
        1}&size=${perPage}&sort=${orderBy}&keyword`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        dispatch(
          receieveProducts(
            response.data._embedded.productList,
            response.data.page.totalPages
          )
        );
      },
      failureCallback: (error: any) => {
        dispatch(fetchingProductsError(error));
      }
    });
  };
};

// ------ Fetch product by ids ------

/**
 * Receieve products by ids
 *
 * @param {*} results
 */
export const receieveProductsByIds = (results: any) => {
  return {
    type: ActionType.RECEIEVE_PRODUCTS_BY_IDS,
    isFetchingProductsByIds: false,
    isFetchedProductsByIds: true,
    info: results
  };
};

/**
 * Fetching products by ids
 */
export const fetchingProductsByIds = () => {
  return {
    type: ActionType.FETCHING_PRODUCTS_BY_IDS_PENDING,
    isFetchingProductsByIds: true,
    isFetchedProductsByIds: false
  };
};

/**
 * Fetching products by ids failed
 *
 * @param {object} error
 */
export const fetchingProductsByIdsError = (error: any) => {
  return {
    type: ActionType.FETCHING_PRODUCTS_BY_IDS_REJECTED,
    isFetchingProductsByIds: false,
    isFetchedProductsByIds: true,
    error: error
  };
};

/**
 * Fetch products by ids
 *
 * @param {array} ids
 */
export const fetchProductsByIds = (ids: any) => {
  return function(dispatch: any) {
    dispatch(fetchingProductsByIds());

    let options = {
      method: "post",
      data: {
        ids: ids
      }
    };

    Zjax.request({
      url: "/api/products/ids",
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        dispatch(receieveProductsByIds(response.data));
      },
      failureCallback: (error: any) => {
        dispatch(fetchingProductsByIdsError(error));
      }
    });
  };
};

// ------ Fetch product by ids ------

/**
 * Update product fulfilled
 *
 * @param {*} results
 */
export const updateProductFulfilled = (results: any) => {
  return {
    type: ActionType.PRODUCT.UPDATE.FULFILLED,
    isUpdatingProduct: false,
    isUpdatedProduct: true,
    info: results
  };
};

/**
 * Update product pending
 */
export const updateProductPending = () => {
  return {
    type: ActionType.PRODUCT.UPDATE.PENDING,
    isUpdatingProduct: true,
    isUpdatedProduct: false
  };
};

/**
 * Update product error
 *
 * @param {object} error
 */
export const updateProductError = (error: any) => {
  return {
    type: ActionType.PRODUCT.UPDATE.ERROR,
    isUpdatingProduct: false,
    isUpdatedProduct: true,
    error: error
  };
};

/**
 * Update product
 *
 * @param {*} product
 */
export const updateProduct = (product: any) => {
  return function(dispatch: any) {
    dispatch(updateProductPending());

    let options = {
      method: "put",
      data: product
    };

    Zjax.request({
      url: `/api/products/${product.id}`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        dispatch(updateProductFulfilled(response.data));
      },
      failureCallback: (error: any) => {
        dispatch(updateProductError(error));
      }
    });
  };
};

export const createProductFulfilled = (result: any) => {
  return {
    type: ActionType.PRODUCT.CREATE.FULFILLED,
    isCreatingProduct: false,
    isCreatedProdudct: true,
    info: result
  };
};

export const createProductPending = () => {
  return {
    type: ActionType.PRODUCT.CREATE.PENDING,
    isCreatingProduct: true,
    isCreatedProdudct: false
  };
};

export const createProductError = (error: any) => {
  return {
    type: ActionType.PRODUCT.CREATE.ERROR,
    isCreatingProduct: false,
    isCreatedProdudct: true,
    error: error
  };
};

export const createProduct = (product: any) => {
  return function(dispatch: any) {
    dispatch(createProductPending());

    let options = {
      method: "post",
      data: product
    };

    Zjax.request({
      url: "/api/products",
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        if (!_.isNil(response.data.id)) {
          window.location.href = `/products/${response.data.id}`;
        }
        dispatch(createProductFulfilled(response.data));
      },
      failureCallback: (error: any) => {
        console.log(error);
        dispatch(createProductError(error));
      }
    });
  };
};
