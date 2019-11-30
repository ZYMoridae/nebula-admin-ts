import { connect } from "react-redux";
import {
  fetchProductInfo,
  hideSuccessToast
} from "../../actions/ProductInfoActions";

import { updateProduct, createProduct } from "../../actions/ProductsActions";

import Edit from "../../components/product/Edit";

const mapStateToProps = (state: any) => {
  return {
    product: state.ProductInfoReducer.product,
    isFetchingProductInfo: state.ProductInfoReducer.isFetchingProductInfo,
    isFetchedProductInfo: state.ProductInfoReducer.isFetchedProductInfo,
    fetchProductInfoError: state.ProductInfoReducer.fetchProductInfoError,
    isAddedCartItem: state.ProductInfoReducer.isAddedCartItem,
    isAddingCartItem: state.ProductInfoReducer.isAddingCartItem,
    isShowSuccessToast: state.ProductInfoReducer.isShowSuccessToast,
    isFetchingProductComments:
      state.ProductInfoReducer.isFetchingProductComments,
    isFetchedProductComments: state.ProductInfoReducer.isFetchedProductComments,
    productComments: state.ProductInfoReducer.productComments,

    isUpdatingProduct: state.ProductInfoReducer.isUpdatingProduct,
    isUpdatedProduct: state.ProductInfoReducer.isUpdatedProduct,
    // SKU attribute category
    isFetchingAllSkuAttributeCategory:
      state.ProductInfoReducer.isFetchingAllSkuAttributeCategory,
    isFetchedAllSkuAttributeCategory:
      state.ProductInfoReducer.isFetchedAllSkuAttributeCategory,
    skuAttributeCategory: state.ProductInfoReducer.skuAttributeCategory
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    fetchProductInfo: (productId: number) => {
      dispatch(fetchProductInfo(productId));
    },
    hideSuccessToast: () => {
      dispatch(hideSuccessToast());
    },
    updateProduct: (product: any) => {
      dispatch(updateProduct(product));
    }
  };
};

const ProductInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);

export default ProductInfoContainer;
