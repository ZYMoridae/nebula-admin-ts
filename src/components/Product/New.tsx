import * as React from "react";

import _ from "lodash";

import Constants from "../../utils/Constants";
import Form from "./Form";

import Footer from "../Footer";
import { Layout, Breadcrumb } from "antd";

const { Content } = Layout;

type NewProps = {
  fetchProductInfo: any;
  // id: number;
  // product: any;
  fetchProductInfoError: any;
  isFetchedProductInfo: any;
  isFetchingProductInfo: any;
  createProduct: any;
  isCreatingProduct: any;
  isCreatedProdudct: any;
};

class New extends React.Component<NewProps> {
  // componentDidMount() {
  //   const { fetchProductInfo, id } = this.props;
  //   fetchProductInfo(id);
  // }

  render() {
    const {
      // product,
      fetchProductInfoError,
      isFetchedProductInfo,
      isFetchingProductInfo,
      createProduct,
      isCreatingProduct,
      isCreatedProdudct
    } = this.props;

    return (
      <div>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Product</Breadcrumb.Item>
            <Breadcrumb.Item>New</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            <Form
              // product={product}
              mode={Constants.FORM.MODE.NEW}
              action={createProduct}
              actionPending={isCreatingProduct}
              actionFulfilled={isCreatedProdudct}
            ></Form>
          </Content>
          <Footer></Footer>
        </Layout>
      </div>
    );
  }
}

export default New;
