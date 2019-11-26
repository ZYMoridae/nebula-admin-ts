import ActionType from "../actions/ActionType";

let initState: any = {
  fetchAllProductCategoryPending: false,
  fetchAllProductCategoryFulfilled: false,
  productCategories: [],
  totalPages: 1,
  totalElements: 0
};
const ProductCategoryReducer = (state = initState, action: any) => {
  switch (action.type) {
    case ActionType.PRODUCT.CATEGORY.GET_ALL.PENDING:
      return Object.assign({}, state, {
        fetchAllProductCategoryFulfilled:
          action.fetchAllProductCategoryFulfilled,
        fetchAllProductCategoryPending: action.fetchAllProductCategoryPending
      });
    case ActionType.PRODUCT.CATEGORY.GET_ALL.ERROR:
      return Object.assign({}, state, {
        fetchAllProductCategoryFulfilled:
          action.fetchAllProductCategoryFulfilled,
        fetchAllProductCategoryPending: action.fetchAllProductCategoryPending
      });
    case ActionType.PRODUCT.CATEGORY.GET_ALL.FULFILLED:
      return Object.assign({}, state, {
        fetchAllProductCategoryFulfilled:
          action.fetchAllProductCategoryFulfilled,
        fetchAllProductCategoryPending: action.fetchAllProductCategoryPending,
        productCategories: action.productCategories,
        totalPages: action.totalPages,
        totalElements: action.totalElements
      });
    default:
      return state;
  }
};

export default ProductCategoryReducer;
