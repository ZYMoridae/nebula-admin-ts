import { connect } from 'react-redux';
import {
  fetchProductInfo,
  addCartItem,
  hideSuccessToast,
  fetchProductComments
} from '../actions/ProductInfoActions';
import ProductInfo from '../components/ProductInfo';

const mapStateToProps = (state: any) => {
  return {
    info: state.ProductInfoReducer.info,
    isFetchingProductInfo: state.ProductInfoReducer.isFetchingProductInfo,
    isFetchedProductInfo: state.ProductInfoReducer.isFetchedProductInfo,
    fetchProductInfoError: state.ProductInfoReducer.fetchProductInfoError,
    isAddedCartItem: state.ProductInfoReducer.isAddedCartItem,
    isAddingCartItem: state.ProductInfoReducer.isAddingCartItem,
    isShowSuccessToast: state.ProductInfoReducer.isShowSuccessToast,
    isFetchingProductComments: state.ProductInfoReducer.isFetchingProductComments,
    isFetchedProductComments: state.ProductInfoReducer.isFetchedProductComments,
    productComments: state.ProductInfoReducer.productComments
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    fetchProductInfo: (productId: number) => {
      dispatch(fetchProductInfo(productId));
    },
    addCartItem: (productInfo: any) => {
      dispatch(addCartItem(productInfo));
    },
    hideSuccessToast: () => {
      dispatch(hideSuccessToast());
    },
    fetchProductComments: (productId: number) => {
      dispatch(fetchProductComments(productId))
    }
  }
}

const ProductInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductInfo);

export default ProductInfoContainer;