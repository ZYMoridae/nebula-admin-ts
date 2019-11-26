import ActionType from "../actions/ActionType";

let initState: any = {
  isFetchingProducts: false,
  isFetchedProducts: false,
  totalPages: 1,
  totalElements: 0,
  info: [],
  error: null
};
const productsReducer = (state = initState, action: any) => {
  switch (action.type) {
    case ActionType.PRODUCT.GET_ALL.ERROR:
      return Object.assign({}, state, {
        isFetchedProducts: action.isFetchedProducts,
        isFetchingProducts: action.isFetchingProducts,
        error: action.error
      });
    case ActionType.PRODUCT.GET_ALL.PENDING:
      return Object.assign({}, state, {
        isFetchedProducts: action.isFetchedProducts,
        isFetchingProducts: action.isFetchingProducts
      });
    case ActionType.PRODUCT.GET_ALL.FULFILLED:
      return Object.assign({}, state, {
        isFetchedProducts: action.isFetchedProducts,
        isFetchingProducts: action.isFetchingProducts,
        info: action.info,
        totalPages: action.totalPages,
        totalElements: action.totalElements
      });
    default:
      return state;
  }
};

export default productsReducer;
