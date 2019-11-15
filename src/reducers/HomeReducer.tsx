import ActionType from '../actions/ActionType';

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
}

const homeReducer = (state = initState, action: any) => {
  switch (action.type) {
    case ActionType.FETCHING_HOMEBANNER_REJECTED:
      return {
        ...state,
        isFetchedHomeBanner: action.isFetchedHomeBanner,
        isFetchingHomeBanner: action.isFetchingHomeBanner,
        fetchHomeBannerError: action.error
      }
    case ActionType.FETCHING_HOMEBANNER_PENDING:
      return {
        ...state,
        isFetchedHomeBanner: action.isFetchedHomeBanner,
        isFetchingHomeBanner: action.isFetchingHomeBanner
      }
    case ActionType.RECEIVE_HOMEBANNER:
      return {
        ...state,
        isFetchedHomeBanner: action.isFetchedHomeBanner,
        isFetchingHomeBanner: action.isFetchingHomeBanner,
        info: action.info
      }
    case ActionType.FETCHING_PRODUCTS_REJECTED:
      return {
        ...state,
        isFetchedProducts: action.isFetchedProducts,
        isFetchingProducts: action.isFetchingProducts,
        fetchProductsError: action.error
      }
    case ActionType.FETCHING_PRODUCTS_PENDING:
      return {
        ...state,
        isFetchedProducts: action.isFetchedProducts,
        isFetchingProducts: action.isFetchingProducts
      }
    case ActionType.RECEIVE_PRODUCTS:
      return {
        ...state,
        isFetchedProducts: action.isFetchedProducts,
        isFetchingProducts: action.isFetchingProducts,
        featuredProducts: action.info,
        totalPages: action.totalPages
      }
    default:
      return state
  }
}

export default homeReducer;