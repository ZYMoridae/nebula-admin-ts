import { connect } from "react-redux";
import { fetchAuthInfo, hideLoginError } from "../actions";
import Login from "../components/Login";

const mapStateToProps = (state: any) => {
  return {
    info: state.LoginReducer.info,
    isFetchingAuth: state.LoginReducer.isFetchingAuth,
    isFetchedAuth: state.LoginReducer.isFetchedAuth,
    isShowLoginError: state.LoginReducer.isShowLoginError
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    fetchAuthInfo: (data: any) => {
      dispatch(fetchAuthInfo(data));
    },
    hideLoginError: () => {
      dispatch(hideLoginError());
    }
  };
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;
