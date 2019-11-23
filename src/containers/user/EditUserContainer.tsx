import { connect } from "react-redux";
import Edit from "../../components/user/Edit";
import { fetchUser, updateUser } from "../../actions";

const mapStateToProps = (state: any) => {
  return {
    user: state.UserReducer.user,
    fetchUserPending: state.UserReducer.fetchUserPending,
    fetchUserFulfilled: state.UserReducer.fetchUserFulfilled,
    updateUserPending: state.UserReducer.updateUserPending,
    updateUserFulfilled: state.UserReducer.updateUserFulfilled
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    fetchUser: (id: number) => {
      dispatch(fetchUser(id));
    },
    updateUser: (user: any) => {
      dispatch(updateUser(user));
    }
  };
};

const EditUserContainer = connect(mapStateToProps, mapDispatchToProps)(Edit);

export default EditUserContainer;
