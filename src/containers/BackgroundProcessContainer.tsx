import { connect } from 'react-redux';
import {
  fetchTokenAliveInfo
} from '../actions';
import BackgroundProcessComponent from '../components/utils/BackbgroundProcessComponent';

const mapStateToProps = (state: any) => {
  return {
    info: state.TokenReducer.info,
    isFetchingTokenAlive: state.TokenReducer.isFetchingTokenAlive,
    isFetchedTokenAlive: state.TokenReducer.isFetchedTokenAlive
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    fetchTokenAliveInfo: () => {
      dispatch(fetchTokenAliveInfo());
    }
  }
}

const BackgroundProcessContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BackgroundProcessComponent);

export default BackgroundProcessContainer;