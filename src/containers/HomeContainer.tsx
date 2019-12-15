import { connect } from "react-redux";
import Home from "../components/Home";
import {
  // fetchHomeBannerInfo,
  fetchProductsInfo,
  fetchAnalytics
} from "../actions";

const mapStateToProps = (state: any) => {
  return {
    info: state.HomeReducer.info,
    isFetchingHomeBanner: state.HomeReducer.isFetchingHomeBanner,
    isFetchedHomeBanner: state.HomeReducer.isFetchedHomeBanner,
    featuredProducts: state.HomeReducer.featuredProducts,
    isFetchingProducts: state.HomeReducer.isFetchingProducts,
    isFetchedProducts: state.HomeReducer.isFetchedProducts,
    fetchProductsError: state.HomeReducer.fetchProductsError,
    fetchHomeBannerError: state.HomeReducer.fetchHomeBannerError,

    fetchAnalyticsPending: state.AnalyticsReducer.fetchAnalyticsPending,
    fetchAnalyticsFulfilled: state.AnalyticsReducer.fetchAnalyticsFulfilled,
    analytics: state.AnalyticsReducer.analytics
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    // fetchHomeBannerInfo: () => {
    //   dispatch(fetchHomeBannerInfo());
    // },
    fetchFeaturedProducts: (page: number, perPage: number) => {
      dispatch(fetchProductsInfo(page, perPage, "updatedAt"));
    },
    fetchAnalytics: () => {
      dispatch(fetchAnalytics());
    }
  };
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer;
