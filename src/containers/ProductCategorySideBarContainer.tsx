import { connect } from 'react-redux';
import {
  fetchProductCategoryInfo
} from '../actions';
import ProductCategorySideBar from '../components/ProductCategorySideBar';

const mapStateToProps = (state: any) => {
  return {
    info: state.ProductCategorySideBarReducer.info,
    isFetchingProductCategory: state.ProductCategorySideBarReducer.isFetchingProductCategory,
    isFetchedProductCategory: state.ProductCategorySideBarReducer.isFetchedProductCategory,
    totalPages: state.ProductCategorySideBarReducer.totalPages
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    fetchProductCategoryInfo: (page: number, perPage: number, orderBy: string) => {
      dispatch(fetchProductCategoryInfo(page, perPage, orderBy));
    }
  }
}

const ProductCategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCategorySideBar);

export default ProductCategoryContainer;