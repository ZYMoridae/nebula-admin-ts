import HomeReducer from './HomeReducer';
import ActionType from '../actions/ActionType';

const getInitState = () => {
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
  return initState;
};


test('test action FETCHING_HOMEBANNER_REJECTED', () => {
  let initState = getInitState();

  let homeAction = {
    type: ActionType.FETCHING_HOMEBANNER_REJECTED,
    isFetchedHomeBanner: true,
    isFetchingHomeBanner: false,
    error: 'error'
  };

  let expectedResult: any = {
    isFetchedHomeBanner: true,
    isFetchingHomeBanner: false,
    isFetchedProducts: false,
    isFetchingProducts: false,
    featuredProducts: [],
    info: [],
    fetchProductsError: null,
    fetchHomeBannerError: 'error',
    totalPages: 0
  } 

  let result = HomeReducer(initState, homeAction);

  expect(result).toStrictEqual(expectedResult);
});


test('test action FETCHING_HOMEBANNER_PENDING', () => {
  let initState = getInitState();

  let homeAction = {
    type: ActionType.FETCHING_HOMEBANNER_PENDING,
    isFetchedHomeBanner: false,
    isFetchingHomeBanner: true
  };

  let expectedResult: any = {
    isFetchedHomeBanner: false,
    isFetchingHomeBanner: true,
    isFetchedProducts: false,
    isFetchingProducts: false,
    featuredProducts: [],
    info: [],
    fetchProductsError: null,
    fetchHomeBannerError: null,
    totalPages: 0
  } 

  let result = HomeReducer(initState, homeAction);

  expect(result).toStrictEqual(expectedResult);
});

test('test action RECEIVE_HOMEBANNER', () => {
  let initState = getInitState();

  let homeAction = {
    type: ActionType.RECEIVE_HOMEBANNER,
    isFetchedHomeBanner: true,
    isFetchingHomeBanner: false,
    info: "info"
  };

  let expectedResult: any = {
    isFetchedHomeBanner: true,
    isFetchingHomeBanner: false,
    isFetchedProducts: false,
    isFetchingProducts: false,
    featuredProducts: [],
    info: "info",
    fetchProductsError: null,
    fetchHomeBannerError: null,
    totalPages: 0
  } 

  let result = HomeReducer(initState, homeAction);

  expect(result).toStrictEqual(expectedResult);
});


// Fetching products test
test('test action FETCHING_PRODUCTS_REJECTED', () => {
  let initState = getInitState();

  let homeAction = {
    type: ActionType.FETCHING_PRODUCTS_REJECTED,
    isFetchedProducts: true,
    isFetchingProducts: false,
    error: "error"
  };

  let expectedResult: any = {
    isFetchedHomeBanner: false,
    isFetchingHomeBanner: false,
    isFetchedProducts: true,
    isFetchingProducts: false,
    featuredProducts: [],
    info: [],
    fetchProductsError: "error",
    fetchHomeBannerError: null,
    totalPages: 0
  } 

  let result = HomeReducer(initState, homeAction);

  expect(result).toStrictEqual(expectedResult);
});


test('test action FETCHING_PRODUCTS_PENDING', () => {
  let initState = getInitState();

  let homeAction = {
    type: ActionType.FETCHING_PRODUCTS_PENDING,
    isFetchedProducts: false,
    isFetchingProducts: true
  };

  let expectedResult: any = {
    isFetchedHomeBanner: false,
    isFetchingHomeBanner: false,
    isFetchedProducts: false,
    isFetchingProducts: true,
    featuredProducts: [],
    info: [],
    fetchProductsError: null,
    fetchHomeBannerError: null,
    totalPages: 0
  } 

  let result = HomeReducer(initState, homeAction);

  expect(result).toStrictEqual(expectedResult);
});

test('test action RECEIVE_PRODUCTS', () => {
  let initState = getInitState();

  let homeAction = {
    type: ActionType.RECEIVE_PRODUCTS,
    isFetchedProducts: true,
    isFetchingProducts: false,
    info: ["info"],
    totalPages: 10
  };

  let expectedResult: any = {
    isFetchedHomeBanner: false,
    isFetchingHomeBanner: false,
    isFetchedProducts: true,
    isFetchingProducts: false,
    featuredProducts: ["info"],
    info: [],
    fetchProductsError: null,
    fetchHomeBannerError: null,
    totalPages: 10
  } 

  let result = HomeReducer(initState, homeAction);

  expect(result).toStrictEqual(expectedResult);
});


test ('test unknown action', () => {
  let initState = getInitState();

  let homeAction = {
    type: 'test'
  };

  let expectedResult: any = {
    isFetchedHomeBanner: false,
    isFetchingHomeBanner: false,
    isFetchedProducts: false,
    isFetchingProducts: false,
    featuredProducts: [],
    info: [],
    fetchProductsError: null,
    fetchHomeBannerError: null,
    totalPages: 0
  } 

  let result = HomeReducer(initState, homeAction);

  expect(result).toStrictEqual(expectedResult);
});