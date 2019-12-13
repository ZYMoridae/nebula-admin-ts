import { connect } from "react-redux";
import Edit from "../../components/logistic-provider/Edit";
import { fetchLogisticProvider, updateLogisticProvider } from "../../actions";

const mapStateToProps = (state: any) => {
  return {
    fetchLogisticProviderPending:
      state.LogisticProviderReducer.fetchLogisticProviderPending,
    fetchLogisticProviderFulfilled:
      state.LogisticProviderReducer.fetchLogisticProviderFulfilled,
    logisticProvider: state.LogisticProviderReducer.logisticProvider,
    updateLogisticProviderPending: state.LogisticProviderReducer.updateLogisticProviderPending,
    updateLogisticProviderFulfilled: state.LogisticProviderReducer.updateLogisticProviderFulfilled
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    fetchLogisticProvider: (id: number) => {
      dispatch(fetchLogisticProvider(id));
    },
    updateLogisticProvider: (logisticProvider: any) => {
      dispatch(updateLogisticProvider(logisticProvider));
    }
  };
};

const EditLogisticProviderContainer = connect(mapStateToProps, mapDispatchToProps)(Edit);

export default EditLogisticProviderContainer;
