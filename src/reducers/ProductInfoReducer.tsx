import ActionType from "../actions/ActionType";

let initState: any = {
  isFetchingProductInfo: false,
  isFetchedProductInfo: false,
  fetchProductInfoError: undefined,
  isAddedCartItem: false,
  isAddingCartItem: false,
  isShowSuccessToast: false,
  isFetchingProductComments: false,
  isFetchedProductComments: false,
  product: null,
  productComments: [],
  isUpdatingProduct: false,
  isUpdatedProduct: false,
  skuAttributeCategory: []
};

const productInfoReducer = (state = initState, action: any) => {
  switch (action.type) {
    case ActionType.PRODUCT.GET.ERROR:
      return Object.assign({}, state, {
        isFetchedProductInfo: action.isFetchedProductInfo,
        isFetchingProductInfo: action.isFetchingProductInfo,
        fetchProductInfoError: action.error
      });
    case ActionType.PRODUCT.GET.PENDING:
      return Object.assign({}, state, {
        isFetchedProductInfo: action.isFetchedProductInfo,
        isFetchingProductInfo: action.isFetchingProductInfo
      });
    case ActionType.PRODUCT.GET.FULFILLED:
      return Object.assign({}, state, {
        isFetchedProductInfo: action.isFetchedProductInfo,
        isFetchingProductInfo: action.isFetchingProductInfo,
        product: action.product
      });
    case ActionType.HIDE_SUCCESS_TOAST:
      return Object.assign({}, state, {
        isShowSuccessToast: action.isShowSuccessToast
      });
    // Update product
    case ActionType.PRODUCT.UPDATE.PENDING:
      return Object.assign({}, state, {
        isUpdatingProduct: action.isUpdatingProduct,
        isUpdatedProduct: action.isUpdatedProduct
      });
    case ActionType.PRODUCT.UPDATE.ERROR:
      return Object.assign({}, state, {
        isUpdatingProduct: action.isUpdatingProduct,
        isUpdatedProduct: action.isUpdatedProduct
      });
    case ActionType.PRODUCT.UPDATE.FULFILLED:
      return Object.assign({}, state, {
        isUpdatingProduct: action.isUpdatingProduct,
        isUpdatedProduct: action.isUpdatedProduct,
        product: action.product
      });

    // Fetch sku attribute category
    case ActionType.SKU.ATTRIBUTE.CATEGORY.GET_ALL.PENDING:
      return Object.assign({}, state, {
        isFetchingAllSkuAttributeCategory:
          action.isFetchingAllSkuAttributeCategory,
        isFetchedAllSkuAttributeCategory:
          action.isFetchedAllSkuAttributeCategory
      });
    case ActionType.SKU.ATTRIBUTE.CATEGORY.GET_ALL.ERROR:
      return Object.assign({}, state, {
        isFetchingAllSkuAttributeCategory:
          action.isFetchingAllSkuAttributeCategory,
        isFetchedAllSkuAttributeCategory:
          action.isFetchedAllSkuAttributeCategory
      });
    case ActionType.SKU.ATTRIBUTE.CATEGORY.GET_ALL.FULFILLED:
      return Object.assign({}, state, {
        isFetchingAllSkuAttributeCategory:
          action.isFetchingAllSkuAttributeCategory,
        isFetchedAllSkuAttributeCategory:
          action.isFetchedAllSkuAttributeCategory,
        skuAttributeCategory: action.skuAttributeCategory
      });

    // Create product
    case ActionType.PRODUCT.CREATE.PENDING:
      return Object.assign({}, state, {
        isCreatingProduct: action.isCreatingProduct,
        isCreatedProdudct: action.isCreatedProdudct
      });
    case ActionType.PRODUCT.CREATE.ERROR:
      return Object.assign({}, state, {
        isCreatingProduct: action.isCreatingProduct,
        isCreatedProdudct: action.isCreatedProdudct
      });
    case ActionType.PRODUCT.CREATE.FULFILLED:
      return Object.assign({}, state, {
        isCreatingProduct: action.isCreatingProduct,
        isCreatedProdudct: action.isCreatedProdudct,
        product: action.product
      });

    default:
      return state;
  }
};

export default productInfoReducer;
