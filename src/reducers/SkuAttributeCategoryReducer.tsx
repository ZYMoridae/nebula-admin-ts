import ActionType from "../actions/ActionType";

let initState: any = {
  fetchAllSkuAttributeCategoryPending: false,
  fetchAllSkuAttributeCategoryFulfilled: false,
  skuAttributeCategories: [],
  totalElements: 0,
  totalPages: 1
};
const SkuAttributeCategoryReducer = (state = initState, action: any) => {
  switch (action.type) {
    case ActionType.SKU.ATTRIBUTE.CATEGORY.GET_ALL.PENDING:
      return Object.assign({}, state, {
        fetchAllSkuAttributeCategoryFulfilled:
          action.fetchAllSkuAttributeCategoryFulfilled,
        fetchAllSkuAttributeCategoryPending:
          action.fetchAllSkuAttributeCategoryPending
      });
    case ActionType.SKU.ATTRIBUTE.CATEGORY.GET_ALL.ERROR:
      return Object.assign({}, state, {
        fetchAllSkuAttributeCategoryFulfilled:
          action.fetchAllSkuAttributeCategoryFulfilled,
        fetchAllSkuAttributeCategoryPending:
          action.fetchAllSkuAttributeCategoryPending
      });
    case ActionType.SKU.ATTRIBUTE.CATEGORY.GET_ALL.FULFILLED:
      return Object.assign({}, state, {
        fetchAllSkuAttributeCategoryFulfilled:
          action.fetchAllSkuAttributeCategoryFulfilled,
        fetchAllSkuAttributeCategoryPending:
          action.fetchAllSkuAttributeCategoryPending,
        skuAttributeCategories: action.skuAttributeCategories,
        totalPages: action.totalPages,
        totalElements: action.totalElements
      });
    default:
      return state;
  }
};

export default SkuAttributeCategoryReducer;
