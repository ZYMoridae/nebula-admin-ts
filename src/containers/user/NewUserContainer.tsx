import { connect } from "react-redux";
import New from "../../components/user/New";
import { createUser } from "../../actions";

const mapStateToProps = (state: any) => {
  return {
    user: state.UserReducer.user,
    fetchUserPending: state.UserReducer.fetchUserPending,
    fetchUserFulfilled: state.UserReducer.fetchUserFulfilled,
    createUserPending: state.UserReducer.createUserPending,
    createUserFulfilled: state.UserReducer.createUserFulfilled
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    createUser: (user: any) => {
      dispatch(createUser(user));
    }
  };
};

const NewUserContainer = connect(mapStateToProps, mapDispatchToProps)(New);

export default NewUserContainer;
