import * as React from "react";

import _ from "lodash";

import Constants from "../../utils/Constants";
import Form from "./Form";

import Footer from "../Footer";
import { Layout, Breadcrumb } from "antd";

const { Content } = Layout;


type EditProps = {
  fetchProductInfo: any;
  id: number;
  product: any;
  fetchProductInfoError: any;
  isFetchedProductInfo: any;
  isFetchingProductInfo: any;
  updateProduct: any;
  isUpdatingProduct: any;
  isUpdatedProduct: any;
};

class Edit extends React.Component<EditProps> {
  componentDidMount() {
    const { fetchProductInfo, id } = this.props;
    fetchProductInfo(id);
  }

  render() {
    const {
      product,
      fetchProductInfoError,
      isFetchedProductInfo,
      isFetchingProductInfo,
      updateProduct,
      isUpdatingProduct,
      isUpdatedProduct,
    } = this.props;

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
            {isFetchedProductInfo && product && (
              <Form
                product={product}
                mode={Constants.FORM.MODE.UPDATE}
                action={updateProduct}
                actionPending={isUpdatingProduct}
                actionFulfilled={isUpdatedProduct}
              ></Form>
            )}
          </Content>
          <Footer></Footer>
        </Layout>
      </div>
    );
  }
}

export default Edit;
