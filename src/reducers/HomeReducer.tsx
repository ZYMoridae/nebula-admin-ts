import ActionType from "../actions/ActionType";

let initState: any = {
  isFetchingHomeBanner: false,
  isFetchedHomeBanner: false,
  isFetchedProducts: false,
  isFetchingProducts: false,
  featuredProducts: [],
  info: [],
  fetchProductsError: null,
  fetchHomeBannerError: null,
  totalPages: 0
};

const homeReducer = (state = initState, action: any) => {
  switch (action.type) {
    case ActionType.PRODUCT.GET_ALL.ERROR:
      return {
        ...state,
        isFetchedProducts: action.isFetchedProducts,
        isFetchingProducts: action.isFetchingProducts,
        fetchProductsError: action.error
      };
    case ActionType.PRODUCT.GET_ALL.PENDING:
      return {
        ...state,
        isFetchedProducts: action.isFetchedProducts,
        isFetchingProducts: action.isFetchingProducts
      };
    case ActionType.PRODUCT.GET_ALL.FULFILLED:
      return {
        ...state,
        isFetchedProducts: action.isFetchedProducts,
        isFetchingProducts: action.isFetchingProducts,
        featuredProducts: action.info,
        totalPages: action.totalPages
      };
    default:
      return state;
  }
};

export default homeReducer;
