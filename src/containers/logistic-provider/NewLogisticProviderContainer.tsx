import { connect } from "react-redux";
import New from "../../components/logistic-provider/New";
import { createLogisticProvider } from "../../actions";

const mapStateToProps = (state: any) => {
  return {
    fetchLogisticProviderPending:
      state.LogisticProviderReducer.fetchLogisticProviderPending,
    fetchLogisticProviderFulfilled:
      state.LogisticProviderReducer.fetchLogisticProviderFulfilled,
    logisticProvider: state.LogisticProviderReducer.logisticProvider,
    createLogisticProviderPending: state.LogisticProviderReducer.createLogisticProviderPending,
    createLogisticProviderFulfilled: state.LogisticProviderReducer.createLogisticProviderFulfilled
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    createLogisticProvider: (logisticProvider: any) => {
      dispatch(createLogisticProvider(logisticProvider));
    }
  };
};

const NewLogisticProviderContainer = connect(mapStateToProps, mapDispatchToProps)(New);

export default NewLogisticProviderContainer;
