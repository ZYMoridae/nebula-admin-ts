import * as React from "react";
import _ from "lodash";

import Constants from "../../utils/Constants";
import Form from "./Form";

// Ant Design
import Footer from "../Footer";
import { Layout, Breadcrumb } from "antd";

const { Content } = Layout;

type EditProps = {
  fetchLogisticProvider: any;
  id: number;
  logisticProvider: any;
  fetchLogisticProviderPending: boolean;
  fetchLogisticProviderFulfilled: boolean;
  updateLogisticProvider: any;
  updateLogisticProviderPending: boolean;
  updateLogisticProviderFulfilled: boolean;
};

class Edit extends React.Component<EditProps> {
  componentDidMount() {
    const { fetchLogisticProvider, id } = this.props;
    fetchLogisticProvider(id);
  }

  render() {
    const {
      logisticProvider,
      fetchLogisticProviderPending,
      fetchLogisticProviderFulfilled,
      updateLogisticProvider,
      updateLogisticProviderPending,
      updateLogisticProviderFulfilled
    } = this.props;

    return (
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>LogisticProvider</Breadcrumb.Item>
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
          {fetchLogisticProviderFulfilled && logisticProvider && (
            <Form
              logisticProvider={logisticProvider}
              mode={Constants.FORM.MODE.UPDATE}
              action={updateLogisticProvider}
              actionPending={updateLogisticProviderPending}
              actionFulfilled={updateLogisticProviderFulfilled}
            ></Form>
          )}
        </Content>
        <Footer></Footer>
      </Layout>
    );
  }
}

export default Edit;
