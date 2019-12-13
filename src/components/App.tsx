import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Footer from "./Footer";
import Utils from "../utils/Utils";
import Routes from "../utils/Routes";
import SideDrawer from "./SideDrawer";
import NebulaTheme from "./utils/NebulaTheme";

import PrivateRoute from "./PrivateRoute";
import { MuiThemeProvider } from "@material-ui/core/styles";

import HomeContainer from "../containers/HomeContainer";
// import UserContainer from "../containers/NoteContainer";
import LoginContainer from "../containers/LoginContainer";
import ProductsContainer from "../containers/ProductsContainer";
import HeaderBarContainer from "../containers/HeaderBarContainer";
import ProductInfoContainer from "../containers/product/ProductInfoContainer";
import NewProductContainer from "../containers/product/NewProductContainer";
import ProductCategoryContainer from "../containers/product/product-category/ProductCategoryContainer";
import SkuAttributeCategoryContainer from "../containers/sku/sku-attribute-category/SkuAttributeCategoryContainer";
import UserContainer from "../containers/user/UserContainer";
import EditUserContainer from "../containers/user/EditUserContainer";

import NewUserContainer from "../containers/user/NewUserContainer";

import LogisticProviderContainer from "../containers/logistic-provider/LogisticProviderContainer";
import EditLogisticProviderContainer from "../containers/logistic-provider/EditLogisticProviderContainer";


import "./App.css";
// Ant Design
import { Layout, Menu, Breadcrumb, Icon } from "antd";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Home = () => (
  <div className="content-wrapper">
    {/* <UserContainer></UserContainer> */}
    <HomeContainer></HomeContainer>
  </div>
);

const Login = () => (
  <div>
    <LoginContainer></LoginContainer>
  </div>
);

const Products = () => {
  return (
    <div>
      <ProductsContainer
        {...Utils.getPaginationParameter({})}
      ></ProductsContainer>
    </div>
  );
};

const ProductCategories = () => {
  return (
    <div>
      <ProductCategoryContainer
        {...Utils.getPaginationParameter({})}
      ></ProductCategoryContainer>
    </div>
  );
};

const SkuAttributeCategories = () => {
  return (
    <div>
      <SkuAttributeCategoryContainer
        {...Utils.getPaginationParameter({})}
      ></SkuAttributeCategoryContainer>
    </div>
  );
};

const LogisticProviders = () => {
  return (
    <div>
      <LogisticProviderContainer
        {...Utils.getPaginationParameter({})}
      ></LogisticProviderContainer>
    </div>
  );
};

const Users = () => {
  return (
    <div>
      <UserContainer
        {...Utils.getPaginationParameter({
          orderBy: "username"
        })}
      ></UserContainer>
    </div>
  );
};

const EditProduct = ({ match }: { match: any }) => {
  return (
    <div>
      <ProductInfoContainer id={match.params.id}></ProductInfoContainer>
    </div>
  );
};

const NewProuctComponent = () => {
  return (
    <div>
      <NewProductContainer />
    </div>
  );
};

const EditUser = ({ match }: { match: any }) => {
  return (
    <div>
      <EditUserContainer id={match.params.id}></EditUserContainer>
    </div>
  );
};

const EditLogisticProvider = ({ match }: { match: any }) => {
  return (
    <div>
      <EditLogisticProviderContainer id={match.params.id}></EditLogisticProviderContainer>
    </div>
  );
};

const NewUser = () => {
  return (
    <div>
      <NewUserContainer />
    </div>
  );
};

class App extends React.Component {
  render() {
    return (
      <Router>
        {/* <MuiThemeProvider theme={NebulaTheme}> */}
        <Layout>
          {location.pathname !== Routes.USER.LOGIN &&
            location.pathname !== "/" && <SideDrawer></SideDrawer>}

          <Layout id="content-sidebar-wrapper">
            {location.pathname !== Routes.USER.LOGIN &&
              location.pathname !== "/" && (
                <HeaderBarContainer></HeaderBarContainer>
              )}

            <Switch>
              <Route exact path={Routes.USER.LOGIN} component={Login} />

              <PrivateRoute exact path={Routes.HOME} component={Home} />

              <PrivateRoute exact path={Routes.USER.INDEX} component={Users} />

              <PrivateRoute exact path={Routes.USER.NEW} component={NewUser} />

              <PrivateRoute
                exact
                path={Routes.USER.EDIT}
                component={EditUser}
              />

              <PrivateRoute
                exact
                path={Routes.PRODUCT.INDEX}
                component={Products}
              />

              <PrivateRoute
                exact
                path={Routes.PRODUCT.CATEGORY.INDEX}
                component={ProductCategories}
              />

              <PrivateRoute
                exact
                path={Routes.SKU.ATTRIBUTE.CATEGORY.INDEX}
                component={SkuAttributeCategories}
              />

              <PrivateRoute 
                exact
                path={Routes.LOGISTIC_PROVIDER.INDEX}
                component={LogisticProviders}
              />

              <PrivateRoute 
                exact
                path={Routes.LOGISTIC_PROVIDER.EDIT}
                component={EditLogisticProvider}
              />

              <PrivateRoute
                exact
                path={Routes.PRODUCT.NEW}
                component={NewProuctComponent}
              />

              <PrivateRoute
                exact
                path={Routes.PRODUCT.EDIT}
                component={EditProduct}
              />
              {/* <Route exact path="/test" component={LoginForm} /> */}
              <Route exact path={Routes.USER.LOGIN} component={Login} />
              <Redirect to={Routes.USER.LOGIN} />
            </Switch>

            {/* {location.pathname !== Routes.USER.LOGIN && <Footer></Footer>} */}
          </Layout>
          {/* </MuiThemeProvider> */}
        </Layout>
      </Router>
    );
  }
}

export default App;
