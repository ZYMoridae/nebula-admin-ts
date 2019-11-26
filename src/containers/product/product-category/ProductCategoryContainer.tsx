import { connect } from "react-redux";
import Index from "../../../components/product/product-category/Index";
import { fetchAllProductCategory } from "../../../actions";

const mapStateToProps = (state: any) => {
  return {
    productCategories: state.ProductCategoryReducer.productCategories,
    fetchAllProductCategoryPending:
      state.ProductCategoryReducer.fetchAllProductCategoryPending,
    fetchAllProductCategoryFulfilled:
      state.ProductCategoryReducer.fetchAllProductCategoryFulfilled,
    totalPages: state.ProductCategoryReducer.totalPages,
    totalElements: state.ProductCategoryReducer.totalElements
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    fetchAllProductCategory: (
      page: number,
      perPage: number,
      orderBy: string
    ) => {
      dispatch(fetchAllProductCategory(page, perPage, orderBy));
    }
  };
};

const ProductCategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);

export default ProductCategoryContainer;
