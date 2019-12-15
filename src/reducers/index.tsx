import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import ProductsReducer from "./ProductsReducer";
import ProductInfoReducer from "./ProductInfoReducer";
import HomeReducer from "./HomeReducer";
import UserReducer from "./UserReducer";
import TokenReducer from "./TokenReducer";
import ProductCategoryReducer from "./ProductCategoryReducer";
import SkuAttributeCategoryReducer from "./SkuAttributeCategoryReducer";
import LogisticProviderReducer from "./LogisticProviderReducer";
import AnalyticsReducer from "./AnalyticsReducer";

const appReducer = combineReducers({
  LoginReducer,
  ProductsReducer,
  ProductInfoReducer,
  HomeReducer,
  UserReducer,
  TokenReducer,
  ProductCategoryReducer,
  SkuAttributeCategoryReducer,
  LogisticProviderReducer,
  AnalyticsReducer
});

export default appReducer;
