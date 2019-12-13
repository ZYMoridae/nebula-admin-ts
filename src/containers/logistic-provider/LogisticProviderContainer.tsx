import { connect } from "react-redux";
import Index from "../../components/logistic-provider/Index";
import { fetchAllLogisticProvider } from "../../actions";

const mapStateToProps = (state: any) => {
  return {
    logisticProviders: state.LogisticProviderReducer.logisticProviders,
    fetchAllLogisticProviderPending:
      state.LogisticProviderReducer.fetchAllLogisticProviderPending,
    fetchAllLogisticProviderFulfilled:
      state.LogisticProviderReducer.fetchAllLogisticProviderFulfilled,
    totalPages: state.LogisticProviderReducer.totalPages,
    totalElements: state.LogisticProviderReducer.totalElements,

    fetchLogisticProviderPending:
      state.LogisticProviderReducer.fetchLogisticProviderPending,
    fetchLogisticProviderFulfilled:
      state.LogisticProviderReducer.fetchLogisticProviderFulfilled,
    logisticProvider: state.LogisticProviderReducer.logisticProvider
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    fetchAllLogisticProvider: (
      page: number,
      perPage: number,
      orderBy: string
    ) => {
      dispatch(fetchAllLogisticProvider(page, perPage, orderBy));
    }
  };
};

const LogisticProviderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);

export default LogisticProviderContainer;
