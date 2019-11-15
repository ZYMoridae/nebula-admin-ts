import { connect } from "react-redux";
import Index from "../../../components/sku/attribute/category/Index";
import { fetchAllSkuAttributeCategory } from "../../../actions";

const mapStateToProps = (state: any) => {
  return {
    skuAttributeCategories:
      state.SkuAttributeCategoryReducer.skuAttributeCategories,
    fetchAllSkuAttributeCategoryPending:
      state.SkuAttributeCategoryReducer.fetchAllSkuAttributeCategoryPending,
    fetchAllSkuAttributeCategoryFulfilled:
      state.SkuAttributeCategoryReducer.fetchAllSkuAttributeCategoryFulfilled,
    totalPages: state.SkuAttributeCategoryReducer.totalPages
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    fetchAllSkuAttributeCategory: (page: number, perPage: number, orderBy: string) => {
      dispatch(fetchAllSkuAttributeCategory(page, perPage, orderBy));
    }
  };
};

const ProductCategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);

export default ProductCategoryContainer;
