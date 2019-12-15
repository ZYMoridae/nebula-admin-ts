import * as React from "react";
import _ from "lodash";

import Constants from "../../utils/Constants";
import Form from "./Form";

import Footer from "../Footer";
import { Layout, Breadcrumb } from "antd";

const { Content } = Layout;

type NewProps = {
  createLogisticProvider: any;
  createLogisticProviderPending: boolean;
  createLogisticProviderFulfilled: boolean;
};

class New extends React.Component<NewProps> {
  render() {
    const {
      createLogisticProvider,
      createLogisticProviderPending,
      createLogisticProviderFulfilled
    } = this.props;

    return (
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Logistic Provider</Breadcrumb.Item>
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
            mode={Constants.FORM.MODE.NEW}
            action={createLogisticProvider}
            actionPending={createLogisticProviderPending}
            actionFulfilled={createLogisticProviderFulfilled}
          ></Form>
        </Content>
        <Footer></Footer>
      </Layout>
    );
  }
}

export default New;
