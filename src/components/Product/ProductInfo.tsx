import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import _ from "lodash";

import "react-image-gallery/styles/css/image-gallery.css";

import Fade from "@material-ui/core/Fade";

import CircularProgress from "@material-ui/core/CircularProgress";

import ContentNotFound from "../utils/ContentNotFound";

import Constants from "../../utils/Constants";
import Form from "./ProductForm";
import { Theme, createStyles } from "@material-ui/core";

// import Constants from "../../utils/Constants";
// import Form from "./Form";

import Footer from "../Footer";
import { Layout, Breadcrumb } from "antd";

const { Content } = Layout;

const styles = (theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(5),
      marginBottom: theme.spacing(2),
      marginLeft: `${Constants.styles.sidebar.width}px`
    },
    priceCaption: {
      color: "#B12704",
      marginLeft: theme.spacing(1)
    },
    leftIcon: {
      marginRight: theme.spacing(1)
    },
    button: {
      backgroundColor: "#00B3A0",
      transition: "all 0.3s",
      marginTop: theme.spacing(1),
      maringRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      color: "white",
      "&:hover": {
        backgroundColor: "#00877C",
        transition: "all 0.3s"
      }
    },
    metaContainer: {
      paddingLeft: theme.spacing(2)
    },
    formControl: {
      marginTop: theme.spacing(1),
      maringRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      minWidth: 120
    },
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1)
    },
    main: {
      marginLeft: `${Constants.styles.sidebar.width}px`
    }
  });

const renderProductNotFoundBlock = () => {
  return <ContentNotFound />;
};

type ProductInfoState = {};

type ProductInfoProps = {
  classes: any;
  fetchProductInfo: any;
  productId: number;
  info: any;
  fetchProductInfoError: any;
  isFetchedProductInfo: any;
  isFetchingProductInfo: any;
  updateProduct: any;
};

class ProductInfo extends React.Component<ProductInfoProps, ProductInfoState> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const { fetchProductInfo, productId } = this.props;
    fetchProductInfo(productId);
  }

  render() {
    const {
      classes,
      info,
      fetchProductInfoError,
      isFetchedProductInfo,
      isFetchingProductInfo,
      updateProduct
    } = this.props;

    let productInfoBlock: any = "";

    // if (fetchProductInfoError != undefined) {
    //   productInfoBlock = renderProductNotFoundBlock();
    // } else {
    //   productInfoBlock = (
    //     <div>
    //       <ProductForm
    //         product={info}
    //         action={updateProduct}
    //         mode="update"
    //       ></ProductForm>
    //     </div>
    //   );
    // }

    return (
      <div>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Product</Breadcrumb.Item>
            <Breadcrumb.Item>Edit</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            {isFetchedProductInfo && info && (
              <Form
                product={info}
                mode={Constants.FORM.MODE.UPDATE}
                action={updateProduct}
                // actionPending={updateUserPending}
                // actionFulfilled={updateUserFulfilled}
              ></Form>
            )}
          </Content>
          <Footer></Footer>
        </Layout>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ProductInfo);
