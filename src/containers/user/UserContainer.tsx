import { connect } from "react-redux";
import Index from "../../components/user/Index";
import { fetchAllUser } from "../../actions";

const mapStateToProps = (state: any) => {
  return {
    users: state.UserReducer.users,
    fetchAllUserPending: state.UserReducer.fetchAllUserPending,
    fetchAllUserFulfilled: state.UserReducer.fetchAllUserFulfilled,
    totalPages: state.UserReducer.totalPages
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    fetchAllUser: (page: number, perPage: number, orderBy: string) => {
      dispatch(fetchAllUser(page, perPage, orderBy));
    }
  };
};

const UserContainer = connect(mapStateToProps, mapDispatchToProps)(Index);

export default UserContainer;
